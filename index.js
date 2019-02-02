const express=require ('express');                                   //required import of node installed packages and dependies
const helmet = require('helmet')
const morgan = require('morgan');
const startupDebugger=require('debug') ('app:startup');
const dbDebugger=require('debug') ('app:db');
const config=require("config");
const mongoose=require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);                            // To validater object id



const logger= require("./logger");                                      // require user define files              
const genres= require("./router/genres")
const customer=require("./router/customer")
const movie=require('./router/movie')
const rental=require('./router/rental')


const app=express();
mongoose.connect('mongodb://localhost/vidly',{ useNewUrlParser: true })
    .then(()=>{console.log('Connected to mongodb...')})
    .catch((err)=>{console.log('couldnot connect to Mongodb...');
    })


app.use(express.json());                                                //Application defind middleware in expressjs
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(helmet());


app.use(logger);                                                            //sample user define middleware
app.use('/api/genres',genres);
app.use("/api/customer",customer);
app.use("/api/movie",movie)
app.use ('/api/rental',rental)



//console.log("Application  Name "+ config.get("name"));                  //use of config to see the environment setup
//console.log("Mail Server "+ config.get("mail.host"));
//console.log("Mail Server "+ config.get("mail.password"));




console.log(`${process.env.NODE_ENV}`);
console.log(`app: ${app.get("env")}`);                                   //return current environment

if(app.get("env")=="development"){

    app.use( morgan("tiny"));  

    console.log("morgan enabled");                                      // log request
                                  
}


const port =process.env.PORT||3000
app.listen(3000,console.log(`running port ${port}` ))