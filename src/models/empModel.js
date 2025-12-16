const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    }
});

const Emp = new mongoose.model('emp',empSchema);
module.exports = Emp;