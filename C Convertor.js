// Select all elements with the class "Currency"
const select = document.querySelectorAll('.Currency');

// Get the button element with the id "btn"
const btn = document.getElementById('btn');

// Fetch the list of currencies from the API
fetch('https://api.frankfurter.app/currencies')
  .then(res => res.json())
  .then(displayOptions);

// Function to display currency options in the select elements
function displayOptions(data) {
  // Extract the currency codes from the data
  const currencies = Object.keys(data);

  // Loop through each currency and add options to both select elements
  currencies.forEach(currency => {
    select.forEach(element => {
      const option = document.createElement('option');
      option.value = currency;
      option.textContent = currency;
      element.appendChild(option);
    });
  });
}

// Attach a click event listener to the button
btn.addEventListener('click', () => {
  // Get the selected currencies and input value
  const curr1 = select[0].value;
  const curr2 = select[1].value;
  const inputValue = parseFloat(document.getElementById('input').value);

  // Check if the selected currencies are the same
  if (curr1 === curr2) {
    alert('Please choose different currencies.');
  } else {
    // If different currencies, call the convert function
    convert(curr1, curr2, inputValue);
  }
});

// Function to convert currencies
function convert(curr1, curr2, inputValue) {
  // Define the API host
  const host = 'api.frankfurter.app';

  // Fetch the conversion rate from the API
  fetch(`https://${host}/latest?amount=${inputValue}&from=${curr1}&to=${curr2}`)
    .then(resp => resp.json())
    .then(data => {
      // Extract the conversion rate and display in the result input field
      const conversionRate = Object.values(data.rates)[0];
      document.getElementById('result').value = conversionRate.toFixed(2);
    });
}
