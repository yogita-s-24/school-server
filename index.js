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

    students.push(newStudents);

    res.json({
        status:"success",
        students : students,
        message: 'Student added successfully'
    });
})



app.get('/home',(req,res)=>{
    res.send("Home page here");
})

const PORT = 5000;

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})


