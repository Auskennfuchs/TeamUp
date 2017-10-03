import {
    ApolloClient,
    createNetworkInterface
} from 'react-apollo';

const networkInterface = createNetworkInterface({ uri: 'http://localhost:4000/teamupGQL' });

export const Client = new ApolloClient({
    networkInterface
});
