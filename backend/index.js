const express = require("express");
const app = express();
const { NotesModel, connectDB } = require("./db");

connectDB();

const cors = require("cors");
app.use(cors());
app.post("/", async function(req,res){
    const notes  = req.query.notes;
    const heading = req.query.heading;
    await NotesModel.create({
        note : notes,
        heading: heading
    })
    res.send("added")
})
app.delete("/",async function(req,res){
    const toDelete  = req.query.h;
    const t = await NotesModel.findOne({
        heading: toDelete
    })
    if(t){
        const d = await NotesModel.deleteOne({
            heading : toDelete
        })
    }
    res.send("deleted");
})
app.put("/", async function(req,res){
    const toEdit= req.query.h;
    const edited = req.query.n;
    const t = await NotesModel.findOne({
        heading: toEdit
    })
    if(t){
        const e = await NotesModel.updateOne({
            heading : toEdit,
            note : edited 
        })
    }
    res.send("edited");
})


app.get("/",async function(req,res){
    const notes = await NotesModel.find(); // fetch all notes
    res.json(notes);
})
app.listen(3000);