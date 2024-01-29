const express = require("express");
const cors = require("cors");
require("./db/config");
const Product = require("./db/Memory");
const User = require("./db/user");
const multer = require('multer')
const app = express();
const fs = require("fs")

const Jwt = require("jsonwebtoken");
const jwtKey = "qwertyuqwertyu";

app.use(express.json());
app.use(cors());
//register//signup
app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  resp.send(result)
 
  
});
//login

app.post("/login", async (req, resp) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if(user){
      resp.send(user)
    }
  else {
      resp.send({ result: "no user found" });
    }
  } else {
    resp.send({ result: "no user found" });
  }
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload=multer({storage:storage})
//post api
app.post("/memo",upload.single("img"), async (req, resp) => {
  // console.log(req)
    let product =  Product({
      title:req.body.title,
      message:req.body.message,
      creator:req.body.creator,
      tags:req.body.tags,
      
      img: {
        data: fs.readFileSync("uploads/" + req.file.filename),
        contentType: "image/png",
      },
    });
    let result = await product.save();
    resp.send(result);
  });
  
//get api
  app.get("/list", async (req, resp) => {
    let products = await Product.find();
    if (products.length > 0) {
      resp.send(products)
    } else {
      resp.send({ result: "No product found" });
    }
  });
//delete
  app.delete("/delete/:id", async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
  });
  
  //update api
  app.get("/update/:id", async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
      resp.send(result);
    } else {
      resp.send({ result: "No record found" });
    }
  });
  

  app.put("/update/:id", upload.single("img"),async (req, resp) => {
    let result = await Product.updateOne(
      { _id: req.params.id },
      {
        $set:{
        title:req.body.title,
        message:req.body.message,
        creator:req.body.creator,
        tags:req.body.tags,
        img: {
          data: fs.readFileSync("uploads/" + req.file.filename),
          contentType: "image/png",
        }
      }}
    );
    resp.send(result);
  });
 //search
 app.get("/search/:key",  async (req, resp) => {
  let result = await Product.find({
    $or: [
      {  title: { $regex: req.params.key } },
      { message: { $regex: req.params.key } },

      { creator: { $regex: req.params.key } },
      { tags: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});

app.listen(7000);