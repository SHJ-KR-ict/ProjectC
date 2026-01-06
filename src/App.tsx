import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './comp/Layout';
import AppRoutes from './Router/AppRoutes';
import { AuthProvider } from './comp/AuthProvider';


function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Layout>
            <AppRoutes />
          </Layout>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
