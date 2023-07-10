import React from 'react'
import './styles/Footer.css'
import { Link } from 'react-router-dom'

const Footer =() =>{

    return(
                <section id="footer">
        <div className="main-footer">
            <div className="logoinfo" data-aos="fade-up">
            <h2>Jacquotte & Fanfan</h2>
            <p>By Théo Lecolley</p>

            <div className="contact-details">
                <h1>Contact</h1>
                <li>
                <div className="fa fa-phone"></div><a href="tel:+919326048690">+33 6654321</a></li>
                <li>
                <div className="fa fa-envelope"></div><a href="mailto:yourmail@gmail.com">Jacquotte.fanfan@gmail.com</a></li>
                
            </div>
        </div>
        <div className="com " data-aos="fade-up">
            <h1>About</h1>
            <ul>
            <li><Link to="/" >Accueil</Link></li>
            <li><Link to="/panier" >Panier</Link></li>
            <li><Link to="/contact" >Contact</Link></li>
            <li><Link to="/panier" ></Link></li>
            </ul>
        </div>
        <div className="info" data-aos="fade-up">
            <h1>Social Media</h1>
            <div className="sociallogos">
            <div className="logobox">
                <a href="https://www.instagram.com/jacquotte.et.fanfan/" >
                    <img className="instagram" src="https://laravel-photos.s3.amazonaws.com/instagram.png"></img>
                </a>
                <a href="https://www.facebook.com/jacquotteetFanfan/?locale=fr_FR" >
                    <img className="facebook" src="https://laravel-photos.s3.amazonaws.com/facebook.png"></img>
                </a>
            </div>
            </div>
        </div>
        </div>
        <footer>© Your Copyright 2021 All Rights Reserved</footer>
        </section>
    )
};

export default Footer;