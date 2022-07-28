import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { ModalCSS } from '../css/modal';
import { Button } from '../css/button';

export const Signup = () => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const mutationResponse = await addUser({
          variables: {
            username: formState.username,
            email: formState.email,
            password: formState.password
          },
        });
        const token = mutationResponse.data.addUser.token;
        
        Auth.login(mutationResponse.data.addUser.user._id, token);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
    };

    return (
        <section className="site-access">
            <section id="signup-section">

                <form onSubmit={handleFormSubmit} style={ModalCSS.modalSections}>
                    <div>
                        <label htmlFor="username" style={ModalCSS.modalSpan}>Username:</label>
                        <input
                            placeholder="tommyjones78"
                            name="username"
                            type="username"
                            id="username"
                            onChange={handleChange}
                            style={ModalCSS.modalInput}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" style={ModalCSS.modalSpan}>Email:</label>
                        <input
                            placeholder="jonsey89@gmail.com"
                            name="email"
                            type="email"
                            id="email"
                            onChange={handleChange}
                            style={ModalCSS.modalInput}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" style={ModalCSS.modalSpan}>Password:</label>
                        <input
                            placeholder="******"
                            name="password"
                            type="password"
                            id="password"
                            onChange={handleChange}
                            style={ModalCSS.modalInput}
                        />
                    </div>
                    <div>
                        <button type="submit" style={Button.smallBlue}>Submit</button>
                    </div>
                </form>
            </section>
        </section>
    )
}