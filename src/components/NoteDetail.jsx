import React from 'react';
import PropTypes from 'prop-types';

const NoteDetail = ({ note, onDelete }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{note.title}</h2>
      <p className="text-gray-500 text-sm mb-4">{new Date(note.createdAt).toLocaleString()}</p>
      <p className="text-gray-700 mb-6">{note.body}</p>
      <button
        onClick={onDelete}
        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
      >
        Hapus Catatan
      </button>
    </div>
  );
};

NoteDetail.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteDetail;
