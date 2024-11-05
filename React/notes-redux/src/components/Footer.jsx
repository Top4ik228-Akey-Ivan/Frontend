import React from 'react';
import { Link } from 'react-router-dom';


import plus from './../images/plus.png'

import styles from './Footer.module.css'

const Footer = () => {



    return (
        <div className={styles.footer}>
            <Link to="/newNote" className={styles.imgBox}>
                <img src={plus} alt="" />
            </Link>
        </div>
    );
}
 
export default Footer;