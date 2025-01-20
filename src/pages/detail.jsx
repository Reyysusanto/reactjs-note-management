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
    return <p className="text-center text-red-500 font-semibold">Catatan tidak ditemukan!</p>;
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <NoteDetail note={note} onDelete={handleDelete} />
      <div className="mt-4 text-center">
        <Link to="/" className="text-blue-500 hover:underline">Kembali</Link>
      </div>
    </div>
  );
};

export default NoteDetailPage;
