import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../../public/favicon-32x32.png'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='navBar'>
        <NavLink id='homeButton' to="/">
          <img src={logo} id='webLogo' />
        </NavLink>
        <div className='navRightSide'>
          <NavLink className='navLink' to="/spots/new">Create A New Spot</NavLink>
          <div>
            {isLoaded && (
              <ProfileButton className='navLink' user={sessionUser} />
            )}
          </div>

        </div>

    </div>
  );
}

export default Navigation;
