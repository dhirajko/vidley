module.exports=function(err,req,res,next){                                      // catching the error whie doing async promise
res.status(500).send('something failed')
}