const charityCenters = [
  {
    id: 1,
    latitude: 51.5098,
    longitude: -0.1327,
    vegCount: 20,
    nonVegCount: 40,
    capacity: 100,
  },
  {
    id: 2,
    latitude: 51.5025,
    longitude: -0.119,
    vegCount: 40,
    nonVegCount: 30,
    capacity: 100,
  },
];

// Function to calculate distance between two points
function calculateDistance(point1, point2) {
  // Replace with your preferred distance calculation (e.g., haversine formula)
  return Math.sqrt(
    Math.pow(point1.latitude - point2.latitude, 2) +
      Math.pow(point1.longitude - point2.longitude, 2)
  );
}

// Function to find the nearest suitable charity center (excluding previously donated and dietary restrictions)
function findNearestSuitableCenter(donation, charityCenters, donations) {
  let nearestCenter = null;
  let minDistance = Infinity;

  for (const center of charityCenters) {
    // Check if already donated, has capacity, and matches food type
    const key = `${donation.supplier_id}_${center.id}`;
    if (
      donations[key] ||
      center.vegCount + center.nonVegCount >= center.capacity
    ) {
      continue;
    }

    // Check for vegetarian donation with insufficient vegCount at center
    if (
      donation.itemType === "veg" &&
      center.vegCount < donation.itemQuantity
    ) {
      // Donate available vegCount and update donation quantity
      donation.itemQuantity -= center.vegCount;
      center.vegCount = 0;
      continue;
    }

    const distance = calculateDistance(donation.supplier_id, center);

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
    let remainingQuantity = donation.itemQuantity;
    let donatedToCenters = []; // Track donated centers to avoid duplicates

    while (remainingQuantity > 0) {
      let nearestCenter = findNearestSuitableCenter(
        donation,
        charityCenters,
        donationsMade
      );

      // Handle ties: random selection for simplicity
      if (
        nearestCenter &&
        !donationsMade[`${donation.supplier_id}_${nearestCenter.id}`] &&
        !donatedToCenters.includes(nearestCenter.id)
      ) {
        const sameDistanceCenters = charityCenters.filter(
          (center) =>
            calculateDistance(donation.supplier_id, center) === minDistance &&
            center !== nearestCenter
        );

        if (sameDistanceCenters.length > 1) {
          nearestCenter =
            sameDistanceCenters[
              Math.floor(Math.random() * sameDistanceCenters.length)
            ];
        }

        const key = `${donation.supplier_id}_${nearestCenter.id}`;
        donationsMade[key] = true;
        donatedToCenters.push(nearestCenter.id);

        // Check item type and donate accordingly
        if (donation.itemType === "veg") {
          const quantityToDonate = Math.min(
            remainingQuantity,
            nearestCenter.vegCount
          );
          nearestCenter.vegCount -= quantityToDonate;
          remainingQuantity -= quantityToDonate;
        } else {
          const quantityToDonate = Math.min(
            remainingQuantity,
            nearestCenter.nonVegCount
          );
          nearestCenter.nonVegCount -= quantityToDonate;
          remainingQuantity -= quantityToDonate;
        }

        // Log donation information (donation, quantity, item type, and center)
        console.log(
          `Donation from Supplier ${donation.supplier_id} for ${quantityToDonate} ${donation.itemType} donated to Charity Center ${nearestCenter.id}`
        );
      } else {
        // No suitable center found for remaining quantity
        console.log("No suitable center found for remaining quantity");
        break;
      }
    }
  }
}

// Example usage
const donations = [
  {
    supplier_id: 1,
    itemType: "veg",
    itemQuantity: 70,
  },
  {
    supplier_id: 2,
    itemType: "non-veg",
    itemQuantity: 20,
  },
  {
    supplier_id: 3,
    itemType: "veg",
    itemQuantity: 30,
  },
];

matchDonationsAndDonate(donations, charityCenters);
