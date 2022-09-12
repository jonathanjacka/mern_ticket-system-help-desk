import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';

import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';

import { toast } from 'react-toastify';

function Login() {

  const [ formData, setFormData ] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const { user, isLoading, isSuccesss, message } = useSelector((state) => state.auth);

  const handleChange = (event) => {
    setFormData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }))
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      email,
      password
    }

    dispatch(login(userData));
    
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please enter your email and password</p>
      </section>

      <section className="form">
        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="form-group">
            <input type="email" className='form-control' id='email' name='email' value={email} onChange={handleChange} placeholder='Enter your email address' required/>
          </div>
          {/* Password */}
          <div className="form-group">
            <input type="password" className='form-control' id='password' name='password' value={password} onChange={handleChange} placeholder='Enter a password' required/>
          </div>

          <div className="form-group">
            <button className="btn btn-block">Log in</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login;
