import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/api';

const NewNotePage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    addNote({
      title,
      body,
    });
    navigate('/');
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <input 
        type="text" 
        placeholder="Judul catatan" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea 
        placeholder="Isi catatan" 
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="submit">Tambah Catatan</button>
    </form>
  );
};

export default NewNotePage;
