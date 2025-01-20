import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getNote, deleteNote } from '../utils/api';
import NoteDetail from '../components/NoteDetail';

const NoteDetailPage = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      const { error, data } = await getNote(noteId);
      if (!error) {
        setNote(data);
      } else {
        setNote(null);
      }
    };

    fetchNote();
  }, [noteId]);

  const handleDelete = async () => {
    const { error } = await deleteNote(noteId);
    if (!error) {
      navigate('/');
    }
  };

  if (!note) {
    return <p>Catatan tidak ditemukan!</p>;
  }

  return (
    <div>
      <NoteDetail note={note} onDelete={handleDelete} />
      <Link to="/">Kembali</Link>
    </div>
  );
};

export default NoteDetailPage;
