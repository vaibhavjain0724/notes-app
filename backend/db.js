const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Notes = new Schema({
    heading : String,
    note: String,
    
})

const NotesModel = mongoose.model('notes', Notes);

// async function connectDB() {
//     try {
//         await mongoose.connect("mongodb+srv://admin:Llyu9sVM4MkupHOy@cluster0.vj9fwxg.mongodb.net/notes");
//         console.log("Connected to MongoDB Atlas");
//     } catch (error) {
//         console.error("MongoDB connection error:", error.message);
//     }
// }


async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://vaibhavjain0724_db_user:ykXNoTNrsvXEVVLB@cluster0.vyidpbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
}


module.exports= {
    NotesModel : NotesModel,
    connectDB
}