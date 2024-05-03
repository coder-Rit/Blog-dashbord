const mongoose = require('mongoose')
 



const blogSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    stories: {
        type: Boolean,
        default:false
    },
    recommended: {
        type: Boolean,
        default:false
    },
    category:[{
        type: String,
        required: true,
    }], 
    paragraph:{
        type:String,
        require:true
    },
    createdBy:{
        type:String,
        require:true
    },
   
})
 

module.exports = mongoose.model('blog', blogSchema)

