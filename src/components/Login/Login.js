import React from 'react';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

import './Login.css';

const login = () => {
    return (
        <div className="Login">
            <img src={require('../../assets/images/logo.png')} className='logo' />
            <h1>OASIS'19</h1>
            <h2>Web Wallet</h2>
            <form name="login" id="login-form">
                <div style={{display: 'flex'}}><i class="fa fa-user" style={{display: 'flex', alignItems: 'center', fontSize: '1.25rem', color: '#444444'}}></i><Input type="text" name="username" placeholder="Username" /></div>
                <div style={{display: 'flex'}}><i class="fa fa-lock" style={{display: 'flex', alignItems: 'center', fontSize: '1.25rem', color: '#444444'}}></i><Input type="password" name="password" placeholder="Password" /></div>
                <Button>LOGIN</Button>
            </form>
            <Button>LOGIN with BITS mail</Button>
        </div>
    )
}

export default login;