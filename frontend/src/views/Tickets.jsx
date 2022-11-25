import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTickets } from '../features/tickets/ticketSlice';

import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import TicketItem from '../components/TicketItem';

import { toast } from 'react-toastify';


function Tickets() {

    const { tickets, isError: ticketError } = useSelector(state => state.ticket);
    const dispatch = useDispatch();

    useEffect( () => {

      if(ticketError) {
        toast.error('Unable to retrieve tickets')
      }
        dispatch(getTickets());
    }, [dispatch, ticketError]);

    if(!tickets) {
        return <Spinner />;
    }

  return (
    <>
    <BackButton />
      <h1>Your Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
            <div>Date</div>
            <div>Product</div>
            <div>Status</div>
            <div></div>
        </div>
        {tickets.map(ticket => <TicketItem key={ticket._id} ticket={ticket}/>)}
      </div>
    </>
  )
}

export default Tickets
