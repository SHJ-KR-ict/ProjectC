import React from 'react'
import style from './login.module.css'
import styles from '../signup/signup.module.css'
import { text } from 'stream/consumers'

const Login: React.FC = () => {
    const singupSubmit = () => { }
    const memberChange = () => { }
    return (
        <div className={styles.signupContainer}>
            <h2>Login</h2>
            <form className={styles.form} onSubmit={singupSubmit}>
                <label>아이디</label>
                <div className={styles.inputRow}>
                    <input type="text" name="username" id="username" onChange={memberChange} required />
                </div>

                <label>비밀번호</label>
                <input type="password" name="password" id="password" onChange={memberChange} required />

                <button type="submit" className={styles.submitButton}>로그인</button>
                <button type="submit" className={styles.submitButton}>패스워드리스 로그인</button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <a href="/signup" style={{ textDecoration: 'none' }}>회원가입 하기</a>
            </div>

            {/* 버튼 이미지와 함께 추가 */}
            <div className={style.buttonContainer}>

            <button className={style.imageButton}>
                <img src="/social/instagram.png" alt="Instagram" />
            </button>

            <button className={style.imageButton}>
                <img src="/social/x.jpg" alt="X" />
            </button>

            <button className={style.imageButton}>
                <img src="/social/kakaotalk.png" alt="KakaoTalk"/>
            </button>
            </div>
        </div>
    )
}

export default Login