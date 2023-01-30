import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUsersContext } from '../contexts/users';
import { useBooksContext } from '../contexts/books';

const Dashboard = () => {
    const { activeUser, logOut, deleteUser } = useUsersContext();
    const { books,getUserBooks, getBooks, borrowBook, unborrowBook, getBookInfo, removeUser,searchForBook } = useBooksContext();
    const [selectedBook, setSelectedBook] = useState(null);
    const navigate = useNavigate();
    const [searchBook,setSearchBook]=useState('');
    const [foundBook,setFoundBook]=useState(books);

    const borrowButtonHandler = () => {
        borrowBook(selectedBook, activeUser?.user);
    }

    const removeButtonHandler = () => {
        unborrowBook(selectedBook, activeUser?.user);
    }

    const deleteAccountButtonHandler = () => {
        removeUser(activeUser.user);
        deleteUser(activeUser.user);
        navigate('/');
    }

    return activeUser ? (
        <div className='dashBoardForm'>
            <div className='userDisplay'>
                <h3>User:{activeUser?.user}</h3>
                <div className='btns'>
                <button onClick={logOut} className='logout-btn'>logout</button>
                <button onClick={deleteAccountButtonHandler} className='logout-btn' >delete</button>
                </div>
            </div>
            <div >
                
                <div >
                    <input type="text" value={searchBook} onChange={e => setSearchBook(e.target.value)}/>
                    <button onClick={()=>setFoundBook(searchForBook(searchBook))} className='searchBar'>Search</button>
                </div>
                
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
                            <td>reserved</td>
                            <td>leased</td>
                        </tr>
                        <tr>
                            <td>{getBookInfo(selectedBook).id}</td>
                            <td>{getBookInfo(selectedBook).author}</td>
                            <td>{getBookInfo(selectedBook).title}</td>
                            <td>{getBookInfo(selectedBook).publisher}</td>
                            <td>{getBookInfo(selectedBook).date}</td>
                            <td>{getBookInfo(selectedBook).reserved}</td>
                            <td>{getBookInfo(selectedBook).leased}</td>
                        </tr>
                    </table>)}
            </div>
            <div className='userDisplay'>
                <div className='btns'>
                    <button onClick={borrowButtonHandler} className='logout-btn'>borrow</button>
                    <button onClick={removeButtonHandler} className='logout-btn'>unborrow</button>
                </div>
            </div>
            <div className='flex border'>
                {getUserBooks(activeUser.user).map(book => (
                    <div
                        key={book.id}
                        className={book.id === selectedBook ? 'selected' : ''}
                        onClick={() => setSelectedBook(book.id)}
                    >
                        {book.title}
                    </div>
                ))}
            </div>
            
        </div>
    ) : <Navigate to='/' />;
}

export default Dashboard;
