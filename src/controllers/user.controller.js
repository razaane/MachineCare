const userService = require("../services/user.service"); 

const register = async(req,res)=>{
    try{
        const user = await userService.register(req.body);
        res.status(201).json({
            message : "user create successfully",
            user
        });
    }catch(error){
        res.status(400).json({
            message : error.message
        })
    }
}

const login = async (req, res) => {

    try {

        const user = await userService.login(req.body);

        res.status(200).json({
            message: "Login successful",
            token : user.token
        });

    } catch (error) {

        res.status(401).json({
            message: error.message
        });

    }
};


const getMe = async (req, res) => {
    try {
        const user = await userService.getOwnProfile(req.user.userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const updateMe = async (req, res) => {
    try {
        const user = await userService.updateOwnProfile(req.user.userId, req.body);
        res.status(200).json({
            message: "profile updated successfully",
            user
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
module.exports = {
    register,
    login, getMe, updateMe
};
