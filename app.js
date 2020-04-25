var express = require("express"); 
var mongoose = require("mongoose"); 

var bodyparser = require("body-parser"); 
var app = express();  

app.set("view engine","ejs");
mongoose.connect('mongodb+srv://Prithivi:0rMB6ktGqpfetjZs@cluster0-tvq8b.mongodb.net/test?retryWrites=true&w=majority/BlogDB',
  
   {

    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true

   } 
) 

.then(()=> console.log("Mongodb connected"));

var blogSchema = new mongoose.Schema(
  {
     title:String,
     image:String,
     body:String,
     Created:{type:Date,default:Date.now}
 });

 var blog  = mongoose.model("blog",blogSchema);

// blog.create({
//   title:"hello blog", 
//   image:"https://images.unsplash.com/photo-1507120410856-1f35574c3b45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
//    body:"nohting about it "

// }); 
// mongoose
// .connect( uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
// .then(() => console.log( 'Database Connected' ))
// .catch(err => console.log( err ));


//routing 
//-----------------------Blog---------- 

app.get("/",function(req,res){ 
  blog.find({},function(err,blogs){
    if(err)
    {
      console.log(err);
    } 
    else{
      res.render("home",{blogs:blogs});
    }
  })
  // res.render("home"); 
});  
app.get("/blogs",function(req,res){
  res.redirect("/");
});
app.get("/blogs/:id",function(req,res){ 
  blog.findById(req.params.id,function(err,foundblog){ 
    if(err)
    {
      res.redirect("/blogs");
    }
 else{
    res.render("show",{blog:foundblog}); 
 }
  });
  // res.render("show",{blogs:blogs});
});



app.listen(3000,function(req,res){ 
  console.log("server start at 3000");
})