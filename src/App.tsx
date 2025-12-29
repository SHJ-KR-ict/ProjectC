import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './comp/Layout';
import AppRoutes from './Router/AppRoutes';


function App() {
  return (
    <div>
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </div>
  );
}

export default App;
