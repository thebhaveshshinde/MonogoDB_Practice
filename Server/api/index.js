require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")


const App = express()

mongoose.connect(process.env.MONGODB_URI ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {console.log("MongoDB Connected ...")})
.catch((error) => {console.log("Connection Failed ...", error )})

const userSchema = new mongoose.Schema({
    username : {type : String , required : true},
    password : {type : String , required : true},
    mobile : {type : Number , required : true } ,
    age :{type : Number , required : true}
})

const User = new mongoose.model('User' , userSchema);

App.use(express.json())

App.use(cors({
    origin :"https://monogo-db-practice.vercel.app",
    method : ['GET' , 'POST' , 'PUT' , 'DELETE']
}))
 
App.get("/" , async(req , res ) => {
    res.status(200).send("<html><head><title></title></head><body><h1>Welcome Everyone!</body></html>")
})

App.post("/api" , async (req , res ) => {
    const { username , password  , mobile ,  age } = req.body ; 
    

    try{
        const user = new User({username , password , mobile  , age})
        await user.save();

        res.status(200).json({message:"Registration Successfully ... "})
    }catch(error){
        res.status(500).json({message:"Server Error..." , error})
    }
})

module.exports = App; 

// App.listen(5000, () => {
//     console.log("Server Running on the port 5000 ...")
// })
