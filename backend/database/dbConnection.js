import mongoose from "mongoose";

export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGODB_URI, {
        dbName: 'JOB_PORTAL'
    } )
    .then( ()=>{
        console.log("Connected to MongoDB")
    })
    .catch( (err)=>{
        console.log(`Error occurred while connecting to MongoDB: ${err}`)
    })
}