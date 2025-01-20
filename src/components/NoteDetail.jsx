import React from 'react';
import PropTypes from 'prop-types';

const NoteDetail = ({ note, onDelete }) => {
  return (
    <div>
      <h2>{note.title}</h2>
      <p>{new Date(note.createdAt).toLocaleString()}</p>
      <p>{note.body}</p>
      <button onClick={onDelete}>Hapus Catatan</button>
    </div>
  );
};

NoteDetail.propTypes = {
  note: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteDetail;
