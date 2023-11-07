const stripe = require('stripe')('your_secret_key');

app.post('/create-checkout-session', async (req, res) => {
    const cart = req.body.cart; // Received cart data from the client
    const lineItems = cart.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.name,
            },
            unit_amount: item.price * 100, // Amount in cents
        },
        quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'https://yourwebsite.com/success',
        cancel_url: 'https://yourwebsite.com/cancel',
    });

    res.json({ id: session.id });
});
