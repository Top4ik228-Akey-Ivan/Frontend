import { useSelector, useDispatch } from 'react-redux'
import { selectIsAuth, logout } from "../../redux/slices/auth";
import { useNavigate, Link } from 'react-router-dom';

import styles from './header.module.css'

import classNames from 'classnames';

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)
    const me = useSelector(state => state.auth.data)
    

    const login = () => {
        navigate('login')
    }
    const register = () => {
        navigate('register')
    }

    const handleLogout = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        navigate('/login')
    }
    return (
    <div className={styles.header_background}>
        <div className={classNames(styles.header, styles.container)}> 
            <div className={styles.messangerName}>Месседжер Ивана</div>
            {isAuth ? (
                <div className={styles.login}>
                    <Link to='/profile'>
                        <img src={me.avatarUrl} alt="avatar" className='avatar__img'/>
                    </Link>
                    <button className={styles.login_btn} onClick={handleLogout}>Выйти</button>
                </div>
            ) : (
                <div className={styles.login}>
                    <button className={styles.login_btn} onClick={login}>Login</button>
                    <button className={styles.sign_up_btn} onClick={register}>Sign Up</button>
                </div>
            )} 
        </div>
    </div>
    );
}
 
export default Header;