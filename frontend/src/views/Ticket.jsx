import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { getTicket, closeTicket } from '../features/tickets/ticketSlice';
import { getNotes, createNote } from '../features/notes/notesSlice';

import NoteItem from '../components/NoteItem';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

import { toast } from 'react-toastify';
import Modal from 'react-modal';
import  { FaPlus } from 'react-icons/fa';

const modalStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative'
  }
}

Modal.setAppElement('#root');

function Ticket() {

  const [ modalIsOpen, setModalIsOpen ] = useState(false);
  const [ noteText, setNoteText ] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { ticket, isError: ticketError } = useSelector(state => state.ticket);
  const { notes, isError: notesError } = useSelector(state => state.note);
  const { ticketId } = useParams();
  
  useEffect( () => {

    if(ticketError) {
      toast.error('Unable to retrieve ticket: ' + ticketId);
    }

    if(notesError) {
      toast.error('Unable to retrieve notes to ticket: ' + ticketId);
    }

    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
    
  }, [dispatch, ticketId, notesError, ticketError]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
    .unwrap()
    .then(() => {
      toast.success('Ticket successfully closed!');
      navigate('/tickets');
    })
    .catch(error => toast.error('Error - ticket could not be closed'))

  }

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const onNoteSubmit = (event) => {
    event.preventDefault();
    dispatch(createNote({noteText, ticketId}))
    .unwrap()
    .then(() => {
      toast.success('Note created successfully');
      setNoteText('');
      closeModal();
    })
    .catch(error => toast.error('Error: unable to create new note'));

  }

  if(!ticket) {
    return <Spinner />
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets'/>
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>{ticket.status}</span>
        </h2>
        <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue:</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes:</h2>
      </header>

      {ticket.status !== 'closed' && (
        <button className='btn' onClick={openModal}><FaPlus />Add Note</button>
      )}

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles} contentLabel='Add Note'>
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>X</button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea name="noteText" id="noteText" className='form-control' placeholder='Note text' value={noteText} onChange={(event) => setNoteText(event.target.value)} style={{resize: 'none'}}></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type='submit'>Add Note</button>
          </div>
        </form>
      </Modal>

      {notes.map(note => <NoteItem key={note._id} note={note}/>)}

      {ticket.status !== 'closed' && (
        <button className='btn btn-block btn-danger' onClick={onTicketClose}>Close Ticket</button>
      )}
      
    </div>
  )
}

export default Ticket
