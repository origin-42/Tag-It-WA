import './css/reset.css';
import './css/fonts.css';
import './css/animations.css';
import { Header } from './components/Header';
import { Report } from './pages/Report';
import { Issues } from './pages/Issues';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <main>
          <Header />
            <Routes>
              <Route
                path="/"
                element={<Report />}
              />
              <Route
                path="/dashboard"
                element={<h1>Dashboard!</h1>}
              />
              <Route 
                path="/Issues"
                element={<Issues />}
              />
            </Routes>
        </main>
      </Router>
    </ApolloProvider>
  );
}

export default App;
