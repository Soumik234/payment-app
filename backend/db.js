const  mongoose=require('mongoose');
const {Schema}=mongoose;


mongoose.connect('mongodb+srv://soumikb1240:cg59KMgE2X4ux1vu@reat.89imp0z.mongodb.net/');

const userSchema=new Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String
})

const accountSchema=new Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
	balance: Number
})
const User=mongoose.model('User',userSchema);
const Account=mongoose.model('Account',accountSchema);

module.exports={
    User,Account
}