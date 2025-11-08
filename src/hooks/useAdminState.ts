import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import store from '../store';
import { AUTH_ADMIN_WITH_PASSWORD } from '../utils/mutations';
import { GET_AUTHENTICATED_USER } from '../utils/queries';

export type AuthenticatedUser = {
  email: String;
  id: String;
  name: String;
  role: {
    name: String;
  };
};

export default function useAdminState() {
  const [adminLogin] = useMutation(AUTH_ADMIN_WITH_PASSWORD);
  const [fetchAuthenticaedUser] = useLazyQuery(GET_AUTHENTICATED_USER);
  const [tried, setTried] = useState(false);

  const [authenticatedUser, setAuthenticatedUser] = useState<
    AuthenticatedUser | undefined
  >(undefined);

  useEffect(() => {
    if (!tried && !authenticatedUser) {
      fetchAuthenticaedUser()
        .then((res) => {
          setAuthenticatedUser(res.data?.authenticatedItem);
          if (!store.getState().userModel.authenticatedUser) {
            store
              .getActions()
              .userModel.setAuthenticatedUser(res?.data?.authenticatedItem);
          }
        })
        .then(() => setTried(true));
    }
  }, [authenticatedUser, fetchAuthenticaedUser, tried]);

  return {
    adminLogin,
    fetchAuthenticaedUser,
    authenticatedUser: store.getState().userModel.authenticatedUser,
  };
}
