import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { getTicket, closeTicket, reset } from '../features/tickets/ticketSlice';

import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

import { toast } from 'react-toastify';

function Ticket() {

  const navigate = useNavigate();

  const { ticket, isLoading, isSuccess, isError, message } = useSelector(state => state.ticket);
  const { ticketId } = useParams();
  const dispatch = useDispatch();
  
  useEffect( () => {
    if(isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
    
  }, [isError, message, dispatch, ticketId]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Ticket successfully closed!');
    navigate('/tickets');
  }

  if(isLoading) {
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
      </header>

      {ticket.status !== 'closed' && (
        <button className='btn btn-block btn-danger' onClick={onTicketClose}>Close Ticket</button>
      )}
      
    </div>
  )
}

export default Ticket
