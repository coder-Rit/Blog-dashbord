const catchAsyncErorr = require("../middleware/catchAsyncErorr");
const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, req.params.attName + ".jpg");
  },
});

const maxSize = 1 * 1000 * 1000;

const uploadRemand = (filename) => {
  return multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
      // Set the filetypes, it is optional
      var filetypes = /jpeg|jpg|png/;
      var mimetype = filetypes.test(file.mimetype);

      var extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );

      if (mimetype && extname) {
        return cb(null, true);
      }

      cb(
        "Error: File upload only supports the " +
          "following filetypes - " +
          filetypes
      );
    },

    // mypic is the name of file attribute
  }).single(filename);
};

exports.uploadImage = catchAsyncErorr(async (req, res, next) => {
  const upload = uploadRemand(req.params.attName);
  upload(req, res, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send("Success, Image uploaded!");
    }
  });
});
