const mongoose=require('mongoose')
const validator=require('validator')

const signupSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        lowercase:true,
        unique:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("Please enter correct email");
            }
        },
        
    },
    password:{
        type:String,
        required:true
    },
    conpassword:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    }
})

const formCollection=new mongoose.model('formCollection',signupSchema)
module.exports=formCollection