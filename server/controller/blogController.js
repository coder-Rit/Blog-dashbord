const catchAsyncErorr = require("../middleware/catchAsyncErorr");
const blogModel = require("../model/blogModel");
const categoryModel = require("../model/categoryModel");


// find blogs
exports.getBlogs = catchAsyncErorr(async (req, res, next) => {
    const blogs = await blogModel.find({});
    res.status(200).json({
      msg: "Blogs",
      data:blogs
    });
  });


// add admin
exports.addBlog = catchAsyncErorr(async (req, res, next) => {
  if (req.body._id) {
    let temp = req.body
    let id = req.body._id
    delete _id 
    const blog = await blogModel.findByIdAndUpdate(id, temp);
    res.status(200).json({
      msg: "Blog updated",
      data:blog,
    });
  } else {
    const blog = await blogModel.create(req.body);
    res.status(200).json({
      msg: "New blog added",
      data:blog,
    });
  }
});

exports.deleteBlog = catchAsyncErorr(async (req, res, next) => {
  const blog = await blogModel.findByIdAndDelete(req.params.id);
  res.status(200).json({
    msg: "Blog Deleted",
  });
});


exports.getBloggerBlogs = catchAsyncErorr(async (req, res, next) => {
  const blogs = await blogModel.find({createdBy:req.params.email});
  res.status(200).json({
    msg: "Blog ",
    data:blogs
  });
});

exports.getRocomandBlogs = catchAsyncErorr(async (req, res, next) => {
  const blogs = await blogModel.find({recommended:true});
  res.status(200).json({
    msg: "Blog ",
    data:blogs
  });
});

exports.getstoriesBlogs = catchAsyncErorr(async (req, res, next) => {
  const blogs = await blogModel.find({stories:true});
  res.status(200).json({
    msg: "Blog ",
    data:blogs
  });
});

exports.getBlogById = catchAsyncErorr(async (req, res, next) => {
  const blogs = await blogModel.findById(req.params.blogId);
  res.status(200).json({
    msg: "Blog ",
    data:blogs
  });
});




//add category
exports.getCategory = catchAsyncErorr(async (req, res, next) => {
    const Category = await categoryModel.find({});
    res.status(200).json({
      msg: "Categorys",
      data:Category,
    });
  });


//add category
exports.addCategory = catchAsyncErorr(async (req, res, next) => {
  const Category = await categoryModel.create(req.body);
  res.status(200).json({
    msg: "New Category Added",
    data:Category,
  });
});

exports.deleteCategory = catchAsyncErorr(async (req, res, next) => {
  const blog = await categoryModel.findByIdAndDelete(req.params.id);
  res.status(200).json({
    msg: "Category Deleted",
  });
});
