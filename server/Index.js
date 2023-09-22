const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect(`mongodb+srv://root:arun476@cluster0.bjpcopw.mongodb.net/LogIn?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  // Handle the connection event
  const db =  mongoose.connection;
  
  db.on('error', (error) => {
    console.error('MongoDB Atlas Connection Error:', error);
  });
  
  db.once('open', () => {
    console.log('Connected to MongoDB Atlas');
    // You can start defining your schemas and models here
  });

  const schema=new mongoose.Schema({
    userid:{
      type:String,
    }
  })
  const p=mongoose.model('User',schema);
  app.post('/rr',(req,res)=>{
    console.log("hiii");
    const {userId,email,password}=req.body;
    const newuser=new p({
      userid:userId
    });
    newuser.save().then(()=>console.log("Success")).catch((err)=>console.log(err));
    const data=
    res.status(200).send();
  });
  app.listen(3030)
 
//   const mongoose = require('mongoose');
  
//   // Define a schema
//   const userSchema = new mongoose.Schema({
//     username: String,
//     email: String,
//   });
  
//   // Create a model based on the schema
//   const User = mongoose.model('User', userSchema);
  
//   // Usage example:
//   const newUser = new User({
//     username: 'john_doe',
//     email: 'john@example.com',
//   });
  
//   // Save the new user to the database
//   newUser.save((err) => {
//     if (err) {
//       console.error('Error saving user:', err);
//     } else {
//       console.log('User saved successfully!');
//     }
//   });
  
  
  
  
  

