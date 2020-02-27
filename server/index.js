require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const massive = require('massive');
const app = express();
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, EMAIL, PASSWORD} = process.env;
const aws = require('aws-sdk');
const port = SERVER_PORT;
const authCtrl = require('./controllers/authCtrl');
const cartCtrl = require('./controllers/cartCtrl');
const productsCtrl = require('./controllers/productsCtrl');
const musicCtrl = require('./controllers/musicCtrl');
const paymentCtrl = require('./controllers/paymentCtrl');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
})

app.use(cors());
app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 60}
}));

massive(CONNECTION_STRING)
.then(db => {
    app.set('db', db);
    app.set('transporter', transporter)
    console.log('database connected');
    app.listen(port, () => {
        console.log(`Server running on ${port}`);
    })
})

//ENDPOINTS

//AMAZON S3
app.get('/sign-s3', (req, res) => {

    aws.config = {
      region: 'us-west-1',
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY
    }
    
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };
  
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
  
      return res.send(returnData)
    });
});

//LOGIN
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.post('/auth/logout', authCtrl.logout);
app.put('/auth/email/:fun_marketplace_user_id', authCtrl.updateEmail);

//CART
app.post('/api/post-cart', cartCtrl.postToCart);
app.get('/api/cart/:cart_id', cartCtrl.getCart);
app.delete('/api/cart/:order_products_id', cartCtrl.deleteProduct);
app.post('/api/payment', paymentCtrl.pay);

//PRODUCTS
app.get('/api/electronics', productsCtrl.getElectronics);
app.get('/api/clothing', productsCtrl.getClothing);
app.get('/api/home', productsCtrl.getHome);
app.get('/api/outdoor', productsCtrl.getOutdoor);
app.post('/api/look', productsCtrl.search);

//MUSIC
app.get('/api/songs', musicCtrl.getSongs);
app.get('/api/albums', musicCtrl.getAlbums);
app.get('/api/artists', musicCtrl.getArtists);
app.get('/api/featured', musicCtrl.getFeatured);
app.get('/api/discover', musicCtrl.getDiscover);
app.get('/api/top', musicCtrl.getTop);
app.get('/api/queue', musicCtrl.getQueue);