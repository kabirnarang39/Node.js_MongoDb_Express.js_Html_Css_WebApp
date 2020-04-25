var mongoose=require("mongoose");
var Campground=require("./models/campground.js");
var Comment=require("./models/comment.js");
var Data=[{
	name:"Opps First",
	image:"https://images.pexels.com/photos/236047/pexels-photo-236047.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
	description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
},
{
	name:"Opps Second",
	image:"https://everydaypower.com/wp-content/uploads/2017/03/76-Inspirational-picture-quotes-and-motivational-images.jpg",
	description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. "
},
{
	name:"Opps Third",
	image:"https://s.ftcdn.net/r/v2013/ab77cfbb277d2e2e97ad807b1e2dcdfc07bcb0cf/pics/all/categories2013/10432-245x180.jpg",
	description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. "
}]
function seedDB(){
	Campground.remove({},function(err,removed){
	/*if(err){
		console.log(err)
	}
	else{
		console.log("removed campgrounds");
		Data.forEach(function(camp){
			
			Campground.create(camp,function(err,data){
				if(err){
					console.log(err)
				}
				else{
					console.log("campground added");
				Comment.create({
					text:"My first comment will go like",
					author:"Kabir"
				},
				function(err,comment){
					if(err){
						console.log(err)
					}
					else{
						data.comments.push(comment);
						data.save();
						console.log("Created new comment")
					}
				})
				}
			})
		})
	}*/
})

}
module.exports=seedDB;