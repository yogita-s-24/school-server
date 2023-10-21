import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Student from "./src/models/student.js";

const app = express();

app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

const connectMongoDB = async () => {
    const conn = await mongoose.connect(MONGODB_URI);

    if (conn) {
        console.log("Connected to MongoDB Successfully...");
    }
};

connectMongoDB();
//temperary storage
// const students=[];

//for sample checking
app.get("/health", (req, res) => {
    res.send("I'm healthy");
});

//post API for pas student data
app.post("/students", async (req, res) => {
    const { name, age, email, mobile } = req.body;

    const newStudent = new Student({
        name: name,
        age: age,
        mobile: mobile,
        email: email,
    });
    const saveStudent = await newStudent.save();
    res.json({
        status: "success",
        students: saveStudent,
        message: "Student added successfully",
    });
});

//get API for find student using email
app.get("/student", async (req, res) => {
    const { email } = req.query;
    const student = await Student.findOne({ email: email });
    res.json({
        status: "success",
        data: student,
        message: "Student fatch successfully",
    });
});

//get API for find all student at a time
app.get("/students", async (req, res) => {
    // console.log('students',students);
    const students = await Student.find();

    res.json({
        status: "success",
        data: students,
        message: "All Students fetched successfully",
    });
});

//delete api for delete student from db
app.delete("/student/:_id", async (req, res) => {
    const { _id } = req.params;

    await Student.deleteOne({ _id: _id });

    res.json({
        success: true,
        message: `Student deleted Successfully ${_id}`,
    });
});

//update api for update student data from db using `put` method
//put is used to update a resources (all data)
app.put("/student/:_id", async (req, res) => {
    const {_id} = req.params;
    const { name, age, email, mobile } = req.body;

    await Student.updateOne(
       { _id:_id }, { $set: { name: name, age: age, email: email, mobile: mobile } }
    );

    const findStudent = await Student.findOne({_id:_id});


    res.json({
        success: true,
        data : findStudent,
        message: `Student updated Successfully with id :${_id}`
    });
});


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
