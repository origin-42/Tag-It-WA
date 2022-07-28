import { useState } from "react";
import { Login } from './login';
import { Signup } from './signup';
import { ModalCSS } from '../css/modal';

export const Modal = ({ togglemodal }) => {
    const [siteAccess, changeOption] = useState("login");

    return (
        <section id="modal" style={ModalCSS.modalSection}>
            <section id="modal-container" style={ModalCSS.modal}>

                <section id="innerModal" style={ModalCSS.innerModal}>
                    <section id="modal-header" style={ModalCSS.flexStackSpace}>
                        <ul style={ModalCSS.flexStack}>
                            <li onClick={() => changeOption("login")} style={ModalCSS.modalSpan}>LOGIN</li>
                            <li onClick={() => changeOption("signup")} style={ModalCSS.modalSpan}>SIGNUP</li>
                        </ul>
                        <div id="exit-modal" onClick={togglemodal} style={ModalCSS.cross}>X</div>
                    </section>
                    <section id="modal-body">

                        {siteAccess === "login" && <Login />}
                        {siteAccess === "signup" && <Signup />}

                    </section>
                    <section id="modal-footer" style={ModalCSS.toolTip}>
                        <p>Create an account to access site information.</p>
                    </section>
                </section>
            </section>
        </section>
    )
}