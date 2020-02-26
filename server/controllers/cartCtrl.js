module.exports = {
    postToCart: (req, res) => {
        const {cart_id, products_id, price} = req.body;
        const db = req.app.get('db');
        db.products.add_order({order_id: cart_id, products_id, price})
        .then(data => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },
    getCart: (req, res) => {
        const {cart_id} = req.params;
        const db = req.app.get('db');
        db.cart.get_cart(cart_id)
        .then(order_products => res.status(200).send(order_products))
        .catch(err => res.status(500).send(err))
    },
    deleteProduct: (req, res) => {
        const {order_products_id} = req.params;
        const db = req.app.get('db');
        db.cart.delete_product(order_products_id)
        .then(order_products => res.status(200).send(order_products))
        .catch(err => res.status(500).send(err))
    }
}