import menu from './../images/menu.png'
import meneOfThree from './../images/menu-of-three-lines.png'
import userAvatar from './../images/useravatar.png'

import styles from './Navbar.module.css'

import { useDispatch, useSelector } from 'react-redux';
import { changeStyles } from '../redux/stylesSlice';

const columnStyle = {
    notelist: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    noteitem: {
        width: '100%',
        padding: '15px',
        border: '2px solid rgb(103, 102, 102)',
        borderRadius: '10px',
        display: 'inline-block',
    }
}

const wrapStyle = {
    notelist : {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '10px',
    },
    noteitem: {
        width: '200px',
        padding: '15px',
        border: '2px solid rgb(103, 102, 102)',
        borderRadius: '10px',
        display: 'inline-block',
    }
}

const stylesAreEqual = (style1, style2) => {
    console.log(JSON.stringify(style1) === JSON.stringify(style2))
    return JSON.stringify(style1) === JSON.stringify(style2);
    
}

const Navbar = () => {

    const dispatch = useDispatch()
    const Style = useSelector(state => state.styles.interface)
    

    const changeInterface = () => {
        if (stylesAreEqual(Style, wrapStyle)) {
            dispatch(changeStyles(columnStyle))
        } else {
            dispatch(changeStyles(wrapStyle))
        }
        // console.log(Style)
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.navbarLeft}>
                <img src={meneOfThree} alt=""  />
                <span className="search">Искать в заметках</span>
            </div>
            <div className={styles.navbarRight}>
                <img src={menu} onClick={changeInterface} alt=""/>
                <img src={userAvatar} alt=""/>
            </div>
        </div>
    );
}
 
export default Navbar;