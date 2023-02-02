import {
  HOME_PATH,
  REGISTER_PATH,
  DASHBOARD_PATH,
  DONATION_PATH,
  SIGN_IN_PATH,
} from '../pages/paths';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Register from '../pages/register/Register';
import Dashboard from '../pages/dashboard/Dashboard';
import Donation from '../pages/Donation/Donation';
import SignIn from '../pages/signin/SignIn';
import { useLocation } from 'react-router-dom';
import Nav from '../components/Nav/Nav';
import Header from '../components/Header/Header';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { MyProfileQuery } from '../gql/graphql';

const MY_PROFILE = gql`
  query MyProfile {
    myProfile {
      email
    }
  }
`;

function App() {
  const location = useLocation();
  const { data, refetch } = useQuery<MyProfileQuery>(MY_PROFILE);
  return (
    <>
      <Header />
      <div className="flex justify-end text-[#fff] mt-[10px] text-sm ">
        {data?.myProfile ? (
          <i>{data?.myProfile.email}</i>
        ) : (
          <nav>
            <Link to={REGISTER_PATH} className="bg-[#484B8A]  rounded p-[3px]">
              Inscription
            </Link>
            {' | '}
            <Link
              to={SIGN_IN_PATH}
              className="bg-[#484B8A]  rounded p-[3px] mr-5"
            >
              Connexion
            </Link>
          </nav>
        )}
      </div>
      <main>
        <Routes>
          <Route path={HOME_PATH} element={<Home />} />
          <Route path={DASHBOARD_PATH} element={<Dashboard />} />
          <Route path={DONATION_PATH} element={<Donation />} />
          <Route
            path={REGISTER_PATH}
            element={<Register onSuccess={refetch} />}
          />
          <Route path={SIGN_IN_PATH} element={<SignIn onSuccess={refetch} />} />
        </Routes>
      </main>
      {location.pathname !== REGISTER_PATH &&
        location.pathname !== SIGN_IN_PATH && <Nav />}
      <ToastContainer />
    </>
  );
}

export default App;
