import { Schema,model } from "mongoose";

//Created Schema 'studentSchema'
const studentSchema = new Schema({
    name:String,
    age:Number,
    mobile:String,
    email:String
});

//Model created using the schema 'Student'
const Student= model('Students',studentSchema);

export default Student;