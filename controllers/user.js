const User = require('../models/User')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse');


// @desc      Get all users
// @route     GET /api/v1/users
// @access    Public
exports.getUsers = asyncHandler(async(req,res,next) => {
  let query 

  query = User.find(req.query)
  
  //Sorting
  if(req.query.sort){
    const sortBy = req.query.sort.split(",").join(" ")
    query = query.sort(sortBy);
  }else{
    query = query.sort("-createdAt")
  }

  const users = await query;
    res.status(200).json({
        success : true,
        count : users.length,
        data : users
    })
})

// @desc      Get a user
// @route     GET /api/v1/users/:id
// @access    Private
exports.getUser = asyncHandler(async(req,res,next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
          new ErrorResponse(`user not found with id of ${req.params.id}`, 404)
        );
      }

    res.status(200).json({
        success : true,
        data : user
    })
})

// @desc      update a user
// @route     PUT /api/v1/users/:id
// @access    Private
exports.updateUser = asyncHandler(async(req,res,next) => {
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        validators : true
    });

    if (!user) {
        return next(
          new ErrorResponse(`user not found with id of ${req.params.id}`, 404)
        );
      }

    res.status(200).json({
        success : true,
        data : user
    })
})


// @desc      DELETE a user
// @route     DELETE /api/v1/users/:id
// @access    Public
exports.deleteUser = asyncHandler(async(req,res,next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return next(
          new ErrorResponse(`user not found with id of ${req.params.id}`, 404)
        );
      }

    res.status(200).json({
        success:true,
        message: "deleted succesfully"
      })
})