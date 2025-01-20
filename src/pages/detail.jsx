import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNote, deleteNote } from '../utils/api';
import NoteDetail from '../components/NoteDetail';

const NoteDetailPage = () => {
  const { noteId } = useParams();
  const note = getNote(noteId);

  const handleDelete = () => {
    deleteNote(noteId);
  };

  if (!note) {
    return <p>Catatan tidak ditemukan!</p>;
  }

  return (
    <div>
      <NoteDetail note={note} onDelete={handleDelete}/>
      <Link to="/">Kembali</Link>
    </div>
  );
};

export default NoteDetailPage;
