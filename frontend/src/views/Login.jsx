import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';

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

  const {isLoading} = useSelector((state) => state.auth);

  const handleChange = (event) => {
    setFormData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }))
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
    .unwrap()
    .then(user => {
      toast.success(`Successfully logged in as user ${user.name}!`);
      navigate('/');
    })
    .catch(error => toast.error('Error - unable to log in'));
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
