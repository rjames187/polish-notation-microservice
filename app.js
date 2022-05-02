
const express = require('express');
const tools = require('./convert');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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