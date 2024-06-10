import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


//Applicant Schema
const applicantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phone: {
    type: Number,
    required: [true, "Please provide your phone number"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minLength: [6, "Password must contain atleast 6 characters"],
  },
});

//Hashing
applicantSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//Comparing password
applicantSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,  this.password);
}

//Generate jwt token
applicantSchema.methods.generateJWTtoken = function (){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    })
}


export const Applicant = mongoose.model('Applicant', applicantSchema);