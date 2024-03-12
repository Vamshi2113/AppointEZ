const express=require('express');
const app=express();
const port=80;
const path=require('path');
require('dotenv').config();
const { sequelize,user,UserData,as_user } = require('./models');
// const User = require('./model/userModel.js');
// const UserData = require('./model/userDataModel.js');
const cookieParser = require('cookie-parser');
const verifyJWT=require('./middleware/verifyJWT.js');






app.use('/static',express.static('static'));
app.set('static',path.join(__dirname,'static'))

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));




app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());


app.use('/auth',require('./routes/register'));
app.use('/login',require('./routes/login'));
app.use('/refresh', require('./routes/refresh'));


app.get('/test',async(req,res)=>{
 const out= await user.findByPk(1,{include:[UserData]});
 const userrolesx=await as_user.findByPk(1,{include:[UserData]});
 res.json({"out":userrolesx});
})

app.use(verifyJWT);

app.use('/serviceprovider',require('./routes/serviceProvider.js'))



 

//---------------------------------------------------------sqlize-------------------------------------------------
sequelize.sync({ force: true })                                                                       
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });


//----------------------------------------------------------------------------------------------------------------


app.listen(port,()=>{
    console.log(`running on port ${port}`);
})


























