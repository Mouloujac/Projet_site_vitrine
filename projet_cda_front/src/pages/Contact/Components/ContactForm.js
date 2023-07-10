import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from '../../../axios';
import '../Styles/ContactForm.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      message,
    };

    axios
      .post('/api/contact', formData)
      .then((response) => {
        // Réponse de succès
        console.log(response.data);

        // Réinitialiser les champs après la soumission
        setName('');
        setEmail('');
        setMessage('');

        // Afficher le message de confirmation (en échappant les données)
        toast.success(`Merci, ${name}, pour votre message. Nous vous contacterons sous peu.`);

      })
      .catch((error) => {
        // Gestion des erreurs
        console.error(error);
      });
  };

  // Fonction pour échapper les caractères spéciaux HTML
  const escapeHtml = (unsafeText) => {
    return unsafeText.replace(/[&<"']/g, (match) => {
      switch (match) {
        case '&':
          return '&amp;';
        case '<':
          return '&lt;';
        case '"':
          return '&quot;';
        case "'":
          return '&#039;';
        default:
          return match;
      }
    });
  };

  return (
    <section id="contactSection">
     <div className="confirmationMessage" dangerouslySetInnerHTML={{ __html: confirmationMessage }}></div>
      <form onSubmit={handleSubmit} id="contactForm">
        <div >
          <label htmlFor="name">Nom :</label>
          <input
            className="formInputText"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div >
          <label htmlFor="email">Email :</label>
          <input
            className="formInputEmail"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div id="messageInput">
          <label id="messageLabel" htmlFor="message">Message: </label>
          <textarea
            
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button id="contactButton" type="submit">Envoyer</button>
      </form>
      
    </section>
  );
};

export default ContactForm;
