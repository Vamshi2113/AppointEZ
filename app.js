const express=require('express');
const app=express();
const port=80;
const path=require('path');
const sql=require('./MySqlConn.js');
require('dotenv').config();





//-------------------------------------------------SQL CONNECTION--------------------------------------------------------------
var con=sql.conn; 
//-----------------------------------------------------------------------------------------------------------------------------




app.use('/static',express.static('static'));
app.set('static',path.join(__dirname,'static'))

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));





app.get('/',(req,res)=>{
    res.render('home.pug');
});





app.listen(port,()=>{
    console.log(`running on port ${port}`);
})


























