import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

interface Member {
    username: string;
    nickname: string;
    id: string;
    email: string;
}

interface AuthContextProps {
    member: Member | null;
    checkLogin: () => void;
    isLoggedIn: boolean;
    login: (id: string, pwd: string) => Promise<'success' | 'fail' | 'error'>;
    logout: () => void;
    updateMemberName: (nickname: string) => void;
    updateMemberEmail: (email: string) => void;
}

// 컨텍스트 생성
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// 로그인 상태를 체크 해주는 함수
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [member, setMember] = useState<Member | null>(null);

    const checkLogin = async () => {

        // ${process.env.REACT_APP_BACK_END_URL}/api/login/session
        // withCredentials : true server와의 session 통신
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACK_END_URL}/api/login/session`, {
                withCredentials: true
            });
            if (res.data.nickname) {
                setMember(res.data);// 데이터 저장
                console.log(res.data);
            } else {
                setMember(null);
                console.log('data 없음')
            }
        } catch (error) {
            setMember(null);
            console.error(error);
        }
    }

    const login = async (id: string, pwd: string):
        Promise<'success' | 'fail' | 'error'> => {

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACK_END_URL}/api/login/dologin`,
                { id, pwd }, { withCredentials: true });
            if (res.data === 'success') {
                // 로그인 성공 했으니 상태 정보를 불러오는 메서드를 호출
                await checkLogin();
                return 'success';
            } else {
                return 'fail';
            }
        } catch (error) {
            return 'error';
        }
    }

    const logout = async () => {
        await axios.get(`${process.env.REACT_APP_BACK_END_URL}/api/login/dologout`, {
            withCredentials: true
        });
        setMember(null);
    }

    // 랜더링 시 useEffect를 사용해서 초기화
    useEffect(() => { checkLogin(); }, []);

    const updateMemberName = (nickname: string) => {
        setMember(prev => (prev ? { ...prev, nickname } : prev));
    }
    const updateMemberEmail = (email: string) => {
        setMember(prev => (prev ? { ...prev, email } : prev));
    }
    const isLoggedIn = member !== null;

    return (
        <AuthContext.Provider value={{ member, isLoggedIn, checkLogin, login, logout, updateMemberName, updateMemberEmail }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('AuthContext 은 AuthProvider 안에서만 사용해야 합니다.');
    return context;
}