const Donation = require("../models/donationModel");
const Charity = require("../models/charityModel");
const Supplier = require("../models/supplierModel");

// Function to calculate distance between two points
function calculateDistance(point1, point2) {
  // Replace with your preferred distance calculation (e.g., haversine formula)
  const ans = Math.sqrt(
    Math.pow(point1.latitude - point2.latitude, 2) +
      Math.pow(point1.longitude - point2.longitude, 2)
  );
  return ans;
}

// Get the last donation created
async function getLastDonation() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to start of the day

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // Set time to end of the day

    const lastDonation = await Donation.findOne({
      createdAt: { $gte: today, $lt: endOfDay },
    }).sort({ createdAt: -1 });

    if (!lastDonation) {
      console.log("No donations found for today.");
      return;
    }

    const charityCenters = await Charity.find();
    const totalFoodDonated = await Donation.aggregate([
      {
        $match: {
          createdAt: { $gte: today, $lt: endOfDay },
        },
      },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: "$itemQuantity" },
        },
      },
    ]);

    if (totalFoodDonated.length === 0 || !totalFoodDonated[0].totalQuantity) {
      console.log("No donations found for today.");
      return;
    }

    const totalQuantity = totalFoodDonated[0].totalQuantity;

    matchDonationsAndDonate(lastDonation, totalQuantity, charityCenters);
  } catch (err) {
    console.error("Error getting last donation:", err);
  }
}

// Function to find the nearest suitable charity center (excluding previously donated and dietary restrictions)
async function findNearestSuitableCenter(
  donation,
  totalQuantity,
  charityCenters,
  donationsMade
) {
  let nearestCenter = null;
  let minDistance = Infinity;

  try {
    // Retrieve the supplier based on supplier_id
    const supplier = await Supplier.findById(donation.supplier_id);

    for (const center of charityCenters) {
      // Check if already donated or has reached capacity
      const key = `${donation.supplier_id}_${center.id}`;
      if (donationsMade[key] || center.capacity <= 0) {
        continue;
      }

      // Check dietary restrictions
      if (
        (donation.itemType === "veg" && center.vegCount <= 0) ||
        (donation.itemType === "non-veg" && center.nonVegCount <= 0)
      ) {
        continue;
      }

      // Calculate distance using supplier's latitude and center's latitude
      const distance = calculateDistance(
        { latitude: supplier.latitude, longitude: supplier.longitude },
        center
      );

      if (distance < minDistance) {
        nearestCenter = center;
        minDistance = distance;
      }
    }

    // Check if any suitable center was found
    if (!nearestCenter) {
      throw new Error("No suitable center found");
    }

    return nearestCenter;
  } catch (error) {
    console.error("Error retrieving supplier:", error);
    throw error; // Rethrow the error for handling in the calling function
  }
}

// Function to match donations with nearest suitable charity centers and handle ties
async function matchDonationsAndDonate(
  lastDonation,
  totalQuantity,
  charityCenters
) {
  const donationsMade = {}; // Track donations made with key as supplier_id + "_" + charity_center_id

  let donation = lastDonation;
  let itemQuantity = donation.itemQuantity;

  for (const center of charityCenters) {
    if (center.capacity >= totalQuantity) {
      if (itemQuantity > center.capacity) {
        itemQuantity = center.capacity;
      }

      center.capacity -= itemQuantity;
      totalQuantity -= itemQuantity;

      console.log(
        `Donation from Supplier ${donation.supplier_id} for ${itemQuantity} ${donation.itemType} donated to Charity Center ${center.id}`
      );

      break; // Exit loop if donation is fully utilized
    }
  }

  if (totalQuantity > 0) {
    console.log("Remaining quantity distributed to other charity centers:");

    for (const center of charityCenters) {
      if (center.capacity > 0) {
        const quantityToDonate = Math.min(totalQuantity, center.capacity);
        center.capacity -= quantityToDonate;
        totalQuantity -= quantityToDonate;

        console.log(
          `Remaining ${quantityToDonate} ${donation.itemType} distributed to Charity Center ${center.id}`
        );

        if (totalQuantity === 0) {
          break; // Exit loop if remaining quantity is distributed
        }
      }
    }
  }
}

module.exports = {
  getLastDonation,
  calculateDistance,
  findNearestSuitableCenter,
};
