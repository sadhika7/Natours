import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51H87UeE11FMNo7iryRChJkM0YQ5SD1GtYf7LVHe0L0b0qoPW61BnVr5ox6SDpEGqR9OaOGZvtfR6kTq7RuwYZ5jD00LAnSklvc'
);

export const bookTour = async (tourId) => {
  try {
    //1. Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    //console.log(session);

    //2. Create checkout form + charge credit card

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
