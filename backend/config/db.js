const mongoose = require('mongoose')

const connectDB = async (mongourl) =>{
    try{
        await mongoose.connect(mongourl).then(()=>{
             console.log("DB Connected");
        })
    }catch(err){
        console.log(err)
    }
}


module.exports = connectDB;