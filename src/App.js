import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './utils/AuthRoute';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import SinglePost from './pages/SinglePost';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Container>
                    <MenuBar></MenuBar>
                    <Route exact path="/" component={Home}></Route>
                    <AuthRoute
                        exact
                        path="/login"
                        component={Login}
                    ></AuthRoute>
                    <AuthRoute
                        exact
                        path="/register"
                        component={Register}
                    ></AuthRoute>
                    <Route exact path="/posts/:postId" component={SinglePost} />
                </Container>
            </Router>
        </AuthProvider>
    );
}

export default App;
