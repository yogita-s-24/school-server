import express from "express";

const app = express();

app.use(express.json());

const student = [];

// defined a get req routes at '/student' to read all students from the array
app.get('/students',(req,res)=>{
    res.json({
        sucess:true,
        student:student,
        message:"students array sucessfully"

    })
})

app.get('/health',(req,res)=>{
    res.send({status:"OK hai"});
})

const PORT = 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})