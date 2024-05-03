const express = require('express')
const { signUp, login, logOut, addAdmin,addBlogger, getUsers,deleteUser } = require('../controller/userContoller')
const { isAuthenticated, authorizedRole } = require('../middleware/auth')
const { uploadImage } = require('../controller/uploadController')
const { getBlogs, addBlog, deleteBlog, getCategory, addCategory, deleteCategory ,getBloggerBlogs,getRocomandBlogs,getstoriesBlogs,getBlogById } = require('../controller/blogController')
 

const Router = express.Router()

//user router

Router.route("/signup").post(signUp)
Router.route("/addAdmin").post(isAuthenticated,authorizedRole("admin"),addAdmin)
Router.route("/addBlogger").post(isAuthenticated,authorizedRole("admin"),addBlogger)
Router.route("/getUsers").get(isAuthenticated,authorizedRole("admin"),getUsers)
Router.route("/deleteUser/:id").post(isAuthenticated,authorizedRole("admin"),deleteUser)
Router.route("/login").post(login)
Router.route("/logout").get(logOut)


//blog router
Router.route("/getBlogs").get(getBlogs) // for all users
Router.route("/uploadBlog").post(isAuthenticated,authorizedRole("admin","blogger"),addBlog)
Router.route("/deleteBlog/:id").post(isAuthenticated,authorizedRole("admin","blogger"),deleteBlog)

Router.route("/getBloggerBlogs/:email").get(isAuthenticated,authorizedRole("admin","blogger"),getBloggerBlogs)

Router.route("/getRocomandBlogs").get(getRocomandBlogs)
Router.route("/getstoriesBlogs").get(getstoriesBlogs)
Router.route("/getblog/:blogId").get(getBlogById)


// category router
Router.route("/getCategory").get(isAuthenticated,authorizedRole("admin","blogger"),getCategory)
Router.route("/addCategory").post(isAuthenticated,authorizedRole("admin","blogger" ),addCategory)
Router.route("/deleteCategory/:id").post(isAuthenticated,authorizedRole("admin","blogger"),deleteCategory)
 

module.exports =Router