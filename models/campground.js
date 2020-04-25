var mongoose = require("mongoose");
var Comment=require("./comment");

var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   price:String,
   description: String,
   createdAt:{type:Date,default:Date.now},
   author:{
	id:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	username:String
},
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ],chat: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Chat"
      }
   ]
});
 module.exports = mongoose.model("Campground", campgroundSchema);