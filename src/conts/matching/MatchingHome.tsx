import React from 'react'
import styles from './MatchingHome.module.css'
import { Link } from 'react-router-dom'

const MatchingHome: React.FC = () => {
    return (
        <div className={styles.container} style={{marginBottom:100}}>
            <h2 className={styles.title} style={{ fontWeight: 'bold', marginBottom: 30 }}>당신의 PICK은 무엇인가요?</h2>
            <div className={styles.grid}>
                <Link to={`/matchingHome/1`} style={{ textDecoration: 'none' }}>
                    <div className={styles.card}>
                        <img src={'/people/1.jpg'} alt='' />
                        <div className={styles.cardtitle} >이름, 나이</div>
                    </div>
                </Link>
                <Link to={`/matchingHome/2`} style={{ textDecoration: 'none' }}>
                    <div className={styles.card}>
                        <img src={'/people/2.jpg'} alt='' />
                        <div className={styles.cardtitle} >이름, 나이</div>
                    </div>
                </Link>
                <Link to={`/matchingHome/3`} style={{ textDecoration: 'none' }}>
                    <div className={styles.card}>
                        <img src={'/people/3.jpg'} alt='' />
                        <div className={styles.cardtitle} >이름, 나이</div>
                    </div>
                </Link>
                <Link to={`/matchingHome/4`} style={{ textDecoration: 'none' }}>
                    <div className={styles.card}>
                        <img src={'/people/4.jpg'} alt='' />
                        <div className={styles.cardtitle} >이름, 나이</div>
                    </div>
                </Link>
                <Link to={`/matchingHome/5`} style={{ textDecoration: 'none' }}>
                    <div className={styles.card}>
                        <img src={'/people/5.jpg'} alt='' />
                        <div className={styles.cardtitle} >이름, 나이</div>
                    </div>
                </Link>
                <Link to={`/matchingHome/6`} style={{ textDecoration: 'none' }}>
                    <div className={styles.card}>
                        <img src={'/people/6.jpg'} alt='' />
                        <div className={styles.cardtitle} >이름, 나이</div>
                    </div>
                </Link>
                <Link to={`/matchingHome/7`} style={{ textDecoration: 'none' }}>
                    <div className={styles.card}>
                        <img src={'/people/7.jpg'} alt='' />
                        <div className={styles.cardtitle} >이름, 나이</div>
                    </div>
                </Link>
                <Link to={`/matchingHome/8`} style={{ textDecoration: 'none' }}>
                    <div className={styles.card}>
                        <img src={'/people/8.jpg'} alt='' />
                        <div className={styles.cardtitle} >이름, 나이</div>
                    </div>
                </Link>
                <Link to={`/matchingHome/9`} style={{ textDecoration: 'none' }}>
                    <div className={styles.card}>
                        <img src={'/people/9.jpg'} alt='' />
                        <div className={styles.cardtitle} >이름, 나이</div>
                    </div>
                </Link>
                <Link to={`/matchingHome/10`} style={{ textDecoration: 'none' }}>
                    <div className={styles.card}>
                        <img src={'/people/10.jpg'} alt='' />
                        <div className={styles.cardtitle} >이름, 나이</div>
                    </div>
                </Link>
            </div>
            <div  style={{ textAlign: 'center', marginTop:30}}>
                <button className={styles.button}>다시 매칭하기</button>
            </div>
        </div>
    )
}

export default MatchingHome