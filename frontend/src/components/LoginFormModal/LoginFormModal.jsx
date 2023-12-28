// frontend/src/components/LoginFormModal/LoginFormModal.jsx

import { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [allow, setAllow] = useState(true)
  const { closeModal } = useModal();

  useEffect(() => {
    if(credential.length < 4 || password.length < 6) {
      setAllow(true)
    } else { setAllow(false)}
  }, [credential.length, password.length])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.userLogin({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const demoUser = (e) => {
    e.preventDefault();
    setErrors({});
    dispatch(sessionActions.userLogin({credential: 'Demo-lition', password: 'password'}))
    .then(closeModal)
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });
  }

  return (
    <div id='loginModal'>
      <h1>Log In</h1>
      <form
      id='loginForm'
      onSubmit={handleSubmit}>
        <label>
          <input
            className='loginInputs'
            placeholder='Username or Email'
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            className='loginInputs'
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p className='errors' >{errors.credential}</p>
        )}
        <button type="submit" className='bigButton' disabled={allow}>Log In</button>
        <button className='bigButton' onClick={demoUser}>Log in as Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
