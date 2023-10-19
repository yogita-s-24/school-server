import express from "express";

const app = express();

app.use(express.json());

const students=[];

app.post("/students",(req,res)=>{

    const id = Math.floor(Math.random() * 1000) + 1;

    const {name, age, email, mobile} = req.body;

    const newStudents = {
        id,
        name,
        age,
        email,
        mobile
    }

    //checking required fields
    if(!name){
        res.json({
            status : "unsuccess",
            message: "Name is required"
        })
    }
    if(!age){
        res.json({
            status : "unsuccess",
            message: "Age is required"
            })

    }

    if(!email){
        res.json({
            status : "unsuccess",
            message: "Email is required"
            })
    }

    if(!mobile){
        res.json({
            status : "unsuccess",
            message: "Mobile number is required"
            })
    }

    students.push(newStudents);

    res.json({
        status:"success",
        students : students,
        message: 'Student added successfully'
    });
})

app.get("/student",(req,res)=>{

    const {id} = req.query;

let student= null;

students.forEach((stud)=>{
    if (stud.id == id)
    student = stud;
})

res.json({
    status : "success",
    data : student,
    message:"Student fatch successfully"
})

})

app.get("/students",(req,res)=>{
    res.json({
        status:'success',
        data:students,
        message: 'All Students fetched successfully'
    })
})


app.get('/home',(req,res)=>{
    res.send("Home page here");
})

const PORT = 5000;

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})


