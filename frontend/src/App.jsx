// import React, { useState, useEffect } from 'react';
// import { PlusCircle, Edit3, Trash2, Save, X } from 'lucide-react';
// import './App.css';

// const App = () => {
//   const [notes, setNotes] = useState([]);
//   const [newNote, setNewNote] = useState({ heading: '', note: '' });
//   const [editingId, setEditingId] = useState(null);
//   const [editText, setEditText] = useState('');
//   const [showAddForm, setShowAddForm] = useState(false);

//   const fetchNotes = async () => {
//     const response = await fetch('http://localhost:3000');
//     const data = await response.json();
//     setNotes(data);
//   };

//   const addNote = async () => {
//     if (!newNote.heading || !newNote.note) return;
    
//     await fetch(`http://localhost:3000/?heading=${newNote.heading}&notes=${newNote.note}`, {
//       method: 'POST',
//     });
    
//     setNewNote({ heading: '', note: '' });
//     setShowAddForm(false);
//     fetchNotes();
//   };

//   const deleteNote = async (heading) => {
//     await fetch(`http://localhost:3000/?h=${heading}`, {
//       method: 'DELETE',
//     });
//     fetchNotes();
//   };

//   const updateNote = async (heading) => {
//     await fetch(`http://localhost:3000/?h=${heading}&n=${editText}`, {
//       method: 'PUT',
//     });
//     setEditingId(null);
//     fetchNotes();
//   };

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   return (
//     <div className="app">
//       <div className="container">
//         <div className="header">
//           <h1>My Notes</h1>
//           <p>Organize your thoughts and ideas</p>
//         </div>

//         <div className="add-note-section">
//           <button 
//             className="add-btn"
//             onClick={() => setShowAddForm(!showAddForm)}
//           >
//             <PlusCircle size={20} />
//             Add New Note
//           </button>
//         </div>

//         {showAddForm && (
//           <div className="add-form">
//             <h3>Create New Note</h3>
//             <input
//               type="text"
//               placeholder="Note heading..."
//               value={newNote.heading}
//               onChange={(e) => setNewNote({ ...newNote, heading: e.target.value })}
//               className="form-input"
//             />
//             <textarea
//               placeholder="Write your note here..."
//               value={newNote.note}
//               onChange={(e) => setNewNote({ ...newNote, note: e.target.value })}
//               className="form-textarea"
//             />
//             <div className="form-buttons">
//               <button onClick={addNote} className="save-btn">
//                 <Save size={16} />
//                 Save Note
//               </button>
//               <button 
//                 onClick={() => {
//                   setShowAddForm(false);
//                   setNewNote({ heading: '', note: '' });
//                 }}
//                 className="cancel-btn"
//               >
//                 <X size={16} />
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}

//         <div className="notes-grid">
//           {notes.length === 0 ? (
//             <div className="empty-state">
//               <div className="empty-icon">📝</div>
//               <h3>No notes yet</h3>
//               <p>Click "Add New Note" to get started</p>
//             </div>
//           ) : (
//             notes.map((note, index) => (
//               <div key={index} className="note-card">
//                 <div className="note-header">
//                   <h3 className="note-title">{note.heading}</h3>
//                   <div className="note-actions">
//                     <button
//                       onClick={() => {
//                         setEditingId(note.heading);
//                         setEditText(note.note);
//                       }}
//                       className="action-btn edit-btn"
//                     >
//                       <Edit3 size={16} />
//                     </button>
//                     <button
//                       onClick={() => deleteNote(note.heading)}
//                       className="action-btn delete-btn"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 </div>
                
//                 {editingId === note.heading ? (
//                   <div className="edit-section">
//                     <textarea
//                       value={editText}
//                       onChange={(e) => setEditText(e.target.value)}
//                       className="edit-textarea"
//                     />
//                     <div className="edit-buttons">
//                       <button
//                         onClick={() => updateNote(note.heading)}
//                         className="save-btn-small"
//                       >
//                         <Save size={12} />
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setEditingId(null)}
//                         className="cancel-btn-small"
//                       >
//                         <X size={12} />
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <p className="note-content">{note.note}</p>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;


import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/notes") // hardcoded backend URL
      .then((res) => setNotes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addNote = () => {
    if (!newNote.trim()) return;

    axios
      .post("http://localhost:5000/notes", { text: newNote }) // hardcoded
      .then((res) => {
        setNotes([...notes, res.data]);
        setNewNote("");
      })
      .catch((err) => console.error(err));
  };

  const deleteNote = (id) => {
    axios
      .delete(`http://localhost:5000/notes/${id}`) // hardcoded
      .then(() => {
        setNotes(notes.filter((note) => note._id !== id));
      })
      .catch((err) => console.error(err));
  };

  const updateNote = (id, updatedText) => {
    axios
      .put(`http://localhost:5000/notes/${id}`, { text: updatedText }) // hardcoded
      .then((res) => {
        setNotes(
          notes.map((note) => (note._id === id ? res.data : note))
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Notes App</h1>
      <input
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Add a note..."
      />
      <button onClick={addNote}>Add</button>

      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <input
              value={note.text}
              onChange={(e) => updateNote(note._id, e.target.value)}
            />
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
