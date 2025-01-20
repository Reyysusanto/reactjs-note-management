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
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (notes.length === 0) {
    return <p className="text-center text-gray-500">Tidak ada catatan</p>;
  }

  return (
    <ul className="space-y-4">
      {notes.map((note) => (
        <li key={note.id} className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800">{note.title}</h3>
          <p className="text-gray-500 text-sm">{showFormattedDate(note.createdAt)}</p>
          <p className="text-gray-700 mt-2">{note.body}</p>
          <Link to={`/notes/${note.id}`} className="text-blue-500 hover:underline mt-4 inline-block">
            Detail
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
