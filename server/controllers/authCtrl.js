const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        const db = req.app.get('db');
        const {email, password} = req.body;
        const {session} = req;

        let user = await db.login.get_user(email);
        if(user[0]){
            return res.status(400).send('User already exists');
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        let registeredUser = await db.login.register_user(email, hash);

        let userCart = await db.cart.create_order(registeredUser[0].fun_marketplace_user_id)
        session.user = {...registeredUser[0], ...userCart[0]};
        res.status(201).send(session.user);
    },

    login: async(req, res) => {
        const {email, password} = req.body;
        const db = req.app.get('db');
        const {session} = req;

        let user = await db.login.get_user(email);
        if(!user[0]){
            return res.status(400).send('Username not found');
        }

        const authenticated = bcrypt.compareSync(password, user[0].password);
        if(!authenticated){
            return res.status(401).send('Password is incorrect');
        }

        delete user[0].password;
        session.user = user[0]
        res.status(202).send(session.user);
    },

    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },

    updateEmail: async(req, res) => {
        const {fun_marketplace_user_id} = req.params;
        const {email} = req.body;
        const db = req.app.get('db');
        await db.login.update_email({fun_marketplace_user_id, email})
        db.login.get_user(email)
        .then(fun_marketplace_user => {
            delete fun_marketplace_user[0].password
            req.session.user = fun_marketplace_user[0]
            res.status(200).send(req.session.user)})
        .catch(err => res.status(500).send(err))
    }
}