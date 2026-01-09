import React, { useState } from 'react'
import style from './login.module.css'
import styles from '../signup/signup.module.css'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../comp/AuthProvider';

const Login: React.FC = () => {
    const [formData, setFormData] = useState ({ id: '', pwd: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    let from = '/';
    const state = location.state as { from?: Location | string};


    if (state?.from) {
        if(typeof state.from == 'string'){
            from = state.from; 
        } else if (typeof state.from === 'object'){
            from = (state.from as Location).pathname;
        }
         
    } else if (searchParams.get('from')) {
        from = searchParams.get('from')!;
    }

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitLogin = async () => { // 불러온 login함수로 아이디와 비밀번호를 전달해서 서버로부터
        // 데이터를 받아온 후 성공이면 success , 실패면 fail 등이 반환 된다.
        const result = await login(formData.id, formData.pwd);
        if (result === 'success') {
        setMessage('로그인 성공!');
        //{replace:true} 웹페이지 에서 로그인 이후 이동 하는 경로 , 뒤로 가기를 막아주는 역할 
        navigate(from, {replace:true});
        } else if (result === 'fail') {
        setMessage('아이디 또는 비밀번호가 틀렸습니다.');
        } else {
        setMessage('서버 오류');
        }
    };
    
    return (
        <div className={styles.signupContainer}>
            <h2>Login</h2>
            <form className={styles.form} onSubmit={(e) => {
                e.preventDefault();
                }}
            >
                <label>아이디</label>
                <div className={styles.inputRow}>
                    <input type="text" name="id" value={formData.id} onChange={inputChange} placeholder="id" required />
                </div>

                <label>비밀번호</label>
                <input type="password" name="pwd" value={formData.pwd} onChange={inputChange} placeholder="password" required />

                <button type="submit" onClick={submitLogin} className={styles.submitButton}>로그인</button>
                <button type="submit" className={styles.submitButton}>패스워드리스 로그인</button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <a href="/signup" style={{ textDecoration: 'none' }}>회원가입 하기</a>
            </div>


            {/* sns api */}
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
    );
};

export default Login