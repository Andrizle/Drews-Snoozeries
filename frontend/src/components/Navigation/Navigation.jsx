import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const sessionLinks = sessionUser ? (
    <>
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    </>
  ) : (
    <>
        <NavLink className='navLink' to="/login">Log In</NavLink>
        <NavLink className='navLink' to="/signup">Sign Up</NavLink>
    </>
  );

  return (
    <ul className='navBar'>
        <NavLink className='navLink' id='homeButton' to="/">Home</NavLink>
      <div className='user'>{isLoaded && sessionLinks}</div>
    </ul>
  );
}

export default Navigation;
