import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [allow, setAllow] = useState(true)
  const { closeModal } = useModal();

  useEffect(() => {
    if (!email || username.length < 4 || !firstName || !lastName || password.length < 6 || !confirmPassword) {
      setAllow(true)
    } else {setAllow(false)}
  } , [lastName, firstName, password.length, username.length, email, confirmPassword])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signupUser({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div id='signupModal'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            className='signupInputs'
            placeholder='Email'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email ? <p className='errors'>{errors.email}</p> : <p>* Username must be at least four characters long</p> }
        <label>
          <input
          className='signupInputs'
          placeholder='Username'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className='errors'>{errors.username}</p>}
        <label>
          <input
            className='signupInputs'
            placeholder='First Name'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p className='errors'>{errors.firstName}</p>}
        <label>
          <input
            className='signupInputs'
            placeholder='Last Name'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p className='errors'>{errors.lastName}</p>}
        <label>
          <input
            className='signupInputs'
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            className='signupInputs'
            placeholder='Confirm Password'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
        </label>
          {errors.password ? <p className='errors'>{errors.password}</p> : <p>* Password must be at least 6 characters long</p>}
        {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
        <button type="submit" className='bigButton' disabled={allow}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
