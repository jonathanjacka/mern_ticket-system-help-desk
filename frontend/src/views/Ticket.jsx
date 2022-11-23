import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { getTicket, closeTicket, reset } from '../features/tickets/ticketSlice';
import { getNotes, reset as notesReset } from '../features/notes/notesSlice';

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

  const { ticket, isLoading, isSuccess, isError, message } = useSelector(state => state.ticket);
  const { notes, isLoading: notesIsLoading , isSuccess: notesIsSuccess, isError: notesIsError, message: notesMessage } = useSelector(state => state.note);
  const { ticketId } = useParams();
  const dispatch = useDispatch();
  
  useEffect( () => {
    if(isError) {
      toast.error(message);
    }

    if(notesIsError) {
      toast.error(notesMessage);
    }

    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
    
  }, [isError, notesIsError, message, notesMessage, dispatch, ticketId]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Ticket successfully closed!');
    navigate('/tickets');
  }

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const onNoteSubmit = (event) => {
    event.preventDefault();
    console.log('New note submitted!');
    setNoteText('');
    closeModal();
  }

  if(isLoading || notesIsLoading) {
    return <Spinner />;
  }

  if(isError) {
    return (
      <>
        <BackButton url='/tickets'/>
        <h3>Something went wrong - unable to retrieve ticket information at this time.</h3>
      </>
    )
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
