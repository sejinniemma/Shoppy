import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import { login, logout, onUserStateChange } from '../api/firebase';
import User from './User';

export default function Navbar() {
  const [user, setUser] = useState();
  const [admin, setAdmin] = useState();

  useEffect(() => {
    onUserStateChange((user) => {
      user.isAdmin && setAdmin(user);
      setUser(user);
    });
  }, []);

  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Products</Link>
        {user && <Link to='/carts'>Carts</Link>}
        {user && (
          <Link to='/products/new' className='text-2xl'>
            <BsFillPencilFill />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <button onClick={login}>Login</button>}
        {user && <button onClick={logout}>Logout</button>}

        {/* what is the difference?? */}
        {/* {user ? (
          <button onClick={login}>Login</button>
        ) : (
          <button onClick={login}>Login</button>
        )} */}
      </nav>
    </header>
  );
}
