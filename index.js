import express from "express";
import mongoose,{Schema,model} from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const app = express();

app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

const connectMongoDB = async ()=>{
 const conn = await mongoose.connect(MONGODB_URI)

 if(conn){
    console.log("Connected to MongoDB Successfully...")
 }
};

connectMongoDB();


//temperary storage
// const students=[];

//Created Schema 'studentSchema'
const studentSchema = new Schema({
    name:String,
    age:Number,
    mobile:String,
    email:String
});

//Model created using the schema 'Student'
const Student= model('Students',studentSchema);


app.get("/health", (req,res)=>{
    res.send("I'm healthy");
})

app.post("/students",async (req,res)=>{

    const {name,age,email,mobile} = req.body;

    const newStudent = new Student({
        name:name,
        age:age,
        mobile:mobile,
        email:email
    })

    const saveStudent = await newStudent.save();

    res.json({
        status:"success",
        students : saveStudent,
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

app.get("/students", async (req,res)=>{


    res.json({
        status:'success',
        data:students,
        message: 'All Students fetched successfully'
    })
})


// app.get('/home',(req,res)=>{
//     res.send("Home page here");
// })

const PORT = 5000;

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})