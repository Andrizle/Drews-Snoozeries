import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import SpotsList from './components/Spots/SpotList';
import SingleSpot from './components/Spots/SingleSpot';
import CurrentUserSpots from './components/Spots/CurrentUserSpots';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SpotsList />
      },
      {
        path: '/spots/:spotId',
        element: <SingleSpot />
      },
      {
        path: '/spots/current',
        element: <CurrentUserSpots />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
