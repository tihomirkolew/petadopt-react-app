import { createContext, useContext, useState } from "react";

const UserContext = createContext({
    isAuthenticated: false,
    user: {
        _id: '',
        email: '',
        password: '',
        accessToken: '',
        _createdOn: '',
    },
    registerHandler() { },
    loginHandler() { },
    logoutHandler() { },
});

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    const registerHandler = async (email, password, confirmPassword) => {
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        const newUser = { email, password };

        try {
            const response = await fetch('http://localhost:3030/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            const data = await response.json();

            setUser(data);
            return data;
        } catch (err) {
            alert(err.message);
            throw err;
        }
    };

    const loginHandler = async (email, password) => {
        const credentials = { email, password };

        try {
            const response = await fetch('http://localhost:3030/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            setUser(data);
        } catch (err) {
            console.error('Error during login:', err.message);
        }
    };

    const logoutHandler = async () => {
        if (!user?.accessToken) {
            console.warn('No access token found — skipping logout request');
            setUser(null);
            return;
        }

        if (!user) return;

        try {
            await fetch('http://localhost:3030/users/logout', {
                method: 'GET',
                headers: {
                    'X-Authorization': user.accessToken,
                },
            });
        } catch (err) {
            console.error('Error during logout:', err);
        } finally {
            setUser(null);
        }
    };

    const contextValues = {
        isAuthenticated: !!user,
        user,
        registerHandler,
        loginHandler,
        logoutHandler,
    };

    return (
        <UserContext.Provider value={contextValues}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const contextData = useContext(UserContext);

    return contextData;
}

export default UserContext;
