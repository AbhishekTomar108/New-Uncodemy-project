const mongoose = require("mongoose");
const {Schema} = mongoose


const UploadAssignment = new Schema({
    file:{
       type:String
    },
    LinkedinId:{
       type:String
    },
    Name: {
        type: String 
    },
    Number: {
        type: String 
    },
    Email: {
        type: String 
    }, 
    Password: {
        type: String 
    },  
    Headline: {
        type: String 
    },  
    code: {
        type: String 
    },  
    CompanyName: {
        type: String 
    },  
    Address: {
        type: String 
    },  
    bio: {
        type: String 
    },  
    url: {
        type: String
    },  
    date:{
        type: Date,
        default: Date.now
    },
    Course:{
        type:Object
    },
    weekDaysBatch:{
        type:Object
    },
    WeekEndBatch:{
        type:Object
    }
})
const uploaditem = mongoose.model("uploadassignments", UploadAssignment);

module.exports = uploaditem;