import React, { useState } from 'react'
import style from './login.module.css'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../comp/AuthProvider';

const Login: React.FC = () => {
    const [formData, setFormData] = useState({ id: '', pwd: '' });
    const [errors, setErrors] = useState<{ id?: string; pwd?: string }>({});
    const navigate = useNavigate();
    const { login } = useAuth();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    let from = '/';
    const state = location.state as { from?: Location | string };


    if (state?.from) {
        if (typeof state.from == 'string') {
            from = state.from;
        } else if (typeof state.from === 'object') {
            from = (state.from as Location).pathname;
        }

    } else if (searchParams.get('from')) {
        from = searchParams.get('from')!;
    }

    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        // 다시 입력하면 해당 필드 에러만 초기화
        setErrors(prev => ({
            ...prev,
            [name]: undefined,
        }));
    };

    const submitLogin = async () => {
        const newErrors: { id?: string; pwd?: string } = {};
        if (!formData.id.trim()) {
            newErrors.id = '아이디를 입력해주세요.';
        }

        if (!formData.pwd.trim()) {
            newErrors.pwd = '비밀번호를 입력해주세요.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const result = await login(formData.id, formData.pwd);
        if (result === 'success') {
            setErrors({});

            navigate(from, { replace: true });
        } else if (result === 'fail') {
            setErrors({
                pwd: '아이디나 비밀번호가 틀렸습니다.',
            });

        } else {
            alert('서버 오류');
        }
    };

    return (
        <div className={style.signupContainer}>
            <h2>Login</h2>
            <form className={style.form} onSubmit={(e) => {
                e.preventDefault();
            }}
            >
                <label>아이디</label>
                <div className={style.inputGroup}>
                    <input
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={inputChange}
                        placeholder="id"
                    />
                    {errors.id && <p className={style.error}>{errors.id}</p>}
                </div>

                <label>비밀번호</label>
                <div className={style.inputGroup}>
                    <input
                        type="password"
                        name="pwd"
                        value={formData.pwd}
                        onChange={inputChange}
                        placeholder="password"
                    />
                    {errors.pwd && <p className={style.error}>{errors.pwd}</p>}
                </div>

                <button type="submit" onClick={submitLogin} className={style.loginButton}>로그인</button>
                <button type="submit" className={style.pwdlessButton}>패스워드리스 로그인</button>
                <div style={{ textAlign: 'center' }}>아직 계정이 없으신가요?</div>
                <button type="submit" className={style.signupButton} onClick={() => window.location.href = '/signup'}>회원가입 하기</button>
            </form>
        </div>
    );
};

export default Login