import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

interface Member {
    userid: string;
    nickname: string;
    email: string;
}

interface AuthContextProps {
    member: Member | null;
    checkLogin: () => void;
    isLoggedIn: boolean;
    login: (userid: string, password: string) => Promise<'success' | 'fail' | 'error'>;
    logout: () => void;
    updateMemberName: (nickname: string) => void;
    updateMemberEmail: (email: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [member, setMember] = useState<Member | null>(null);
    const checkLogin = async () => {
        //http://192.168.0./myictstudy/api/login/session
        const url = `${process.env.REACT_APP_BACK_END_URL}/api/login/session`;
        try {
            const res = await axios.get(url, {
                withCredentials: true
            });
            if (res.data?.userid) {
                console.log("데이터 있음")
                setMember(res.data);
            } else {
                console.log("데이터 없음")
                setMember(null);
            }
        } catch (error) {
            setMember(null);
        }
    }
    const login = async (userid: string, password: string): Promise<'success' | 'fail' | 'error'> => {
        const url = `${process.env.REACT_APP_BACK_END_URL}/api/login/dologin`;
        try {
            const res = await axios.post(url, { userid, password }, { withCredentials: true });
            if (res.data === 'success') {
                await checkLogin();
                return 'success'
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
        })
        setMember(null);
    }
    useEffect(() => { checkLogin(); }, []);

    const updateMemberName = (name: string) => { setMember(prev => (prev ? { ...prev, name } : prev)); }
    const updateMemberEmail = (email: string) => { setMember(prev => (prev ? { ...prev, email } : prev)); }
    const isLoggedIn = member !== null;
    return (
        <AuthContext.Provider value={{ member, checkLogin, isLoggedIn, login, logout, updateMemberName, updateMemberEmail }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth는 AuthProvider 안에서 사용되어야 합니다.');
    return context;
}

