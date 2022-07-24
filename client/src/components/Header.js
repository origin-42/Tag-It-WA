import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from './modal';
import { HeaderCSS } from '../css/header';
import Logo from '../images/logo.jpg';

import Auth from '../utils/auth';

export const Header = () => {

    const [showModal, setShowModal] = useState(false);

    const togglemodal = () => {
        showModal ? setShowModal(false): setShowModal(true)
    }

    return (
        <>
            <section id="navbar">
                <section id="nav-container" style={HeaderCSS.navContainer}>
                    
                    <img id='logo' src={Logo} alt='Logo'></img>

                    {/* Header for users login status */}
                    <article id="links" style={{...HeaderCSS.flexJustEnd}}>
                        {Auth.loggedIn() ? (
                            <ul style={{...HeaderCSS.flexJustSpaceA}}>
                                <li onClick={Auth.logout}>Logout</li>
                                <li><Link to="/">Report</Link></li>
                                <li><Link to="/dashboard">Dashboard</Link></li>
                            </ul>
                        ) : (
                            <ul style={{...HeaderCSS.flexJustSpaceA}}>
                                <li onClick={togglemodal}>Access Site</li>
                            </ul>
                        )}
                    </article>
                </section>
            </section>
            {/* end Nav */}

            {/* Modal to help user login or signup */}
            {showModal && <Modal togglemodal={togglemodal} />}
        </>
    )
}