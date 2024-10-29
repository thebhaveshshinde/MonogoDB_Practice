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
    age :{type : Number , required : true}
})

const User = new mongoose.model('User' , userSchema);

App.use(express.json())
App.use(cors({origin:"http://localhost:5173"}))
 

App.post("/api/index" , async (req , res ) => {
    const { username , password , age } = req.body ; 

    try{
        const user = new User({username , password , age})
        await user.save();

        res.status(200).json({message:"Registration Successfully ... "})
    }catch(error){
        res.status(500).json({message:"Server Error..." , error})
    }
})


App.listen(5000, () => {
    console.log("Server Running on the port 5000 ...")
})