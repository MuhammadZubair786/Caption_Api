// const = [
//     "otp"
// ]
const jwt = require('jsonwebtoken');
const seckret_key = process.env.seckret_key;
exports.TokenGenerate=(userId,res)=>{
    console.log("test token")
    const token = jwt.sign({ userId: userId }, seckret_key, { expiresIn: '1h' });
    res.set("authtoken", token);
   return token

}