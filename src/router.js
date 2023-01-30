import { createBrowserRouter } from 'react-router-dom';

import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';
import Admin from './components/admin';
import Create from './components/create';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: 'register',
        element: <Register />
    },
    {
        path: 'dashboard',
        element: <Dashboard />
    },
    {
        path: 'admin',
        element: <Admin />
    },
    {
        path: 'create',
        element: <Create />
    }
    
]);

export default router;
