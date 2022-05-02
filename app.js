
const express = require('express');
const tools = require('./convert');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/infix", (req, res) => {
  res.json(tools.infix(req.body.data));
});

app.post("/prefix", (req, res) => {
  res.json(tools.prefix(req.body.data));
});

app.post("/postfix", (req, res) => {
  res.json(tools.postfix(req.body.data));
});
  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occured, server can't start", error);
    }
);