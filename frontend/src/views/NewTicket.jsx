import { useState } from 'react';
import { useSelector } from 'react-redux';

function NewTicket() {

  const { user } = useSelector((state) => state.auth);
  const [ name ] = useState(user.name);
  const [ email ] = useState(user.email);
  const [ product, setProduct ] = useState('iPhone');
  const [ description, setDescription ] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <>
      <section className='heading'>
        <h1>Create new ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name:</label>
          <input type="text" className='form-control' value={name} disabled/>
        </div>

        <div className="form-group">
          <label htmlFor="email">Customer Email:</label>
          <input type="text" className='form-control' value={email} disabled/>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
          <label htmlFor="product">Product:</label>
            <select name="product" id="product" value={product} onChange={(event) => setProduct(event.target.value)}>
              <option value="iPhone">iPhone</option>
              <option value="iMac">iMac</option>
              <option value="MacBook">MacBook</option>
              <option value="iPad">iPad</option>
              <option value="AirPods">AirPods</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Please describe the issue:</label>
            <textarea name="description" id="description" className='form-control' style={{resize: 'none'}} placeholder='Enter description...' value={description} onChange={(event) => setDescription(event.target.value) }></textarea>
          </div>

          <div className="form-group">
            <button className='btn btn-block'>Submit</button>
          </div>

        </form>

      </section>
    </>
  )
}

export default NewTicket;
