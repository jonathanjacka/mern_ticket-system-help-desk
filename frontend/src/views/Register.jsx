import { useState } from 'react';
import { FaUser } from 'react-icons/fa';

import { toast } from 'react-toastify';

function Register() {

  const [ formData, setFormData ] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const { name, email, password, passwordConfirm } = formData;

  const handleChange = (event) => {
    setFormData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }))
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(password !== passwordConfirm) {
      toast.error('Passwords must match!');
    }
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <input type="text" className='form-control' id='name' name='name' value={name} onChange={handleChange} placeholder='Enter your name' required/>
          </div>
          {/* Email */}
          <div className="form-group">
            <input type="email" className='form-control' id='email' name='email' value={email} onChange={handleChange} placeholder='Enter a valid email address' required/>
          </div>
          {/* Password */}
          <div className="form-group">
            <input type="password" className='form-control' id='password' name='password' value={password} onChange={handleChange} placeholder='Enter a password' required/>
          </div>
          {/* Confirm Password */}
          <div className="form-group">
            <input type="password" className='form-control' id='passwordConfirm' name='passwordConfirm' value={passwordConfirm} onChange={handleChange} placeholder='Confirm your password' required/>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Register</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register
