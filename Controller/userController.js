const bcypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const { AuthValidator } = require("../Validator/AuthValidate");
const userModel = require("../Model/userModel");

const nodemailer = require("nodemailer");
const { check_missing_fields } = require("../helper/common_function");
const { ProfileValidator } = require("../Validator/ProfileValidate");
const profileModel = require("../Model/profileModel");
const constantFunc = require("../constant/user");
const { validaterequest } = require("../Validator/RequestValidate");
const categoryModel = require("../Model/categoryModel");
const seckret_key = process.env.seckret_key;

const sdk = require('api')('@revenuecat/v1.sk_WbQPaFbmWnZVfaKRuCXaLRVjNqDDk');


exports.createTicket = async (req, res) => {
    try {
        const { admin_id, title, description, status } = req.body;

        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({
                message: "Unauthorized - Token not provided",
            });
        }



        const decoded = jwt.verify(authorization, seckret_key);
        req.userId = decoded.userId;
        const validationResult = validateTicket(req.body);



        if (validationResult) {
            console.error('Validation error:', validationResult.message);
            return res.status(400).json({ message: validationResult.message });
        }

        const user = await userModel.findById(req.userId).populate('profileId');
        const admin = await userModel.findById(admin_id);

        if (user && admin) {
            const ticketData = new ticketModel({
                user_id: req.userId,
                admin_id,
                title,
                description,
                status,
            });

            await ticketData.save();



            return res.status(201).json({ message: 'Ticket created successfully', data: ticketData });
        } else {
            return res.status(404).json({ message: 'User or admin not found' });
        }

    } catch (e) {
        console.error('Error:', e);
        return res.status(500).json({
            message: 'Internal server error',
            error: e,
        });
    }




}


exports.getAllTickets = async (req, res) => {
    try {
        // sdk.subscribers({app_user_id: 'app_user_id', 'x-platform': 'ios'})
        // .then(({ data }) => console.log(data))
        // .catch(err => console.error(err));
    } catch (e) {
        console.error('Error:', e);
        return res.status(500).json({
            message: 'Internal server error',
            error: e,
        });
    }
};

exports.getAllUser = async (req, res) => {
    try {
        var user = await userModel.findById(req.userId)
        if (user) {
            var getUser = await userModel.find({ userType: "user", _id: { $ne: req.userId } }).populate("profileId")
            return res.status(200).json({
                message: 'user get test',
                data: getUser
            });
        }


    }
    catch (e) {
        console.error('Error:', e);
        return res.status(500).json({
            message: 'Internal server error',
            error: e,
        });
    }

}

exports.sendRequest = async (req, res) => {
    try {
        var user = await userModel.findById(req.userId)
        
        if (user) {
            const validationResult = validaterequest(req.body);

            if (validationResult) {
                console.error('Validation error:', validationResult.message);
                return res.json({ message: validationResult.message });
        
            }

            return res.status(200).json({
                message: 'user get test',
                data: user
            });
        }

    }
    catch (e) {
        return res.status(500).json({
            message: 'error',
            
        });

    }
}


exports.getUser = async (req, res) => {
    console.log(req.userId)
  

        let user = await userModel.findById(req.userId).populate("profileId");

        if(user!=null){
            return res.status(200).json({ message: "Get Current user", data:user  });

        }
        else{
            return res.status(200).json({ message: "Not get Current Users", data:user  });   
        }

      
    

}

exports.viewCategory = async (req, res) => {
    try {

        let category = await categoryModel.find({}) .populate({
            path: "sub_category Caption",
            populate: {
              path: "Caption"
            }
          });
        return res.status(200).json({ message: 'View All Category', data: category });

    }
    catch(e){
        return res.status(409).json({ error: 'Error' });
    }

}

