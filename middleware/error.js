const winston=require('winston')

module.exports=function(err,req,res,next){                                      // catching the error whie doing async promise

   // winston level : Error, warning , info,verbos,debug silly
        
   
    res.status(500).send('something failed')
}