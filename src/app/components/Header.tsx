import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link';
import React from 'react'

const Header = () => {

  const {data : session} = useSession();

  const handleSignout = async () => {
    try {
      await signOut();
      
    } catch (error) {
      console.log(error);
    }
    
  };
  return (
    <div>
      Header
      <button onClick={handleSignout}> Sign Out</button>
      <Link href="/login">Login</Link>


      {session ? (
        <div>
          <p>Welcome, {session.user.name}</p>
        </div>
      ) : (
        <div>
          <p>You are not logged in</p>
        </div>
      )}
    </div>
  )
}

export default Header
