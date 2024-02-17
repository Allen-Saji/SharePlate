// Function to find the nearest suitable charity center (excluding previously donated and dietary restrictions)
function calculateDistance(point1, point2) {
  // Replace with your preferred distance calculation (e.g., haversine formula)
  console.log("lat:" + point1.latitude);
  const ans = Math.sqrt(
    Math.pow(point1.latitude - point2.latitude, 2) +
      Math.pow(point1.longitude - point2.longitude, 2)
  );
  console.log("ans" + ans);
  return ans;
}

// Function to find the nearest suitable charity center (excluding previously donated and dietary restrictions)
function findNearestSuitableCenter(donation, charityCenters, donationsMade) {
  let nearestCenter = null;
  let minDistance = Infinity;

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

    const distance = calculateDistance(donation.supplier_id, center);
    console.log(distance);

    if (distance < minDistance) {
      nearestCenter = center;
      minDistance = distance;
    }
  }

  return nearestCenter;
}

// Function to match donations with nearest suitable charity centers and handle ties
function matchDonationsAndDonate(donations, charityCenters) {
  const donationsMade = {}; // Track donations made with key as supplier_id + "_" + charity_center_id

  for (const donation of donations) {
    let nearestCenter = findNearestSuitableCenter(
      donation,
      charityCenters,
      donationsMade
    );

    // Handle ties: random selection for simplicity
    if (nearestCenter) {
      const key = `${donation.supplier_id}_${nearestCenter.id}`;
      donationsMade[key] = true;

      // Update charity center's capacity and food count
      nearestCenter.capacity -= donation.itemQuantity;
      if (donation.itemType === "veg") {
        const quantityToDonate = Math.min(
          donation.itemQuantity,
          nearestCenter.vegCount
        );
        nearestCenter.vegCount -= quantityToDonate;
        donation.itemQuantity -= quantityToDonate;
      } else {
        const quantityToDonate = Math.min(
          donation.itemQuantity,
          nearestCenter.nonVegCount
        );
        nearestCenter.nonVegCount -= quantityToDonate;
        donation.itemQuantity -= quantityToDonate;
      }

      console.log(
        `Donation from Supplier ${donation.supplier_id} for ${donation.itemQuantity} ${donation.itemType} donated to Charity Center ${nearestCenter.id}`
      );
    } else {
      console.log(
        `No suitable center found for Donation from Supplier ${donation.supplier_id}`
      );
    }

    // Distribute remaining quantity to other charity centers
    while (donation.itemQuantity > 0) {
      let otherCenter = charityCenters.find(
        (center) => center !== nearestCenter && center.capacity > 0
      );
      if (!otherCenter) break;

      const key = `${donation.supplier_id}_${otherCenter.id}`;
      donationsMade[key] = true;

      // Update charity center's capacity and food count
      otherCenter.capacity -= donation.itemQuantity;
      if (donation.itemType === "veg") {
        const quantityToDonate = Math.min(
          donation.itemQuantity,
          otherCenter.vegCount
        );
        otherCenter.vegCount -= quantityToDonate;
        donation.itemQuantity -= quantityToDonate;
      } else {
        const quantityToDonate = Math.min(
          donation.itemQuantity,
          otherCenter.nonVegCount
        );
        otherCenter.nonVegCount -= quantityToDonate;
        donation.itemQuantity -= quantityToDonate;
      }

      console.log(
        `Remaining ${donation.itemQuantity} ${donation.itemType} distributed to Charity Center ${otherCenter.id}`
      );
    }
  }
}

// Example usage
const donations = [
  {
    supplier_id: 1,
    itemType: "veg",
    itemQuantity: 60,
  },
  {
    supplier_id: 2,
    itemType: "non-veg",
    itemQuantity: 50,
  },
];

const suppliers = [
  {
    supplier_id: 1,
    name: "Supplier 1",
    authId: "auth1",
    latitude: 51.5074,
    longitude: -0.1278,
    phoneNumber: "1234567890",
    email: "supplier1@example.com",
    aadharNumber: "123456789012",
  },
  {
    supplier_id: 2,
    name: "Supplier 2",
    authId: "auth2",
    latitude: 51.5145,
    longitude: -0.1305,
    phoneNumber: "2345678901",
    email: "supplier2@example.com",
    aadharNumber: "234567890123",
  },
  {
    supplier_id: 3,
    name: "Supplier 3",
    authId: "auth3",
    latitude: 51.5051,
    longitude: -0.1208,
    phoneNumber: "3456789012",
    email: "supplier3@example.com",
    aadharNumber: "345678901234",
  },
];

const charityCenters = [
  {
    id: 1,
    latitude: 51.5098,
    longitude: -0.1327,
    vegCount: 20,
    nonVegCount: 40,
    capacity: 60, // Corrected capacity
  },
  {
    id: 2,
    latitude: 51.5025,
    longitude: -0.119,
    vegCount: 40,
    nonVegCount: 30,
    capacity: 70, // Corrected capacity
  },
  // Add more charity centers as needed
];

matchDonationsAndDonate(donations, charityCenters);
