const Users = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../middlewares/generateToken');

exports.createUser = async (req, res, next) => {
    
    try {
        return await Users.findOne({email: req.body.email}).then( async(resp) => {
            if (!(resp === null)) {
                return res.status(409).json({
                    success: false,
                    message: "User already exists"
                })
            } else {
                const { firstName, lastName, email, password } = req.body;
                const role = "Author";
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const payload = {
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": email,
                    "password": hashedPassword,
                    "role": role
                };

                let user = new Users(payload);

                return await user.save().then((response) => {
                    return res.status(200).json({
                        name: response.name,
                        email: response.email,
                        _id: response._id,
                        accessToken: generateToken(response.name, response.email, response._id, response.role).Token,
                        rfsrt: generateToken(response.name, response.email, response._id, response.role).rfsrt
                    })
                })
               
            }
        })
    } catch(err){
        return res.status(504).json({ 
            success: false,
            error: err.message
        });
    }
};

exports.signInUser = async (req, res) => {
    try {
        return await Users.findOne({ email: req.body.email}).then(resp => {
            if(resp) {
                const isMatch = bcrypt.compareSync(req.body.password, resp.password);
                if (isMatch) {

                    return res.status(200).json({
                        success: true,
                        name: resp.name,
                        email: resp.email,
                        _id: resp._id,
                        accessToken: generateToken(resp.name, resp.email, resp._id, resp.role).Token,
                        rfsrt: generateToken(resp.name, resp.email, resp._id, resp.role).rfsrt
                    })
                } else {
                    return res.status(404).json({
                        succss: true,
                        message: "Incorrect Email or Password"
                    })
                }
            } else {
                return res.status(404).json({
                    succss: true,
                    message: "Incorrect Email or Password"
                })
            }
        })
    } catch (err) {
        return res.status(504).json({ 
            success: false,
            error: err.message
        });
    }
    
};
