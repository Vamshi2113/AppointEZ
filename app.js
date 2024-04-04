const express=require('express');
const app=express();
const port=80;
const path=require('path');
require('dotenv').config();
const { sequelize,user,UserData,as_user } = require('./models');
const cookieParser = require('cookie-parser');
const verifyJWT=require('./middleware/verifyJWT.js');






app.use('/static',express.static('static'));
app.set('static',path.join(__dirname,'static'))

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));




app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());


app.get('/',(req,res)=>{
    res.redirect('/login');
})
app.use('/auth',require('./routes/register'));
app.use('/login',require('./routes/login'));
app.use('/refresh', require('./routes/refresh'));


app.get('/dashboard',async(req,res)=>{
    res.render('dashboard');
})
app.get('/serviceproviderDashboard',async(req,res)=>{
    res.render('serviceproviderDashboard');
})


// app.use(verifyJWT);

app.use('/serviceprovider',verifyJWT,require('./routes/serviceProvider.js'))
app.use('/user',verifyJWT,require('./routes/users.js'))
app.use('/verify',verifyJWT,require('./routes/auth.js'))


 

//---------------------------------------------------------sqlize-------------------------------------------------
// sequelize.sync({ force: true })                                                                       
//   .then(() => {
//     console.log('Database synced');
//   })
//   .catch((err) => {
//     console.error('Error syncing database:', err);
//   });



sequelize.sync({ force: true }) // Remove { force: true } to prevent dropping tables
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

 
























