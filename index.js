import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

// show all task 
const msg = "Copyright";
app.get("/",(req,res)=>{

  res.render("index.ejs",{blogTitleArr,blogTextArr,msg});

});

app.get("/index",(req,res)=>{

  res.render("index.ejs",{blogTitleArr,blogTextArr,msg});
});  
app.get("/about",(req,res)=>{
  res.render("about.ejs",{msg});
});
app.get("/contact",(req,res)=>{
  const msg = "This page is not working.If your really want to contact go to my Github/Linkedin . ";
  res.render("contact.ejs",{msg})
});

// Two array
const blogTitleArr = [];
const blogTextArr = [];

app.post("/add",(req,res)=>{
  const {blogTitle,blogText} = req.body;
  if(blogTitle.trim() !== "" && blogText.trim() !== ""){
    blogTitleArr.push(blogTitle.trim());
    blogTextArr.push(blogText.trim());
  }
  res.redirect("/");
});

// delete task
app.post("/delete/:index",(req,res)=>{
  const index = req.params.index;
  blogTitleArr.splice(index,1);
  blogTextArr.splice(index,1);
  res.redirect("/");

});

// update task
app.post("/update/:index",(req,res)=>{
  const index = req.params.index;
  const {updatedTitle , updatedText } = req.body;

  if(updatedTitle.trim() !== "" && updatedText.trim() !== ""){
    blogTitleArr[index] = updatedTitle.trim();
    blogTextArr[index] = updatedText.trim();
  }
  res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


