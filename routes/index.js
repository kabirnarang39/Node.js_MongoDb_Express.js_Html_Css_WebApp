var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user")
var Campground=require("../models/campground")
var async=require("async");
var nodemailer=require("nodemailer");
var crypto=require("crypto")

router.get("/",function(req,res){
    res.render("landing");
})



router.get("/register",function(req,res){
	res.render("register");
});
router.post("/register",function(req,res){
	User.register(new User({date :req.body.date,username:req.body.username,firstName:req.body.firstName,lastName:req.body.lastName, email:req.body.email,avatar:req.body.avatar}),req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message);
			res.render("register");
		}
		else{
			passport.authenticate("local")(req,res,function(){
					req.flash("success","Welcome to YelpCamp " + user.username);
				res.redirect("/campgrounds")
			})
		}
	})
})
router.get("/login",function(req,res){
	res.render("login");
})
router.post("/login",passport.authenticate("local",{
	
	successRedirect:"/campgrounds",
		
	failureRedirect:"/login", failureFlash:  true

	
}),function(req,res){
	
})
router.get("/logout",function(req,res){
req.logout();
req.flash("success","Logged You Out")
res.redirect("/campgrounds");
});
router.get("/users/:id",function(req,res){
	var id=req.params.id;
	User.findById(req.params.id,function(err,user){
		if(err){
			req.flash("error","Something Went Wrong");
			return res.redirect("/")
		}
		Campground.find().where('author.id').equals(user._id).exec(function(err,campgrounds){
			if(err){
				req.flash("error","Something Went Wrong");
			res.redirect("/")
			}
		
					res.render("user/show",{user:user,campgrounds:campgrounds});
		})
	});
});
router.get('/forgot', function(req, res) {
  res.render('forgot');
});
router.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
		function(token,user,done){
			var smtpTransport=nodemailer.createTransport({
				service:"Gmail",
				auth:{
					user:"kabirnarang39@gmail.com",
					pass:"9416285188"
				}
			});
			var mailOptions={
				to:user.email,
				from:"kabirnarang39@gmail.com",
				subject:"Node.js reset password",
				text:"HI"+"\n\n" +
				"You are recieving this because there is a request from your id to change your password"+"\n\n"
				+"Please use the following link to reset your password "+"\n\n"+
				
				" http://"+req.headers.host+"/reset/"+token+"\n\n"+
				"This link will be expired within 5 minutes  " +
				"If you did not request this please igmore this message and your password will remail unchanged"
			};
			smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent');
        req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
});

router.get("/reset/:token",function(req,res){
	User.findOne({resetPasswordToken:req.params.token, resetPasswordExpires:{$gt: Date.now() } },function(err,user){
		if(!user){
					req.flash("error","Password reset token has expired or is invalid");
					return res.redirect("/forgot")
				}
				
					res.render("reset",{ token:req.params.token})
				
				
	
	})
})

router.post("/reset/:token",function(req,res){
	async.waterfall([
		function(done){
		User.findOne({resetPasswordToken:req.params.token, resetPasswordExpires:{ $gt : Date.now()}},function(err,user){
		if(!user){
					req.flash("error","Password reset token has expired or is invalid");
					return res.redirect("back")
				}
				if(req.body.password===req.body.confirm){
					user.setPassword(req.body.password,function(err){
					user.resetPasswordToken=undefined;
					user.resetPasswordExpires=undefined;
				user.save(function(err){
					req.logIn(user,function(err){
						done(err,user);
					})
				})
				})
				}else{
					
					req.flash("error","Password and confirm password  does not match");
					return res.redirect("back")
					
				}
				});
		
		},
		function(user,done){
			var smtpTransport=nodemailer.createTransport({
				service:"Gmail",
				auth:{
					user:"kabirnarang39@gmail.com",
					pass:"9416285188"
				}
			});
			var mailOptions={
				to:user.email,
				from:"kabirnarang39@gmail.com",
				subject:"Your password has been changed ",
				text:"HI"+"\n\n" +
				"This is just a confirmation that your password to id associated to email: "+"\n\n"
				+user.email+" \n\n"+" has been changed successfully"
				
				
			};
			smtpTransport.sendMail(mailOptions,function(err){
				console.log("mail sent");
				req.flash("success","Your password has been changed")
				done(err);
			});
			}
			],function(err){
				
				res.redirect("/campgrounds");
			});
	
		})
		
		
		

module.exports=router;
