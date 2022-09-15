import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';

import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

function Login() {

  const [ formData, setFormData ] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user, isLoading, isSuccesss, isError, message } = useSelector((state) => state.auth);

  useEffect( () => {
    if(isError) {
      toast.error(message);
    }

    if(isSuccesss || user) {
      toast.success('Login successful!');
      navigate('/');
    }

    dispatch(reset());
  }, [isError, isSuccesss, user, message, navigate, dispatch]);

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

  if(isLoading) {
    return <Spinner />
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
