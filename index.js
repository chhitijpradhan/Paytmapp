const express = require ("express");
const app = express();

app.use (express.json());

app.get("/api/v1" , (req,res)=> {
    res.send("hii there")
})

app.listen(3000);