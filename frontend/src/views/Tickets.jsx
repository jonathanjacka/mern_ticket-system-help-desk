import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTickets, reset as ticketsReset } from '../features/tickets/ticketSlice';

import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import TicketItem from '../components/TicketItem';


function Tickets() {

    const { tickets } = useSelector(state => state.ticket);
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getTickets());
    }, [dispatch]);

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
