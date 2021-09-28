const User = require('../models/User')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse');

// @desc      Register
// @route     Post /api/v1/auth/register
// @access    Public
exports.register = (asyncHandler(async(req,res,next) => {
    const { 
        username,
        email,
        password,
        phone,
        role    
    } = req.body ;

    //Create User
    const user = await User.create({ 
        username,
        email,
        password,
        phone,
        role    
    });

    res.status(200).json({success : true , message : "User registered successfully", data : user})
}))


// @desc      Register
// @route     Post /api/v1/auth/register
// @access    Public
exports.login = (asyncHandler(async(req,res,next) => {

    const { email , password} = req.body

     // Validate emil & password
    if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
    }

    //check user
    const user = await User.findOne({email}).select('+password')

    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }
    
    //Check if password Mathces
    const isMatch = await user.matchPassword(password)

    if(!isMatch){
        return next(new ErrorResponse('Invalid credentials',401))
    }

    res.status(200).json({success : true , message : "User registered successfully", data : user})
}))
