
const handleGetDashboard=(req,res)=>{
    if(!req.user){
        return res.redirect('/login');
    }
    res.render('dashboard',{'user':req.user});
}

module.exports={
    handleGetDashboard
}