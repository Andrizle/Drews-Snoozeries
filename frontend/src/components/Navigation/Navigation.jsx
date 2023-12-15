import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='navBar'>
        <NavLink className='navLink' id='homeButton' exact to="/">Home</NavLink>
        <li>
          {isLoaded && (
          <ProfileButton className='navLink' user={sessionUser} />
      )}
        </li>

    </div>
  );
}

export default Navigation;
