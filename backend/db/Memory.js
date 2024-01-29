const mongoose= require("mongoose")

const memorySchema = new mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    tags:[String],
    img: {
        data: Buffer,
        contentType: String,
      },
    
    createdAt:{
        type:Date,
        default:new Date()
    }



    
})

module.exports= mongoose.model("memories",memorySchema)