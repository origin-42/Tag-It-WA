import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

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
        Auth.login(token);
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

                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            placeholder="tommyjones78"
                            name="username"
                            type="username"
                            id="username"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            placeholder="jonsey89@gmail.com"
                            name="email"
                            type="email"
                            id="email"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            placeholder="******"
                            name="password"
                            type="password"
                            id="password"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </section>
        </section>
    )
}