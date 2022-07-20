import { useState } from "react";
import { Login } from './login';
import { Signup } from './signup';

export const Modal = ({ togglemodal }) => {
    const [siteAccess, changeOption] = useState("login");

    return (
        <section id="modal">
            <section id="modal-container">

                <section id="modal-header">
                    <ul>
                        <li onClick={() => changeOption("login")}>Login</li>
                        <li onClick={() => changeOption("signup")}>Signup</li>
                    </ul>
                    <div id="exit-modal" onClick={togglemodal}>X</div>
                </section>
                <section id="modal-body">

                    {siteAccess === "login" && <Login />}
                    {siteAccess === "signup" && <Signup />}

                </section>
                <section id="modal-footer">
                    <p>Create an account to access site information.</p>
                </section>

            </section>
        </section>
    )
}