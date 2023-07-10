import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import "./Styles/Account.css"

const Account = ({ user, setUser }) => {
  const initialValues = {
    username: user.username,
    email: user.email,
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Ton pseudo doit faire au moins 3 caractères')
      .required('Le pseudo est obligatoire'),
    email: Yup.string()
      .email('Email incorrect')
      .required('L\'adresse email est obligatoire'),
    password: Yup.string()
      .min(8, 'Ton mot de passe doit faire au moins 8 caractères')
      .required('Le mot de passe est obligatoire'),
  });

  const navigate = useNavigate();
  const csrf = async () => axios.get('/sanctum/csrf-cookie');

  const update = async (values) => {
    try {
      await csrf();
      await axios.put(`/user/${user.id}`, values);
      toast.success("Modification réussie");

      const response = await axios.get('/api/user');
      setUser(response.data);
      navigate('/');

    } catch (error) {
      if (error.response.status !== 422) throw error;
      document.querySelector('.error-message-account').innerHTML += error.response.data.message;
    }
  };

  return (
    <section id="accountSession">
    <h2 id="h2Account">Mon compte</h2>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={update}>
    
      {({ isSubmitting }) => (
        <Form className='accountForm'>
          <div className="form-group ">
            <label htmlFor="username">Pseudo</label>
            <Field type="text" name="username" className="form-control" />
            <ErrorMessage name="username" component="div" />
          </div>
          <div className="form-group ">
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" className="form-control" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="password">Mot de passe</label>
            <Field type="password" name="password" className="form-control" />
            <ErrorMessage name="password" component="div" />
          </div>
          <div className='error-message-account mt-3 text-danger'></div>
          <button type="submit" className="btn btn-primary mt-4">
            Modifier
          </button>
        </Form>
      )}
    </Formik>
    </section>

  );
};

export default Account;
