import express from "express";

const app = express();

const PORT = 5000;

app.get('/health',(req,res)=>{
    res.send({status:"OK"});
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})