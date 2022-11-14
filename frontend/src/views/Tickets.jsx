import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTickets, reset } from '../features/tickets/ticketSlice';

import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';


function Tickets() {

    const { tickets, isLoading, isSuccess } = useSelector(state => state.ticket);
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getTickets());

        return () => {
            if(isSuccess) {
                dispatch(reset());
            }
        }
    }, [dispatch, isSuccess]);

    if(isLoading) {
        return <Spinner />;
    }


  return (
    <div>
      <h1>All your tickets</h1>
    </div>
  )
}

export default Tickets
