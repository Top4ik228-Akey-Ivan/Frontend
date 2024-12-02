import { useSelector, useDispatch } from 'react-redux'
import { selectIsAuth, logout } from "../../redux/slices/auth";
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)
    

    const login = () => {
        navigate('login')
    }

    const handleLogout = () => {
        dispatch(logout())
    }
    return (
<div className="Header"> 
    {isAuth ? (
        <>
            <button onClick={handleLogout}>Выйти</button>
            <button>Выйти</button>
        </>
    ) : (
        <>
            <button onClick={login}>Войти</button>
            <button>Зарегистрироваться</button>
        </>
    )} 
</div>
    );
}
 
export default Header;