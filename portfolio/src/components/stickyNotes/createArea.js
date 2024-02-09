import React, { useState, useEffect } from 'react';
import './createArea.css';

import noteBook from './img/note.png';

function Note(props) {
   const [isMinimized, setIsMinimized] = useState(false);

   function handleClick() {
      props.onDelete(props.id);
   }

   function toggleMinimize() {
      setIsMinimized(!isMinimized);
   }

   if (isMinimized) {
      return (
         <div className="noteMinimized" onClick={toggleMinimize} style={{ position: 'absolute', top: props.y, left: props.x }}>
            <img src={noteBook} alt="NoteBook Icon" style={{ width: '100px', cursor: 'pointer' }}/>
         </div>
      );
   }

   return (
      <div className="note" style={{ position: 'absolute', top: props.y, left: props.x }}>
         <button onClick={handleClick}><i className="fas fa-times"></i></button>
         <button onClick={toggleMinimize}><i className="fas fa-window-minimize"></i></button>
         <h1>{props.title}</h1>
         <p>{props.content}</p>
      </div>
   );
}

const CreateArea = ({ onAdd }) => {
   const [showForm, setShowForm] = useState(false);
   const [notes, setNotes] = useState([]);
   const [note, setNote] = useState({
      title: "",
      content: "",
      x: 0, // New state for X position
      y: 0  // New state for Y position
   });

   useEffect(() => {
      // Change the cursor on form submission
      if (showForm) {
         const messageElement = document.createElement("div");
         messageElement.innerText = "Click to Add Note Anywhere on Screen After Submit";
         messageElement.style.position = "fixed";
         messageElement.style.bottom = "20px";
         messageElement.style.right = "20px";
         messageElement.style.backgroundColor = "#ab9184";
         messageElement.style.color = "white";
         messageElement.style.padding = "10px";
         messageElement.style.borderRadius = "5px";
         messageElement.style.zIndex = "1000";
         document.body.appendChild(messageElement);

         const plusIconSVG = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='%23ab9184' viewBox='0 0 24 24'><path d='M19 11h-6V5h-2v6H5v2h6v6h2v-6h6v-2z'/></svg>") 16 16, auto`;
         document.body.style.cursor = plusIconSVG;

         // Cleanup function to remove the message and reset cursor
         return () => {
            document.body.removeChild(messageElement);
            document.body.style.cursor = 'default';
         };
      }
   }, [showForm]);

   const handleClick = () => {
      const username = prompt("Please Admin username:");
      const password = prompt("Please Admin password:");
      if (username === "admin" && password === "makeanote") {
         setShowForm(true);
      } else {
         alert("Access denied. Incorrect username or password.");
      }
   };

   const handleChange = (event) => {
      const { name, value } = event.target;
      setNote(prevNote => {
         return {
            ...prevNote,
            [name]: value
         };
      });
   };

   const submitNote = (event) => {
      if (note.title || note.content) {
         setNotes(prevNotes => [...prevNotes, { ...note, id: Date.now() }]);
         setNote({
            title: "",
            content: "",
            x: 0,
            y: 0
         });
         setShowForm(false);
         // Listen for the next click to place the note
         document.addEventListener('click', placeNote, {once: true});
      }
      event.preventDefault();
   };

   const placeNote = (e) => {
      setNotes(prevNotes => {
         const lastNote = prevNotes[prevNotes.length - 1];
         return [
            ...prevNotes.slice(0, -1),
            {
               ...lastNote,
               x: e.clientX,
               y: e.clientY
            }
         ];
      });
   };

   const deleteNote = (id) => {
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
   };

   return (
      <div>
         <div className="icon-container" onClick={handleClick}>
            <div className="notebook-icon">
               <img src={noteBook} alt="NoteBook Icon"/>
            </div>
         </div>
         {showForm && (
            <form onSubmit={submitNote}>
               <input
                  name="title"
                  onChange={handleChange}
                  value={note.title}
                  placeholder="Title"
               />
               <textarea
                  name="content"
                  onChange={handleChange}
                  value={note.content}
                  placeholder="Take a note..."
                  rows="3"
               />
               <button type="submit">Add</button>
            </form>
         )}
         {notes.map((note) => (
            <Note
               key={note.id}
               id={note.id}
               title={note.title}
               content={note.content}
               x={note.x}
               y={note.y}
               onDelete={deleteNote}
            />
         ))}
      </div>
   );
};

export default CreateArea;
