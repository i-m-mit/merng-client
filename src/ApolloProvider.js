import App from './App';
import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    ApolloProvider,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

import { TOKEN_KEY } from './context/auth';

const httpLink = createHttpLink({
    uri: 'http://localhost:5000',
});

const authLink = setContext(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
