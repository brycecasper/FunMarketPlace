module.exports = {
    getElectronics: (req, res) => {
        const db = req.app.get('db');
        db.products.get_electronics()
        .then(products => res.status(200).send(products))
        .catch(err => res.status(500).send(err))
    },
    getClothing: (req, res) => {
        const db = req.app.get('db');
        db.products.get_clothing()
        .then(products => res.status(200).send(products))
        .catch(err => res.status(500).send(err))
    },
    getHome: (req, res) => {
        const db = req.app.get('db');
        db.products.get_home()
        .then(products => res.status(200).send(products))
        .catch(err => res.status(500).send(err))
    },
    getOutdoor: (req, res) => {
        const db = req.app.get('db');
        db.products.get_outdoor()
        .then(products => res.status(200).send(products))
        .catch(err => res.status(500).send(err))
    },
    search: (req, res) => {
        const {search} = req.body;
        const db = req.app.get('db');
        db.products.search_db(search)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send(err))
    }
}