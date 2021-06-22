 const express = require('express');
 const app = express();
 app.use(express.json());
 app.use(express.urlencoded({extended: false}));

 
 const courses = [
     {id:1 , name:'Samuel' , nationality:'Egyptian' , section:'chemistry' , gpa:3},

     {id:2 , name:'farah' , nationality:'Palestinian' , section:'physics' , gpa:3},

     {id:3 , name:'layla' , nationality:'german' , section:'geography' , gpa:3},

     {id:4 , name:'john' , nationality:'irish' , section:'literature' , gpa:3},
 ];

 app.get('/' , (req , res) =>{
     res.send("hey full stack course");
 });

app.get('/api/courses' , ( req , res)=>{
    res.send (courses)
});

app.post ('/api/courses' , (req , res)=>{

if(!req.body.name || req.body.name.length<3){
    res.status(400).send('name is required and should be minimum 3 characters');
    return;
}

 const course = {
    id:courses.length + 1 , 
    name: req.body.name ,
    nationality:req.body.nationality,
    gpa:req.body.gpa
};

     courses.push(course);
     res.send(course);
});

app.put('/api/courses/:id', (req,res)=>{
    const course = courses.find(c => c.id===parseInt(req.params.id));
if (!course) res.status(404).send('there is no course found with that given id');
course.name = req.body.name;
res.send(course);

});

app.get('/api/courses/:id', (req , res) =>{
const course = courses.find(c => c.id===parseInt(req.params.id));
if (!course) res.status(404).send('there is no course found with that name');
res.send(course);
});

app.delete('/api/courses/:id' , (req , res) => {

    const course = courses.find(c => c.id===parseInt(req.params.id));
if (!course) res.status(404).send('there is no course found with that given id');
const index = courses.indexOf(course);
courses.splice(index , 1);
res.send(course);
});

 app.listen(4000);