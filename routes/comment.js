var express=require("express");
var router=express.Router({mergeParams:true});
var Campground=require("../models/campground")
var Comment=require("../models/comment");
var middleware=require("../middleware/index.js")
//==========================================
//Comments
router.get("/new",middleware.isLoggedIn,function(req,res){
	var id=req.params.id;
	Campground.findById(id,function(err,campground){
		if(err){
			console.log(err)
		}
		else{
			res.render("comments/new",{
			campground: campground
		});
		}
		
	})
	
	});
	
router.post("/",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err)
			res.redirect("/campgrounds")
		}
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err)
					req.flash("error","Something Went Wrong")
					res.redirect("/campgrounds")
				}
				else{
					comment.author.id=req.user._id;
					comment.author.username=req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success","Successfully Added Comment")
					res.redirect("/campgrounds/"+campground._id);
				}
			})
		}
	})
})
router.get("/:comment_id/edit",middleware.commentOwnerCheck,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err || !foundCampground){
			req.flash("error","No Campground Found");
			return res.redirect("back")
		}
		Comment.findById(req.params.comment_id,function(err,findComment){
		if(err){
			console.log(err)
			res.redirect("back")
		}
		else{
			res.render("comments/edit",{
				
				campground_id: req.params.id,
			comment:findComment
			
			
		
	})
	}
	})
	})
	
			
		

	})
	router.put("/:comment_id",middleware.commentOwnerCheck,function(req,res){
		Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
			if(err){
				res.redirect("back")
			}
			else{
				res.redirect("/campgrounds/" + req.params.id)
			}
		})
	})
	router.delete("/:comment_id",middleware.commentOwnerCheck,function(req,res){
		Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
					res.redirect("back")
			}
			else{
					req.flash("success","Comment Removed");
				res.redirect("/campgrounds/"+ req.params.id)
			}
		})
	})



module.exports=router;
