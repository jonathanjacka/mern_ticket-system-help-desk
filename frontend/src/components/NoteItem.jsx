import React from 'react';
import { useSelector } from 'react-redux';

function NoteItem( {note} ) {

const { user } = useSelector(state => state.auth);

const noteStyles = {
    backgroundColor: note.isStaff ? 'rgba(0, 0, 0, 0.7)': '#fff',
    color: note.isStaff ? '#fff': '#000',
}

  return (
    <div className='note' style={noteStyles}>
      <h4>Note from {note.isStaff ? <span>Staff: {user.name}</span> : <span>User: {user.name}</span>}</h4>
      <p>{note.text}</p>
      <div className="note-date">
        {new Date(note.createdAt).toLocaleString('en-US')}
      </div>
    </div>
  )
}

export default NoteItem