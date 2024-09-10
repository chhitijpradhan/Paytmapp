const mongoose = require ("mongoose");

mongoose.connect("mongodb+srv://chhitijpradhan13:%3Cdb_password%3E@chiti.1vi5uvu.mongodb.net/");


const userSchema = new mongoose.Schema ( {
  
    username : {
        type: String,
        required : true,
        unuiqe : true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
   
    password : {
        type : String,
        required : true,
        minLength : 6
    },
    first_name : {
        type: String,
        required : true,
        trim: true,
        maxLength : 50
    } ,
    last_name : {
        type:String,
        requied : true,
        trim : true,
        maxLength :50
    }
    
});
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObejectId,
        ref: 'User',
        required: true,
    },
    balacne:{
        type: Number,
        required:true,

    }
});

const User = mongoose.model('User',userSchema);
const Account = mongoose.model('Account',accountSchema);

module.exports = {
    User,
    Account
};
