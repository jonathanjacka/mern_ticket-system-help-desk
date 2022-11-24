import axios from 'axios';

const API_URL = '/api/tickets/';

const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(API_URL + ticketId + '/notes', config);
  return res.data;
};

const createNote = async (noteText, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(
    API_URL + ticketId + '/notes',
    { text: noteText },
    config
  );
  return res.data;
};

const notesService = {
  getNotes,
  createNote,
};

export default notesService;
