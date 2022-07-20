import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from './modal';
// import { HeaderCSS } from '../css/header';

import Auth from '../utils/auth';

export const Header = () => {
    const [showModal, setShowModal] = useState(false);

    const togglemodal = () => {
        showModal ? setShowModal(false): setShowModal(true)
    }

    return (
        <>
            <section id="navbar">
                <section id="nav-container">

                    {/* Header for users login status */}
                    <article id="link">
                        {Auth.loggedIn() ? (
                            <ul>
                                <li onClick={Auth.logout}>Logout</li>
                                <li><Link to="/">Report</Link></li>
                                <li><Link to="/dashboard">Dashboard</Link></li>
                            </ul>
                        ) : (
                            <ul>
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