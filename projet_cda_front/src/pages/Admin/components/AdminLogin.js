import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from '../../../axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({user, setUser }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email incorrect')
      .required('L\'adresse email est obligatoire'),
    password: Yup.string()
      .min(8, 'Ton mot de passe doit faire au moins 8 caractères')
      .required('Le mot de passe est obligatoire')
  });

  const navigate = useNavigate();

  const login = async (values) => {
    try {
      await axios.post('/login', values);
      toast.success("Connexion réussie");

      const response = await axios.get('/api/user');
      console.log(response.data);
      if (response.data.is_admin === 1) {
        setUser(response.data);
        setAuthenticated(true);
        navigate("/admin");
      } else {
        document.querySelector('.error-message-login').innerHTML = "Vous n'avez pas les droits d'accès à l'administration.";
      }
      
    } catch(error) {
      if (error.response.status !== 422) throw error;
      document.querySelector('.error-message-login').innerHTML += error.response.data.message;
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      setAuthenticated(false);
      navigate('/login');

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {authenticated ? (
        <div>
          <p>Bienvenue {user.email}</p>
          <button onClick={handleLogout}>Déconnexion</button>
        </div>
      ) : (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={login}>
          {({ isSubmitting }) => (
            <Form className='p-3 mx-auto w-fit-content login-form mt-5'>
              <div className="form-group ">
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" className="form-control"/>
                <ErrorMessage name="email" component="div" />
              </div>
              <div className="form-group mt-4">
                <label htmlFor="password">Mot de passe</label>
                <Field type="password" name="password" className="form-control"/>
                <ErrorMessage name="password" component="div" />
              </div>
              <div className='error-message-login mt-3 text-danger'></div>
              <button type="submit" className="btn btn-primary mt-4">
                Se connecter
              </button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default AdminLogin;