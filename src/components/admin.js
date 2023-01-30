import React, { useState } from 'react';
import { Navigate, Link, Route, Routes } from 'react-router-dom';
import { useUsersContext } from '../contexts/users';
import { useBooksContext } from '../contexts/books';

const Admin = () => {
    const { activeUser, logOut, users,searchForUser } = useUsersContext();
    const { books, getBookInfo, editBookUser, searchForBook } = useBooksContext();
    const [selectedBook, setSelectedBook] = useState(null);
    const [searchBook,setSearchBook]=useState('');
    const [foundBook,setFoundBook]=useState(books);
    const [searchUser,setSearchUser]=useState('');
    const [foundUser,setFoundUser]=useState(users);

    const changeUser = (user = '') => {
        editBookUser(selectedBook, user);
    }

   

    return activeUser ? (
        <div className='dashBoardForm'>
            
            <div className='nameDisplay'>
                <h3>Welcome Librarian!</h3>
                <button onClick={logOut} className='logout-btn'>Log out</button>
            </div>
            <div >
                <Link to='/create'>add book</Link>
                <div >
                    <input type="text" value={searchBook} onChange={e => setSearchBook(e.target.value)}/>
                    <button onClick={()=>setFoundBook(searchForBook(searchBook))} className='searchBar'>Search</button>
                </div>
                    {/* {foundBook.map(book => (
                        <div key={book.id}>
                            {book.title}
                        </div>
                    ))} */}
            </div>
            <div className='flex border'>
                {foundBook.map(book => (
                    <div
                        key={book.id}
                        className={book.id === selectedBook ? 'selected' : ''}
                        onClick={() => setSelectedBook(book.id)}
                    >
                        {book.title}
                    </div>
                ))}
            </div>
            <div>
                {selectedBook&&(
                    <table>
                        <tr>
                            <td>id</td>
                            <td>author</td>
                            <td>title</td>
                            <td>publisher</td>
                            <td>date</td>
                            <td>user</td>
                            <td>reserved</td>
                            <td>leased</td>
                        </tr>
                        <tr>
                            <td>{getBookInfo(selectedBook).id}</td>
                            <td>{getBookInfo(selectedBook).author}</td>
                            <td>{getBookInfo(selectedBook).title}</td>
                            <td>{getBookInfo(selectedBook).publisher}</td>
                            <td>{getBookInfo(selectedBook).date}</td>
                            <td>{getBookInfo(selectedBook).user}</td>
                            <td>{getBookInfo(selectedBook).reserved}</td>
                            <td>{getBookInfo(selectedBook).leased}</td>
                        </tr>
                    </table>

                )}
                {/* {JSON.stringify(getBookInfo(selectedBook))} */}
                {selectedBook && (
                    <div>
                        <h3>Select user:</h3>
                        <div >
                            <input type="text" value={searchUser} onChange={e => setSearchUser(e.target.value)}/>
                            <button onClick={()=>setFoundUser(searchForUser(searchUser))} className='searchBar'>Search</button>
                        </div>
                        <ul>
                            <li className={getBookInfo(selectedBook).user === '' ? 'selected' : ''}
                                onClick={() => changeUser()}>none</li>
                            {foundUser.map(user => {
                                return user.user !== 'librarian' &&
                                    <li
                                        key={user.user}
                                        className={getBookInfo(selectedBook).user === user.user ? 'selected' : ''}
                                        onClick={() => changeUser(user.user)}
                                    >
                                        {user.user}
                                    </li>
                            })}
                        </ul>
                        
                    </div>
                )}
            </div>
        </div>
    ) : <Navigate to='/' />; 
}

export default Admin;
