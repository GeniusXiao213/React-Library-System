import { createContext, useContext, useEffect, useState } from 'react';

const UsersContext = createContext([]);

const UsersContextProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [activeUser, setActiveUser] = useState();

    const loginUser = (user, pwd) => {
        let res = false;

        users.forEach(u => {
            if (u.user === user && u.pwd === pwd) {
                setActiveUser(u);
                res = true;
            }
        })

        return res;
    }

    const searchForUser=(name)=>{
        name.toLowerCase();
        return users.filter(user=>user.user.toLowerCase().includes(name));
    }

    const registerUser = (username, password, confirmPassword) => {
        if(!username || !password || !confirmPassword)
        {
            return 'field cannot be empty';
        }
        if (!/^[0-9a-z_]{3,26}$/.test(username)) {
            return 'username cannot contain non-alphanumeric characters';
        }
        if (password !== confirmPassword) {
            return 'password and confirm password do not match';
        }
        if (users.some(u => u.user === username)) {
            return 'user with the following username already exists';
        }
        setUsers(users => {
            return [...users, {
                user: username,
                pwd: password.trim()
            }];
        })
        return '';
    }
    
    const logOut = () => {
        setActiveUser(null);
    }

    const deleteUser = (user) => {
        
        setUsers(users => users.filter(u => u.user !== user));
    }

    useEffect(() => {
        const lsUsers = localStorage.getItem('users');

        if (lsUsers == null) {
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };
            fetch('users.json', { headers })
                .then(response => response.json())
                .then(setUsers);
        } else
            setUsers(JSON.parse(lsUsers));

    }, []);

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    return (
        <UsersContext.Provider value={{
            users,
            activeUser,
            loginUser,
            logOut,
            registerUser,
            deleteUser,
            searchForUser
        }}>
            {children}
        </UsersContext.Provider>
    )
}

export default UsersContextProvider;
export const useUsersContext = () => useContext(UsersContext);
