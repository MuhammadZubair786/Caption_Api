const { validateLogin } = require("../Validator/userValidate");
const userModel = require("../Model/userModel");
const seckret_key = process.env.seckret_key;
const bcypt = require("bcryptjs")
const jwt = require('jsonwebtoken');


//admin login
exports.adminLogin = async (req, res) => {

    try {
        const validationResult = validateLogin(req.body);
        const { email, password } = req.body
        console.log(seckret_key)

        if (validationResult) {
            console.error('Validation error:', validationResult.message);
            return res.json({ message: validationResult.message });
        }
        else {
            let user = await userModel.findOne({ email }).populate("profileId");

            if (user != null && user.userType=="admin") {

                const isPasswordValid = await bcypt.compare(password, user.password);

                if (isPasswordValid) {
                    if (user.isVerify) {
                        if (user.isCompleteProfile) {

                            const token = jwt.sign({ userId: user._id }, seckret_key);
                            


                            return res.status(200).json({ message: "Admin Login SuccessFully", data: user, token });


                        }
                        else {
                            return res.status(200).json({ message: "Plz Compelete Your Profile", data: user });
                        }

                    }
                    else {
                        return res.status(200).json({ message: "Plz Verify Your Account", data: user });
                    }
                }
                else {
                    return res.status(401).json({ message: "Password Incorrect" });
                }
            }
            else if(user!=null) {
                console.log("please login as Admin")
                return res.status(404).json({ message: "please login as Admin" });
            }
            else{
                console.log("User Not Found")
                return res.status(200).json({ message: "User Not Found" });
            }

        }
    }
    catch (e) {
        return res.status(409).json({ message: 'error',error: e });
    }
}
