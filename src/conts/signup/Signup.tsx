import React, { useState } from 'react'
import style from './signup.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/* 회원가입 */

interface MemberForm {
    username: string;
    nickname: string;
    id: string;
    pwd: string;
    email: string;
    regDate?: string;
}

const Signup: React.FC = () => {

    const [form, setForm] = useState<MemberForm> ({
        username: '',
        nickname: '',
        id: '',
        pwd: '',
        email: '',  
    });

    const [code, setCode] = useState('');

    const [nicknameMessage, setNicknameMessage] = useState('');
    const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);

    const [idMessage, setIdMessage] = useState('');
    const [isIdAvailable, setIsIdAvailable] = useState(false);

    const [pwdConfirm, setPwdConfirm] = useState('');
    const [pwdMessage, setPwdMessage] = useState('');
    const [isPwdMatched, setIsPwdMatched] = useState(false);

    const [emailMessage, setEmailMessage] = useState('');
    const [isEmailAvailable, setIsEmailAvailable] = useState(false);

    const [codeMessage, setCodeMessage] = useState('');
    const [isCodeAvailable, setIsCodeAvailable] = useState(false);

    const navigate = useNavigate();
    const urls = `${process.env.REACT_APP_BACK_END_URL}`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        if (name === 'nickname') { setNicknameMessage(''); setIsNicknameAvailable(false); }
        if (name === 'id') { setIdMessage(''); setIsIdAvailable(false); }
        if (name === 'pwd') { setPwdMessage(''); }
        if (name === 'email') { setEmailMessage(''); setIsEmailAvailable(false); }
        if (name === 'code') { setCodeMessage(''); setIsCodeAvailable(false); }
    };

    const nicknameCheck = async () => {
        if (!form.nickname.trim()) {
            setNicknameMessage('닉네임을 입력해 주세요.');
            setIsNicknameAvailable(false);
            return;
        }

       try {
            const res = await axios.get(`${urls}/member/nicknameCheck?nickname=${form.nickname}`);
            if (res.data === 0) {
              setNicknameMessage('사용 가능한 닉네임입니다.');
              setIsNicknameAvailable(true);
              
            } else {
              setNicknameMessage('이미 사용 중인 닉네임입니다.');
              setIsNicknameAvailable(false);
            }
        } catch (err) {
            alert('닉네임 중복 확인 실패');
            console.error(err);
        }
    };

    const idCheck = async () => {
        if (!form.id.trim()) {
            setIdMessage('아이디를 입력해 주세요.');
            setIsIdAvailable(false);
            return;
        }

       try {
            const res = await axios.get(`${urls}/member/idCheck?id=${form.id}`);
            if (res.data === 0) {
              setIdMessage('사용 가능한 아이디입니다.');
              setIsIdAvailable(true);
              
            } else {
              setIdMessage('이미 사용 중인 아이디입니다.')
              setIsIdAvailable(false);
            }
        } catch (err) {
            alert('아이디 중복 확인 실패');
            console.error(err);
        }
    };

    const handlePwdConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPwdConfirm(value);

        if (!value) {
            setPwdMessage('');
            setIsPwdMatched(false);
            return;
        }

        if (value !== form.pwd) {
            setPwdMessage('비밀번호가 맞지 않습니다.');
            setIsPwdMatched(false);
        } else {
            setPwdMessage('비밀번호가 일치합니다.');
            setIsPwdMatched(true);
        }
    };

    const emailCheck = async () => {

        if (!form.email.trim()) {
            setEmailMessage('이메일을 입력해 주세요.');
            setIsEmailAvailable(false);
            return;
        }

        try {
            const res = await axios.post(`${urls}/api/auth/emailCheck`, {
                email: form.email, });
            if (res.data === 0) {alert('인증 번호가 발송되었습니다.');
                setEmailMessage('사용 가능한 이메일입니다.');
                setIsEmailAvailable(true);
            } else {
                setEmailMessage('이미 사용 중인 이메일입니다.');
                setIsEmailAvailable(false);
            }
            
        } catch (err) {
            alert('이메일 인증 중 오류 발생');
            console.error(err);
        }
        
    };

    const checkEmailCode = async () => {
        try {
            const res = await axios.post(`${urls}/api/auth/emailCheck/certification`, {
                email: form.email, code: code });
            
            const result = res.data;

            if (result.success) {
                setCodeMessage('이메일 인증이 완료되었습니다.');
                setIsCodeAvailable(true);

            } else {
                if (result.reason === 'exceeded') {
                    setCodeMessage('3회 이상 인증번호를 틀려 더 이상 시도할 수 없습니다. \n 다시 인증번호를 요청하세요.');
                    setIsCodeAvailable(false);

                } else if (result.reason === 'expired') {
                    setCodeMessage('인증번호 유효 시간이 만료되었습니다. \n 다시 인증번호를 요청하세요.');
                    setIsCodeAvailable(false);

                } else if (result.reason === 'wrong') {
                    setCodeMessage('인증번호가 일치하지 않습니다.');
                    setIsCodeAvailable(false);
                }   
            }

        } catch (err) {
            alert('인증번호 확인 오류');
            console.error(err);
        }
    };

    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formdata = new FormData()
                formdata.append('username', form.username);
                formdata.append('nickname', form.nickname);
                formdata.append('id', form.id);
                formdata.append('pwd', form.pwd);
                formdata.append('email', form.email);
            
            await axios.post(`${urls}/member/signup`, formdata);
            alert('회원가입이 완료되었습니다.');
            navigate('/');

        } catch (error) {
            console.error('회원가입 오류', error);
            alert('회원가입 실패');    
        }
    }
    

    return (
        <div className={style.signupContainer}>
        <form onSubmit={handleSubmit} className={style.form}>
        <h2>회 원 가 입</h2>
        <div className={style.formBody}>

            {/* 이름 */}
            <div className={style.fieldset}>
                <label htmlFor="username">이름</label>
                    <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    />
            </div>


            {/* 닉네임 */}
            <div className={style.fieldset}>
                <label htmlFor="nickname">닉네임</label>
                <div className={style.inputRow}>
                    <input
                    type="text"
                    name="nickname"
                    value={form.nickname}
                    onChange={handleChange}
                    required
                    />
                </div>
            </div>
            <button type="button" className={style.checkButton} onClick={nicknameCheck}>중복확인</button>
            {nicknameMessage && ( <p className={isNicknameAvailable ? style.success : style.error}> {nicknameMessage}</p> )}
            

            {/* 아이디 */}
            <div className={style.fieldset}>
                <label htmlFor="id">아이디</label>
                <div className={style.inputRow}>
                    <input
                        type="text"
                        name="id"
                        value={form.id}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <button type="button" className={style.checkButton} onClick={idCheck}>중복확인</button>
            {idMessage && ( <p className={isIdAvailable ? style.success : style.error}> {idMessage}</p> )}
            

            {/* 비밀번호 */}
            <div className={style.fieldset}>
                <label htmlFor="pwd">비밀번호</label>
                <input
                    type="password"
                    name="pwd"
                    value={form.pwd}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* 비밀번호 확인 */}
            <div className={style.fieldset}>
                <label htmlFor="pwdConfirm">비밀번호 확인</label>
                <input
                    type="password"
                    name="pwdConfirm"
                    value={pwdConfirm}
                    onChange={handlePwdConfirmChange}
                    required
                />
            </div>
            {pwdMessage && ( <p className={isPwdMatched ? style.success : style.error}> {pwdMessage}</p> )}

            {/* 이메일 */}
            <div className={style.fieldset}>
                <label htmlFor="email">이메일</label>
                <div className={style.inputRow}>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <button type="button" className={style.checkButton} onClick={emailCheck}>인증</button>
            {emailMessage && ( <p className={isEmailAvailable ? style.success : style.error}> {emailMessage}</p>) }
        

            {/* 인증번호 */}
            <div className={style.fieldset}>
                <label htmlFor="code">인증번호</label>
                <div className={style.inputRow}>
                    <input
                    type="text"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    />
                </div>
            </div>
            <button type="button" className={style.checkButton} onClick={checkEmailCode}>확인</button>
            {codeMessage && ( <p className={isCodeAvailable ? style.success : style.error}> {codeMessage}</p>) }

            {/* 버튼 */}
            <div className={style.buttonRow}>
            <button type="button" className={style.backButton} onClick={() => navigate(-1)}>뒤 로 가 기</button>

            <button type="submit" className={style.joinButton}>가 입 하 기</button>
            </div>
        </div>
    </form>
    </div> 
    )
}

export default Signup