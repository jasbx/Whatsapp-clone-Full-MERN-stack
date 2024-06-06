const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    message:String,
    name:String,
    timestamps:String,
    recived:Boolean
   
})

const Model=mongoose.model('masseges',userSchema);

module.exports=Model;