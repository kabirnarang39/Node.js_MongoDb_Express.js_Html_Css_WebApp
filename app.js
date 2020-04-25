var express=require("express");
var app=express();
var mongoose=require("mongoose");
var flash=require("connect-flash")

var passport=require("passport"),
LocalStrategy=require("passport-local");
app.use(express.static(__dirname+"/public"))
var Campground=require("./models/campground")
var Comment=require("./models/comment");
var User=require("./models/user")

var methodOverride=require("method-override");
app.use(methodOverride("_method"))
app.use(flash());
var indexRoute=require("./routes/index");
var campgroundRoute=require("./routes/campground")
var commentRoute=require("./routes/comment")


app.locals.moment = require('moment');
var seedDb=require("./seeds")
//seedDb();
mongoose.connect("mongodb://localhost:27017/yelp_camp_v30", {useNewUrlParser:true});

app.set("view engine","ejs");
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
	secret:"Rusty is the best dog",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});
/* Campground.create({
	name:"Epping Forest", 
	image:"http://www.visiteppingforest.org/imageresizer/?image=%2Fdbimgs%2Fcamping_inner001.jpg&action=PageHeader",
	description:"Epping Forest is the bestest prevailing forest with large variety of species left"
},function(err,campground){
	if(err){
		console.log("SOMETHING WENT WRONG");
		console.log(err);
	}
	else{
		console.log("NEW CAMPGROUND.........");
		console.log(campground);
	}
})*/
/*var campgrounds=[
{
	name:"Epping Forest", image:"http://www.visiteppingforest.org/imageresizer/?image=%2Fdbimgs%2Fcamping_inner001.jpg&action=PageHeader"},
{
 name:"Dismals Canyon" , image:"https://www.rei.com/content/dam/images/Expert%20Advice/Migration/HeroImages/YFA_051616_42218_Campsite_Comfort_Organization_lg.jpg"  
},
{
    name:"Curbed LA" , image:"https://cdn.vox-cdn.com/thumbor/-JoPdcgAuLTUsWiDZ62CX4wb33k=/0x0:5225x3479/1200x800/filters:focal(2195x1322:3031x2158)/cdn.vox-cdn.com/uploads/chorus_image/image/54137643/camping_tents.0.jpg"
},
{
    name:"Curbed LA" , image:"https://cdn.vox-cdn.com/thumbor/-JoPdcgAuLTUsWiDZ62CX4wb33k=/0x0:5225x3479/1200x800/filters:focal(2195x1322:3031x2158)/cdn.vox-cdn.com/uploads/chorus_image/image/54137643/camping_tents.0.jpg"
},
{
    name:"Curbed LA" , image:"https://cdn.vox-cdn.com/thumbor/-JoPdcgAuLTUsWiDZ62CX4wb33k=/0x0:5225x3479/1200x800/filters:focal(2195x1322:3031x2158)/cdn.vox-cdn.com/uploads/chorus_image/image/54137643/camping_tents.0.jpg"
},
{
    name:"Curbed LA" , image:"https://cdn.vox-cdn.com/thumbor/-JoPdcgAuLTUsWiDZ62CX4wb33k=/0x0:5225x3479/1200x800/filters:focal(2195x1322:3031x2158)/cdn.vox-cdn.com/uploads/chorus_image/image/54137643/camping_tents.0.jpg"
},
{
    name:"Curbed LA" , image:"https://cdn.vox-cdn.com/thumbor/-JoPdcgAuLTUsWiDZ62CX4wb33k=/0x0:5225x3479/1200x800/filters:focal(2195x1322:3031x2158)/cdn.vox-cdn.com/uploads/chorus_image/image/54137643/camping_tents.0.jpg"
},
{
    name:"Curbed LA" , image:"https://cdn.vox-cdn.com/thumbor/-JoPdcgAuLTUsWiDZ62CX4wb33k=/0x0:5225x3479/1200x800/filters:focal(2195x1322:3031x2158)/cdn.vox-cdn.com/uploads/chorus_image/image/54137643/camping_tents.0.jpg"
},
{
    name:"Curbed LA" , image:"https://cdn.vox-cdn.com/thumbor/-JoPdcgAuLTUsWiDZ62CX4wb33k=/0x0:5225x3479/1200x800/filters:focal(2195x1322:3031x2158)/cdn.vox-cdn.com/uploads/chorus_image/image/54137643/camping_tents.0.jpg"
},
{
    name:"Curbed LA" , image:"https://cdn.vox-cdn.com/thumbor/-JoPdcgAuLTUsWiDZ62CX4wb33k=/0x0:5225x3479/1200x800/filters:focal(2195x1322:3031x2158)/cdn.vox-cdn.com/uploads/chorus_image/image/54137643/camping_tents.0.jpg"
},
{
    name:"Curbed LA" , image:"https://cdn.vox-cdn.com/thumbor/-JoPdcgAuLTUsWiDZ62CX4wb33k=/0x0:5225x3479/1200x800/filters:focal(2195x1322:3031x2158)/cdn.vox-cdn.com/uploads/chorus_image/image/54137643/camping_tents.0.jpg"
}
];*/
app.use("/",indexRoute);
app.use("/campgrounds",campgroundRoute);
app.use("/campgrounds/:id/comments",commentRoute);



app.listen(3200,function(){
    console.log("YELPCAMP SERVER STARTED");
});
