import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getActiveNotes } from '../utils/api';
import { showFormattedDate } from '../utils/index';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await getActiveNotes();
      setNotes(data); 
      setLoading(false);
    };

    fetchNotes();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (notes.length === 0) {
    return <p>Tidak ada catatan</p>;
  }

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <h3>{note.title}</h3>
          <p>{showFormattedDate(note.createdAt)}</p>
          <p>{note.body}</p>
          <Link to={`/notes/${note.id}`}>Detail</Link>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
