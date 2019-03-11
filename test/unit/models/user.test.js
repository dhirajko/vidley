const {User}= require('../../../models/user')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
require('dotenv').config();

describe('user.genereateAuthToken',()=>{
    it('should return valid JWT',()=>{
        const payload={
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true}
        const user= new User(payload)
        const token=user.generateAuthToken();
        const decoded=jwt.verify(token,'')                  // use Jwt for decoding                 
        expect(decoded).toMatchObject(payload)

    })
})