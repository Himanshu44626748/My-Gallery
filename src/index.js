const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config({path: "../.env"});
const image = require('../models/image');

const public = path.join(__dirname, "../public");
app.use(express.static(public));

//Setup the hbs view engine
const views = path.join(__dirname, "../views");
app.set("views", views);
app.set("view engine", "hbs");


//body-parser middleware to parse the incoming data under the req.body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Databse connections
mongoose.connect(`mongodb+srv://himanshu446267:${process.env.PASSWORD}@cluster0.76uy4.mongodb.net/Gallery?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Connected to database");
}).catch((error) => {
    console.log(error);
});


//Base url
app.get("/", async(req, res) => {
    try{

        let images = await image.find();

        res.render("index",{
            images: images
        });
    }
    catch(e)
    {
        res.send(e);
    }
});


//Rendered the to add new image
app.get("/new", (req, res) => {
    res.render("addNewImage");
});


//Add the new image to the database when above form will be submitted
app.post("/new", async(req, res) => {
    try{
        let name = req.body.imageName;
        let url = req.body.imageUrl;
        let detail = req.body.imageDetail;

        let images = await image.findOne().sort({_id: -1});

        let id;
        if(images == null)
        {
            id = 100;
        }
        else{
            id = 1+images._id;
        }

        const newImage = new image({
            _id: id,
            imageName: name,
            imageUrl: url,
            imageDetail: detail
        })

        const result = await newImage.save();

        res.redirect("/");
    }
    catch(e)
    {
        res.send("Error occured while adding image");
    }
})


//Rendered the details of the image which is clicked
app.get("/show/:id", async(req, res) =>{
    try{
        let id = req.params.id;
        let images = await image.findOne({_id: id});
        
        res.render("detailOfImage", {
            image: images
        })
    }
    catch(e)
    {
        res.send("Error occured while showing detail");
    }
})


//Rendered the form to edit the image
app.get("/:id/edit", async(req, res) => {
    try{
        let id = req.params.id;
        let images = await image.findOne({_id: id});

        res.render("editDetail", {
            image: images
        });
    }
    catch(e)
    {
        res.send("Error occured while editing detail");
    }
})


//Saved the changed details of the image when the above form will submited
app.put("/:id/edit", async(req, res) => {
    try{
        let id = req.params.id;
        let name = req.body.imageName;
        let url = req.body.imageUrl;
        let detail = req.body.imageDetail;

        let result = await image.findOneAndUpdate({_id: id}, {imageName: name, imageUrl: url, imageDetail: detail}, { new: true });
    }
    catch(e)
    {
        res.send("Error occured while editing detail");
    }
})


//Delete the image on clicking the delete button
app.delete("/delete/:id", async(req, res) =>{
    try{
        let id = req.params.id;
        let images = await image.findOneAndDelete({_id: id});
    }
    catch(e)
    {
        res.send("Error occured while deleting image");
    }
})


// Rendered the image which is searched
app.post("/find", async(req, res) => {
    try{
        let name = req.body.imageName;

        let images = await image.find({imageName: name});

        res.render("index",{
            images: images
        });
    }
    catch(e)
    {
        res.send("Error while finding image")
    }
})


app.listen(port, () =>{
    console.log("Server is running on port number 8000");
})