import { Link } from "react-router-dom";
import styles from './services.module.scss'

import profile from '../../images/services/user.png'
import lenta from '../../images/services/news.png'
import messanger from '../../images/services/messanger.png'
import calls from '../../images/services/telephone.png'
import friends from '../../images/services/friends.png'
import photos from '../../images/services/picture.png'
import music from '../../images/services/music.png'
import videos from '../../images/services/play.png'

const Services = () => {
    return (
        <div className={styles.services}>
            <ul>
                <li className={styles.services__li}>
                    <img src={profile} alt="" />
                    <Link className={styles.services__link} to=''>Профиль</Link>
                </li>
                <li className={styles.services__li}>
                    <img src={lenta} alt="" />
                    <Link className={styles.services__link} to=''>Лента</Link>
                </li>
                <li className={styles.services__li}>
                    <img src={messanger} alt="" />
                    <Link className={styles.services__link} to=''>Мессенджер</Link>
                </li>
                <li className={styles.services__li}>
                    <img src={calls} alt="" />
                    <Link className={styles.services__link} to=''>Звонки</Link>
                </li>
                <li className={styles.services__li}>
                    <img src={friends} alt="" />
                    <Link className={styles.services__link} to=''>Друзья</Link>
                </li>
                <li className={styles.services__li}>
                    <img src={photos} alt="" />
                    <Link className={styles.services__link} to=''>Фото</Link>
                </li>
                <li className={styles.services__li}>
                    <img src={music} alt="" />
                    <Link className={styles.services__link} to=''>Музыка</Link>
                </li>
                <li className={styles.services__li}>
                    <img src={videos} alt="" />
                    <Link className={styles.services__link} to=''>Видео</Link>
                </li>
            </ul>
        </div>
    );
}
 
export default Services;