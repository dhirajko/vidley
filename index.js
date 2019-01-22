const express=require ('express');                          //required import
const helmet = require('helmet')
const morgan = require('morgan');

const config=require("config");
const logger= require("./logger");
Const debDebugger=
const startupDebugger=require('debug') ('app:startup');
const app=express();


app.use(express.json());                                  //Application defind middleware in expressjs
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(helmet());


//console.log("Application  Name "+ config.get("name"));                  //use of config to see the environment setup
//console.log("Mail Server "+ config.get("mail.host"));
//console.log("Mail Server "+ config.get("mail.password"));




console.log(`${process.env.NODE_ENV}`);
console.log(`app: ${app.get("env")}`);                  //return current environment

if(app.get("env")=="development"){

    app.use( morgan("tiny"));  

    console.log("morgan enabled");                     // log request
                                  
}



app.use(logger);                                    //user define middleware


app.get('/',(req,res)=>{

    res.send("Hello World");
})

app.post('/',(req,res)=>{
    
    
    res.send(JSON.stringify(req.body));
})

app.listen(3000,console.log("running port 3000"))