import express from "express"; 

const app = express();

app.get("/ping", (req, res)=>{
    res.send("pong");
})
app.listen(5000, (err)=>{
    if (err) {
        console.error(`Error in starting the server`);
        return process.exit(1);
    }

    console.log(`Express server is running on 5000 port!`);
    
});