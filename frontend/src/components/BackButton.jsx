import React from 'react';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function BackButton() {

  const navigate = useNavigate();

  return (
    <button className='btn btn-reverse btn-back' onClick={() => navigate(-1)}>
      <FaArrowAltCircleLeft /> Back
    </button>
  )
}

export default BackButton
