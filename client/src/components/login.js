import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import { ModalCSS } from '../css/modal';
import { Button } from '../css/button';

export const Login = () => {
    const [formState, setFormState] = useState({ username: '', password: '' });

    const [loginUser, { loginError }] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
          const mutationResponse = await loginUser({
            variables: { username: formState.username, password: formState.password },
          });
          console.log(mutationResponse)
          const token = mutationResponse.data.login.token;
          
          Auth.login(mutationResponse.data.login.user._id, token);
        } catch (e) {
          console.log(e);
        }
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
            <section id="login-section">

                <form onSubmit={handleFormSubmit} style={ModalCSS.modalSections}>
                    <div>
                        <label htmlFor="username" style={ModalCSS.modalSpan}>Username:</label>
                        <input
                            placeholder="mikeymike89"
                            name="username"
                            type="username"
                            id="username"
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

                    {loginError && 
                        <div>
                            <p className="error-text">The provided credentials are incorrect</p>
                        </div>}
                    
                    <div>
                        <button type="submit" style={Button.smallBlue}>Login</button>
                    </div>
                </form>
            </section>
        </section>
    )
}