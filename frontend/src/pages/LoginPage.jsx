import React from 'react'

const LoginPage = () => {
  return (
    <div>
      
      <form action="get" className='loginForm'>
        <label htmlFor="username">Username: </label>
        <input type="text" id='username' name='username' placeholder='Username' required/><br /><br />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" placeholder='Password' required/><br /><br />
        <input type="submit" value="submit" />
      </form>
    </div>
  )
}

export default LoginPage
