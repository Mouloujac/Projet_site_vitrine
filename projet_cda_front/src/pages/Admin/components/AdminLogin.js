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
      console.log(response.data.isAdmin);
      if (response.data.isAdmin === 1) {
        console.log('is admin')
        setUser(response.data);
        setAuthenticated(true);
        navigate('/admin');
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
      navigate('/');

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
        <section id="login-page">
          <h1>Administration</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={login}>
          {({ isSubmitting }) => (
            <Form className='login-form'>
              <h2>Login</h2>
              <h3>Connecte toi au panel d'administration grace a tes identifiants d'administrateur.</h3>
              <div className="login-form-group ">
                
                <Field type="email" name="email" className="form-control" placeholder="@UserName" autoComplete="off"/>
                <ErrorMessage name="email" component="div" />
              </div>
              <div className="login-form-group">
                
                <Field type="password" name="password" className="form-control" placeholder="@UserName" autoComplete="off"/>
                <ErrorMessage name="password" component="div" />
              </div>
              <div className='error-message-login mt-3 text-danger'></div>
              <div className="login-form-group">
              <button type="submit" className="btn-validate">
              <span>Login</span>
                <svg viewBox="-5 -5 110 110" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0"/>
                </svg>
              </button>
              </div>
            </Form>
          )}
        </Formik>
        </section>
      )}
    </>
  );
};

export default AdminLogin;
