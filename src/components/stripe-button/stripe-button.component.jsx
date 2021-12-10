import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  // price must be in cents $50 = 5000
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51K4taND2VDDHoBwL9ASs5Wnb0PURc9f047UdybFVkrTHNUCnbT2zMlffgtynjtOBio6EdWJE9wEoeHwj8mh25YaF00FtlZk978';

  const onToken = token => {
    console.log(token);
    alert('Payment Success');
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="EMPR ECommerce"
      billingAddress
      shippingAddress
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
