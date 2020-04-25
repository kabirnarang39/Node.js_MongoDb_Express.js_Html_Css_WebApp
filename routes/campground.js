var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var User=require("../models/user");
var Comment=require("../models/comment");

var middleware=require("../middleware/index.js")
router.get("/",function(req,res){
	if(req.query.search){
	
		 const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		Campground.find({ name: regex },function(err,allcampgrounds){
		if(err ){
			console.log(err);
			
		}
		else{
			if(allcampgrounds.length<1){
			req.flash("No such campground exists")	
			}
			
			 res.render("campgrounds/index",{
        campgrounds:allcampgrounds,
        currentUser:req.user
    })
	}
	})
   }
else{
	Campground.find({},function(err,allcampgrounds){
		if(err){
			console.log(err);
		}
		else{
			 res.render("campgrounds/index",{
        campgrounds:allcampgrounds,
        currentUser:req.user
    })
	}
	})
	
}
})

router.post("/",middleware.isLoggedIn,function(req,res){
    var name=req.body.name;
    var image=req.body.image;
var price=req.body.price;
var author={
	id:req.user._id,
	username:req.user.username
}
var description=req.body.description;
    var newCampground={name:name,price:price ,image:image,description:description,author:author}

   Campground.create(newCampground,function(err,campground){
	if(err){
		
		console.log("SOMETHING WENT WRONG");
		console.log(err);
	}
	else{
		req.flash("success","Campground Added Successfully")
		console.log("NEW CAMPGROUND.........");
		console.log(campground);
		
		 res.redirect("/campgrounds");
	}
	})
   
    
})
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
})
router.get("/:id",function(req,res){
	var id=req.params.id;
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err || !foundCampground){
			req.flash("error","Campground Not Found")
			res.redirect("back")
			console.log("something went wrong");
			console.log(err);
		}
		else{
			console.log(foundCampground)
			res.render("campgrounds/show",{
				campground:foundCampground
			});
			
		}
	})
	
});
router.get("/:id/edit",middleware.ownerCheck,function(req,res){
	
		Campground.findById(req.params.id,function(err,foundCampground){
				res.render("campgrounds/edit",{
				campground:foundCampground
			
	
})
})
})
router.put("/:id",middleware.ownerCheck,function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updateCampground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
})
router.delete("/:id",middleware.ownerCheck,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds")
		}
		else{
			req.flash("success","Campground Deleted Successfully")
			res.redirect("/campgrounds")
		}
	})
})
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


          module.exports =router;