import {
  REGISTER_PATH,
  DASHBOARD_PATH,
  DONATION_PATH,
  SIGN_IN_PATH,
  CARBON_SPENDING_PATH,
  WHYCOMMIT_PATH,
  FRIENDSHIP_PATH,
  HOME_PATH,
} from '../pages/paths';
import { Routes, Route } from 'react-router-dom';
import Register from '../pages/register/Register';
import Dashboard from '../pages/dashboard/Dashboard';
import Donation from '../pages/Donation/Donation';
import WhyCommit from '../pages/WhyCommit/WhyCommit';
import SignIn from '../pages/signin/SignIn';
import { useLocation } from 'react-router-dom';
import Nav from '../components/Nav/Nav';
import Header from '../components/Header/Header';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { MyProfileQuery } from '../gql/graphql';
import { useState } from 'react';
import Protected from '../pages/alreadyLog/Protected';
import LogOutButton from '../components/logOutButton/LogOutButton';
import Friendhsip from '../pages/friendship/Friendship';
import Interdit from '../Assets/interdit.png';
import CarbonSpending from '../pages/carbon-spending/carbonSpending';

function App() {
  const MY_PROFILE = gql`
    query MyProfile {
      myProfile {
        email
        id
      }
    }
  `;

  const [isLogged, setIsLogged] = useState(false);

  const { loading, refetch, data } = useQuery<MyProfileQuery>(MY_PROFILE, {
    onCompleted: (data) => {
      if (data.myProfile) {
        setIsLogged(true);
        refetch();
      }
    },
    onError: () => {
      setIsLogged(false);
    },
  });

  const location = useLocation();

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
      {!isLogged &&
        location.pathname !== '/signin' &&
        location.pathname !== '/register' && (
          <div className="text-center flex flex-col items-center justify-center mt-[100px]">
            <img alt="Interdit" src={Interdit} width={500} />
            <h1 className="text-[40px] max-sm:text-[22px]">
              Pour accèder au contenu de la page, veuillez vous connecter !
            </h1>
          </div>
        )}
      <Protected isLoggedIn={isLogged} loading={loading}>
        <LogOutButton userData={data} setIsLogged={setIsLogged} />
      </Protected>
      <main>
        <Routes>
          <Route
            path={HOME_PATH}
            element={
              <Protected isLoggedIn={isLogged} loading={loading}>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path={DASHBOARD_PATH}
            element={
              <Protected isLoggedIn={isLogged} loading={loading}>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path={DONATION_PATH}
            element={
              <Protected isLoggedIn={isLogged} loading={loading}>
                <Donation />
              </Protected>
            }
          />

          <Route path={WHYCOMMIT_PATH} element={<WhyCommit />} />

          <Route
            path={CARBON_SPENDING_PATH}
            element={
              <Protected isLoggedIn={isLogged} loading={loading}>
                <CarbonSpending />
              </Protected>
            }
          />
          <Route
            path={FRIENDSHIP_PATH}
            element={
              <Protected isLoggedIn={isLogged} loading={loading}>
                <Friendhsip />
              </Protected>
            }
          />

          <Route
            path={REGISTER_PATH}
            element={<Register onSuccess={refetch} />}
          />
          <Route
            path={FRIENDSHIP_PATH}
            element={
              <Protected isLoggedIn={isLogged} loading={loading}>
                <Friendhsip />
              </Protected>
            }
          />
          <Route
            path={SIGN_IN_PATH}
            element={<SignIn setIsLogged={setIsLogged} onSuccess={refetch} />}
          />
        </Routes>
      </main>
      {location.pathname !== REGISTER_PATH &&
        location.pathname !== SIGN_IN_PATH && <Nav />}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ marginBottom: '80px' }}
      />
      {location.pathname !== REGISTER_PATH &&
        location.pathname !== WHYCOMMIT_PATH && <Nav />}{' '}
    </>
  );
}

export default App;
