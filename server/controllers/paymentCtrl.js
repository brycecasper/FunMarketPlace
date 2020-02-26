const stripe = require('stripe')(process.env.SECRET_STRIPE_KEY);
const EMAIL = process.env;

const mailOptions = {
    from: EMAIL,
    to: '',
    subject: 'Thanks for your purchase.',
    text: ''
}

module.exports = {
    pay: (req, res) => {
        const db = req.app.get('db');
        const transporter = req.app.get('transporter')
        const {token:{id}, totalPrice, cart_id, fun_marketplace_user_id, email} = req.body;
        stripe.charges.create(
            {
                amount: totalPrice,
                currency: 'usd',
                source: id,
                description: 'Purchase'
            },
            async(err) => {
                if(err){
                    return res.status(500).send(err)
                } else {
                    const customMailOptions = {...mailOptions, to: email, text: `Purchase details: total: $${totalPrice}`}
                    transporter.sendMail(customMailOptions, (err, data) => {
                       if(err) {
                          console.log(err)
                       } else {
                          console.log('email confirmation sent')
                          console.log(data)
                       }
                    })
                    await db.cart.payment_complete(cart_id)
                    await db.cart.create_order(fun_marketplace_user_id)
                    let user = await db.login.get_user(email);
                    delete user[0].password;
                    req.session.user = user[0]
                    return res.status(202).send(req.session.user);
                }
            }
        )
    }
}