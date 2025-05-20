const mongoose = require ('mongoose');
mongoose.connect("mongodb+srv://chiti:MlwnP8Ws1Em716if@cluster0.rohafwl.mongodb.net/ ");

const userSchema = new mongoose.Schema({
    usename:{
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength:3,
        maxLength: 30
    },
    password: {
        type:String,
        required: true,
        minlenght : 6
    },
    firstName :{
        type: String,
        required:true,
        trim: true,
        maxLength: 50
    },
    lastName : {
        type :String ,
        required :true,
        trim : true,
        maxLeght:50
    }
});

const accountSchema = new mongoose.Schema({
    useId:{
        type:mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance:{
        type: Number,
        requied :true
    }
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    Account
};