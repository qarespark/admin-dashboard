import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppNavigate } from 'hooks/useAppNavigate';
import useCookie from 'hooks/useCookie';
import React, { useEffect, useState } from 'react'
import { showSuccess } from 'redux/actions';
import { updateUserData } from 'redux/actions/loggedinUser';
import LOGO from "assets/images/respark_logo.png"
import USERNAME from "assets/images/password-icon.png"
import PASSWORD from "assets/images/username-icon.png"

function BiUser(props) {
    return <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" {...props}><circle fill="none" cx={12} cy={7} r={3} /><path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" /></svg>;
}

function RiLockPasswordLine(props) {
    return <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" {...props}><g><path fill="none" d="M0 0h24v24H0z" /><path d="M18 8h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V7a6 6 0 1 1 12 0v1zM5 10v10h14V10H5zm6 4h2v2h-2v-2zm-4 0h2v2H7v-2zm8 0h2v2h-2v-2zm1-6V7a4 4 0 1 0-8 0v1h8z" /></g></svg>;
}

function LoginPage() {
    const [userCookie, updateUserCookie] = useCookie("user", null);
    const navigateRoute = useAppNavigate();
    const dispatch = useAppDispatch();
    const [user, setUser] = useState<any>({ username: '', password: '' });
    const [error, setError] = useState({ id: '', text: '' })

    const onLoginClick = () => {
        if (!user.username) setError({ id: 'username', text: 'Please enter username' })
        else if (!user.password) setError({ id: 'password', text: 'Please enter password' })
        else if (user.username !== 'admin') setError({ id: 'incorrect', text: 'Incorrect username.' })
        else if (user.password !== "admin123") setError({ id: 'incorrect', text: 'Incorrect password.' })
        else {
            updateUserCookie(user);
            dispatch(updateUserData(user))
            dispatch(showSuccess(`Welcome back ${user.username}`))
        }
    }

    const onChangeValue = (value: any, from: string) => {
        setError({ id: '', text: '' });
        const userCopy = { ...user };
        userCopy[from] = value;
        setUser({ ...userCopy })
    }

    return (
        <div>
            <div className="login-page-wrap">
                <div className="page-content">
                    <div className="login-page-bg"></div>
                    <div className="login-form-wrap" onKeyPress={(e) => e.key === 'Enter' && onLoginClick()}>
                        <div className="respark-logo">
                            <img src={LOGO} />
                        </div>
                        <div className="heading">Welcome Back</div>
                        <div className="fullwidth loginfeilds">
                            <div className="input-wrap">
                                <div className="label">Username</div>
                                <div className='icon'>
                                    <BiUser />
                                </div>
                                <input className="inputBox" type="text" value={user.username} onChange={(e) => onChangeValue(e.target.value, 'username')} placeholder="Enter username" />
                            </div>
                        </div>
                        <div className="fullwidth loginfeilds">
                            <div className="input-wrap">
                                <div className="label">Password</div>
                                <div className='icon'>
                                    <RiLockPasswordLine />
                                </div>
                                <input className="inputBox" type="password" value={user.password} onChange={(e) => onChangeValue(e.target.value, 'password')} placeholder="Enter password" />
                            </div>
                        </div>
                        {error.id && <div className='err'>{error.text}</div>}
                        <div className="login-btn-wrap">
                            <button className="primary-btn" onClick={onLoginClick}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage