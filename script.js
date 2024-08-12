function calculateBookingPrice(numberOfPineapples) {
  const basePricePerPineapple = 100;
  let totalPrice = numberOfPineapples * basePricePerPineapple;

  if (numberOfPineapples >= 5) {
    totalPrice *= 0.9; // Apply 10% discount if the number is greater than or equal to 5
  }

  return totalPrice;
}

function updateTotalPrice(change) {
  const quantityInput = document.getElementById("pineappleQuantity");
  let quantity = parseInt(quantityInput.value);

  // Update the quantity
  quantity = Math.max(1, quantity + change);
  quantityInput.value = quantity;

  // Calculate and update the total price
  const totalCost = calculateBookingPrice(quantity);
  const payButton = document.getElementById("payButton");
  payButton.setAttribute("data-amount", totalCost);

  console.log("Total price for", quantity, "pineapples:", totalCost);
}

// Initialize the payment button with the default quantity
updateTotalPrice(0);

new window.IntaSend({
  publicAPIKey: "ISPubKey_test_fca63feb-3dda-4a84-898e-b657499071ba",
  live: false, // Set to true when going live
})
  .on("COMPLETE", (results) =>
    console.log("Do something on success", results)
  )
  .on("FAILED", (results) =>
    console.log("Do something on failure", results)
  )
  .on("IN-PROGRESS", (results) =>
    console.log("Payment in progress status", results)
  );
