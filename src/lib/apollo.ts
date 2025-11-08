import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// @ts-expect-error exists
import { createUploadLink } from 'apollo-upload-client';
import { API_URL } from '../utils/constants';

const httpLink = createUploadLink({
  uri: API_URL,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'apollo-require-preflight': 'true',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
