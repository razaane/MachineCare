const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user.repository");

const register = async(data)=>{
    if(!data.email){
        throw new Error("email is required !");
    }
    if(!data.nom){
        throw new Error("name is required !");
    }
    if(!data.password){
        throw new Error("password is required !");
    }
    const existingEmail = await userRepository.findByEmail(data.email);
    if(existingEmail){
        throw new Error("ce mail est dÃ©ja existe !");
    }
    const hashPassword = await bcrypt.hash(data.password,10);

    const userData = {
        nom : data.nom,
        email : data.email,
        password : hashPassword
    }
    return userRepository.create(userData);
}
const login = async (data) => {

    if (!data.email) {
        throw new Error("email is required !");
    }

    if (!data.password) {
        throw new Error("password is required !");
    }

    const user = await userRepository.findByEmail(data.email);

    if (!user) {
        throw new Error("Email ou mot de passe incorrect !");
    }

    const passwordCorrect = await bcrypt.compare(
        data.password,
        user.password
    );

    if (!passwordCorrect) {
        throw new Error("Email ou mot de passe incorrect !");
    }

    const token = jwt.sign({userId:user._id} , process.env.JWT_SECRET , {expiresIn:"1h"});
    return {token};
};

module.exports = {register,login}

