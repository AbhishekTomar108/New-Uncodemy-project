const mongoose = require("mongoose");
const {Schema} = mongoose


const UploadAssignment = new Schema({
    file:{
       type:String
    },
       
    url: {
        type: String
    },  
    trainer: {
        type: String
    },  
    batch: {
        type: String
    },  
    Trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'counselors'
    },  
    date:{
        type: Date,
        default: Date.now
    },
   
})
const uploaditem = mongoose.model("uploadassignments", UploadAssignment);

module.exports = uploaditem;