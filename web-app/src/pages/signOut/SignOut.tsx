import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  CreateUserMutation,
  CreateUserMutationVariables,
} from '../../gql/graphql';
import { getErrorMessage } from '../../utils';
import { SIGN_IN_PATH } from '../paths';

const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
      email
    }
  }
`;

const SignOut = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [createUser] = useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CREATE_USER);
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await createUser({
        variables: { email, password },
      });
      toast.success(
        `Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.`
      );
      navigate(SIGN_IN_PATH);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <h1>Inscription</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await submit();
        }}
      >
        <label>
          Adresse email
          <br />
          <input
            type="email"
            required
            autoComplete="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Mot de passe (8 caractères minimum, 1 minuscule, 1 majuscule, 1
          chiffre, 1 caractère spécial)
          <br />
          <input
            type="password"
            required
            autoComplete="new-password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </label>

        <br />
        <button>Valider</button>
      </form>
    </>
  );
};

export default SignOut;
