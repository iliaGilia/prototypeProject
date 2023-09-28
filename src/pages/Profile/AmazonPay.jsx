import React, { useEffect } from 'react';

function AmazonPay() {
  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');
    script.src = 'https://static-na.payments-amazon.com/checkout.js';
    script.async = true;

    // Add an onload event listener to the script
    script.onload = () => {
      window.amazon.Pay.renderButton('#amazon-pay-button', {
        merchantId: 'YOUR_MERCHANT_ID',
        sandbox: true, // Set to 'false' for production
        ledgerCurrency: 'USD', // Replace with your desired currency code
        placement: 'Cart', // Replace with your desired placement
        onClick: function() {
          // Handle button click event
        },
        onError: function(error) {
          // Handle errors
        },
        onPaymentSelect: function(details) {
          // Handle payment selection
        },
        onOrderReferenceCreate: function(orderReference) {
          // Handle order reference creation
        },
        // Add additional callbacks as needed
      });
    };

    // Append the script to the document body
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <div id="amazon-pay-button"></div>
    </div>
  );
}

export default AmazonPay;
