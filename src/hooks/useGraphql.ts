import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { API_URL } from '../utils/constants.ts';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

export function useGraphContext() {
  const httpLink = createUploadLink({
    uri: API_URL,
    credentials: 'include',
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        'Apollo-Require-Preflight': 'true',
      },
    };
  });

  return { authLink, httpLink };
}

export function useGraphClient() {
  const { authLink, httpLink } = useGraphContext();
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  return client;
}
