import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Login from './components/login/login';
import PrivateRoute from './components/helpers/privateRoute';
import Main from './main/main';

const App: React.FC = () => {
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (!isAuthenticated()) {
    //         logoutService();
    //         navigate('/login');
    //     }
    // }, [navigate]);

    return (
      <React.Fragment>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/main"
            element={
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            }
          />
        </Routes>
      </React.Fragment>
    );
};

export default App;
