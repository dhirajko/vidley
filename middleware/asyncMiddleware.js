const error=require('./error')                                                      //adding middleware for handling promise error
module.exports=function(handler){

return (req,res,next)=>{

    try {
        handler(req,res);
        
    } catch (error) {
        error(error);
    }

}

}