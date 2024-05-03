const catchAsyncErorr = require("../middleware/catchAsyncErorr");
 
const userModel = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendJwt = require("../utils/sendJwt");


// signUp
exports.signUp = catchAsyncErorr(async (req, res, next) => {  
  let a  = req.body
    const newAcc = await userModel.create(a);
    sendJwt(newAcc, res, "Account is crated successfully", 201, req);
  
}); 


// add admin
exports.addAdmin = catchAsyncErorr(async (req, res, next) => {  
  let a  = req.body
    const newAcc = await userModel.create(a);
    res.status(200).json({
      msg: "New admin added",
      user: newAcc,
    });
  
}); 
// add admin
exports.addBlogger = catchAsyncErorr(async (req, res, next) => {  
  let a  = req.body
  a.role = "blogger"

    const newAcc = await userModel.create(a);

    res.status(200).json({
      msg: "New blogger added",
      user: newAcc,
    });
  
});


// getUser
exports.getUsers = catchAsyncErorr(async (req, res, next) => {  
    const newAcc = await userModel.find({});

    res.status(200).json({
      msg: "Users List",
      user: newAcc,
    });
  
}); 



 
 
 
// loged in
exports.login = catchAsyncErorr(async (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return next(
      new ErrorHandler("Please enter your email or password", 400)
    );
  } 
  const user = await userModel.findOne({ email }).select("+password"); 
  console.log(user);
  if (!user) {
    return next(new ErrorHandler("User does not exist", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Wrong Password", 404));
  }
  console.log(user); 
  
  sendJwt(user, res, "LogeIn Successfully", 200, req);
});
 
// log out
exports.logOut = catchAsyncErorr((req, res, next) => {
  res
    .clearCookie("token", {
      expire: new Date(Date.now() - 1000),
      httpOnly: true,
    })
    .json({
      msg: "logout successfully",
      logOut:true
    });
});

 
// delete User
exports.deleteUser = catchAsyncErorr( async(req, res, next) => {

  const newAcc = await userModel.findByIdAndDelete(req.params.id);

  
  res.status(200).json({
    msg: "user deleted",
  });

   
});

 