const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        email :{
            type : string,
            required : true,
            trim :true,
            unique : true,
            lowercase:true,
        },
        password:{
            type : string,
            required : true,
        },
    },
    {timestamps:true}
);
userSchema.index({ email: 1 }, { unique: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};


module.exports=mongoose.model('User',userSchema);
