import React, { useState } from 'react'
import style from './signup.module.css'

/* 회원가입 */

const Signup: React.FC = () => {

    const [form, setForm] = useState({
        name: '',
        nickname: '',
        id: '',
        password: '',
        pwdcheck: '',
        email: '',  
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [idChecked, setIdChecked] = useState(false);
    const [nicknameChecked, setNicknameChecked] = useState(false);
    const [emailChecked, setEmailChecked] = useState(false);

    const validate = () => {
        const newErrors : {[key:string] : string} = {};

        if(!form.name) newErrors.name = '이름을 입력하세요';

        if (!form.nickname) newErrors.nickname = '닉네임을 입력하세요';
        if (!nicknameChecked) newErrors.nicknameCheck = '닉네임 중복 확인은 필수입니다.';

        if (!form.id) newErrors.id = '아이디를 입력하세요.';
        if (!idChecked) newErrors.idCheck = '아이디 중복 확인은 필수입니다.';

        if (!form.email) newErrors.email = '이메일을 입력하세요';
        if (!emailChecked) newErrors.emailCheck = '이메일 중복 확인은 필수입니다.'

        if (!form.password || form.password.length < 6)
            newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다.';
        if (!form.pwdcheck || form.pwdcheck.length < 6)
            newErrors.pwdcheck = '올바른 비밀번호를 입력하세요.';
        
        return newErrors;
    }

    const dummyNickname = ['테스형', '테스', '엑스맨'];
    const dummyId = ['admin', 'tess', 'ictuser']
    const dummyEmail = ['admin@naver.com', 'tess@naver.com', 'ictuser@naver.com']
    
    const memberChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const { name, value, type } = e.target;

        if (type === 'checkbox') {

            let checked = (e.target as HTMLInputElement).checked;
            console.log("Checkbox :" +checked+ ":" +value);
            console.log({ [name]: checked ? value : [name].filter(h => h !== value)});

        } else {
            console.log("Checkbox가 아닙니다.");
            console.log(`name => ${name} , value => ${value}`);

            setForm(prev => ({...prev, [name]: value}));
        }
    }

    const checkNickname = () => {
        console.log(`nickname값 => ${form.nickname.trim()}`);
        if (!form.nickname.trim()) {
            alert("닉네임을 입력하세요!");
            return;
        }

        console.log(`nicknameCheck => ${dummyNickname.includes(
            form.nickname.trim().toLowerCase())}`);
            if (dummyNickname.includes(form.nickname.trim().toLowerCase())) {
                alert("이미 존재하는 닉네임 입니다.");
                setNicknameChecked(false);
            } else {
                alert("사용 가능한 닉네임입니다.");
                setNicknameChecked(true);
            }
    }

    const checkId = () => {
        console.log(`id값 => ${form.id.trim()}`);
        if (!form.id.trim()) {
            alert("아이디를 입력하세요!");
            return;
        }

        console.log(`IdCheck => ${dummyId.includes(
            form.id.trim().toLowerCase())}`);
            if (dummyId.includes(form.id.trim().toLowerCase())) {
                alert("이미 존재하는 아이디 입니다.");
                setIdChecked(false);
            } else {
                alert("사용 가능한 아이디입니다.");
                setIdChecked(true);
            }
    }

    const checkEmail = () => {
        console.log(`email값 => ${form.email.trim()}`);
        if (!form.email.trim()) {
            alert("이메일를 입력하세요!");
            return;
        }

        console.log(`EmailCheck => ${dummyEmail.includes(
            form.email.trim().toLowerCase())}`);
            if (dummyEmail.includes(form.email.trim().toLowerCase())) {
                alert("이미 존재하는 이메일 입니다.");
                setEmailChecked(false);
            } else {
                alert("사용 가능한 이메일입니다.");
                setEmailChecked(true);
            }
    }
    
    const singupSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const myErrors = validate();
        if (Object.keys(myErrors).length > 0) {
            console.log(Object.keys(myErrors));
            setErrors(myErrors);

        } else {
            console.log("");
        }
    }

    return (
        <div className={style.signupContainer}>
            <h2>Signup</h2>
            <form className={style.form} onSubmit={singupSubmit}>

                <label>이름</label>
                    <input type="name" name="name" id="name" onChange={memberChange}/>
                    {errors.name && <p className={style.error}>{errors.name}</p>}

                <label>닉네임</label>
                    <div className={style.inputRow}>
                        <input type="text" name="nickname" id="nickname" onChange={memberChange}/>
                        <button type="button" className={style.checkButton} onClick={checkNickname}>중복 확인</button>
                    </div>
                    {errors.nickname && <p className={style.error}>{errors.nickname}</p>}
                    {errors.nicknameCheck && <p className={style.error}>{errors.nicknameCheck}</p>}

                <label>아이디</label>
                    <div className={style.inputRow}>
                        <input type="text" name="username" id="username" onChange={memberChange}/>
                        <button type="button" className={style.checkButton} onClick={checkId}>중복 확인</button>
                    </div>
                    {errors.id && <p className={style.error}>{errors.id}</p>}
                    {errors.idCheck && <p className={style.error}>{errors.idCheck}</p>}

                <label>비밀번호</label>
                    <input type="password" name="password" id="password" onChange={memberChange}/>
                    {errors.password && <p className={style.error}>{errors.password}</p>}

                <label>비밀번호 확인</label>
                    <input type="pwdcheck" name="pwdcheck" id="pwdcheck" onChange={memberChange}/>
                    {errors.pwdcheck && <p className={style.error}>{errors.pwdcheck}</p>}    

                <label>이메일</label>
                    <div className={style.inputRow}>
                        <input type="text" name="email" id="email" onChange={memberChange}/>
                        <button type="button" className={style.checkButton} onClick={checkEmail}>중복 확인</button>
                    </div>
                    {errors.email && <p className={style.error}>{errors.email}</p>}
                    {errors.emailCheck && <p className={style.error}>{errors.emailCheck}</p>}

                <button type='submit' className={style.submitButton}>가입하기</button>
            </form>
        </div>
    )
}

export default Signup