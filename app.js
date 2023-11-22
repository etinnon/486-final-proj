require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')
const port = (process.env.PORT || 5500)
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;
// email||text capability
const nodemailer = require('nodemailer')
const ejs = require('ejs');
// pass: process.env.APP_PWD

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mail_send',
    pass: 'mail_pass',
  },
});
// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

// Define a route to send the email
app.get('/sendEmail', (req, res) => {
  // Render the EJS template with the text you want to send
  ejs.renderFile(__dirname + '/views/email.ejs', { message: 'Anna, you received a new order - please get back with your customer immediately!' }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      // Define email options
      const mailOptions = {
        from: email.env.mail_send,
        to: email.env.mail_get,
        subject: 'New Order Inquiry!',
        html: data,
      };

      // Send the email (error message)
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.send('Error: ' + error);
        } else {
          console.log('Email sent: ' + info.response);
          res.send('Email sent: ' + info.response);
        }
      });
    }
  });
});


// app.use(express.public( path.join(__dirname, './public')));

app.post('/login', (req, res) => {
  res.render('login');

});

app.get('/adminCenter', async (req, res) => {

  client.connect;
   let mongoResult = await client.db("humphries-cool-papa-database").collection("dev-profiles").find().toArray();
 // console.log("get/: ", result);
 console.log(mongoResult);
   //'res.send("here for a second: " + result[0].name)
   res.render('adminCenter', { 
     profileData : mongoResult })
 })


app.get('/order', async (req, res) => {

  client.connect;
   let mongoResult = await client.db("humphries-cool-papa-database").collection("dev-profiles").find().toArray();
 // console.log("get/: ", result);
 console.log(mongoResult);
   //'res.send("here for a second: " + result[0].name)
   res.render('order', { 
     profileData : mongoResult })
 })


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
//run().catch(console.dir);

async function cxnDB(){

  try{
    await client.connect().then(
      client.db("humphries-cool-papa-database").collection("dev-profiles")
      );       
  }
  catch(e){
      console.log(e)
  }
  finally{
    client.close; 
  }
}


app.get('/', async (req, res) => {

 client.connect;
  let mongoResult = await client.db("humphries-cool-papa-database").collection("dev-profiles").find().toArray();
// console.log("get/: ", result);
console.log(mongoResult);
  //'res.send("here for a second: " + result[0].name)
  res.render('index', { 
    profileData : mongoResult })
})

// Update Database
app.post('/updateProfile', async (req, res) => {

  try {
    //get the new dev name
    console.log("body: ", req.body)
    console.log("user Name: ", req.body.devName)
    
    client.connect; 
    const collection = client.db("humphries-cool-papa-database").collection("dev-profiles");
  
    // put it into mongo
    let result = await collection.findOneAndUpdate( 
      { _id: new ObjectId( req.body.devId ) },
      {$set: {name: req.body.devName }})
      .then(result => {
        console.log(result); 
        res.redirect('/');
      })
      .catch(error => console.error(error))
     
   
  }
  finally{
    //client.close()
  }
})


// Insert users into database
app.post('/submitOrder', async (req, res) => {

  try {
    //get the new dev name
    console.log("body: ", req.body)
    console.log("user Name: ", req.body.custName)
    
    client.connect; 
    const collection = client.db("humphries-cool-papa-database").collection("dev-profiles");
  
    // put it into mongo
    let result = await collection.insertOne( 
      { CustomerName: req.body.custName, CustomerPhone: req.body.phone, CustomerCake: req.body.optradio, CustomerCustomize: req.body.customize })
      .then(result => {
        console.log(result); 
        res.redirect('/');
      })
      .catch(error => console.error(error))
      
     
   
  }
  finally{
    //client.close()
  }
})


// delete users from database
app.post('/deleteProfile', async (req, res) => {

  try {
    //get the new dev name
    console.log("body: ", req.body)
    console.log("user Name: ", req.body.devName)
    
    client.connect; 
    const collection = client.db("humphries-cool-papa-database").collection("dev-profiles");
  
    // put it into mongo
    let result = await collection.findOneAndDelete( 
      { _id: new ObjectId( req.body.devId) })
      .then(result => {
        console.log(result); 
        res.redirect('/adminCenter');
      })
      .catch(error => console.error(error))
     
   
  }
  finally{
    //client.close()
  }
})

let myVariableServer = 'soft coded server data';

app.get('/humphries', function (req, res) {
  res.render('index', 
  {
    'myVariableClient' : myVariableServer 
  }
  );
})

app.post('/postClientData', function (req, res) {
  
   console.log("body: ", req.body)
   console.log("user Name: ", req.body.userName)
  //  console.log("params: ", req.params['userName']);
  
  // myVariableServer = req.body.userName;

  res.render('index', 
  {
    'myVariableClient' : req.body.userName 
  }
  );
})

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: emai.env.mail_send',
//     // Password needs to be hidden in ENV file
//     pass: email.env.mail_pass',
//   }
// });

// var mailOptions = {
//   from: 'anna.stokes.e@gmail.com',
//   to: email.env.mail_get',
//   subject: 'Southend Kitchen Inquiry Confirmation!',
//   text; ' Hello Anna, ' + req.body.name +', left an order inquiry! Please review and respond as quicly as possible!
// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

// res.redirect('/');
// })



// app.get('/', function (req, res) {
//   res.send('<h1>Hello World From Express & a PaaS/Render</h1>')
// })

// app.get('/whatever', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// })



// app.listen(3000)

app.listen(port, () => console.log(`Server is running...on ${ port }` ));