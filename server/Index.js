const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect(`mongodb+srv://root:arun476@cluster0.bjpcopw.mongodb.net/LogIn?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>console.log("Connected to MongoDB Atlas")).catch((err)=>console.log('MongoDB Atlas Connection Error:',err));
  

  const schema=new mongoose.Schema({
    userid:{
      type:String,
    },
    Doctor:{
        type:String
    }
  })
  const p=mongoose.model('User',schema);
  app.post('/rr',async(req,res)=>{
    
    const {userId,email}=req.body;
    try {
      const updatedUser = await p.findOneAndUpdate(
        { userid: userId },
        { $set: { Doctor: email } },
        { new: true }
      );
  
      if (updatedUser) {
        console.log('User updated successfully:', updatedUser);
        res.status(200).json(updatedUser);
      } else {
        console.log('User not found.');
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Error updating user' });
    }
  });
  app.get('/r',(req,res)=>{
    p.find({}).then( (users, err) => {
      if (err) {
        console.error('Error retrieving users:', err);
        res.status(500).json({ error: 'Error retrieving users' });
      } else {
        console.log(users);
      }});
  })
  app.listen(3030)