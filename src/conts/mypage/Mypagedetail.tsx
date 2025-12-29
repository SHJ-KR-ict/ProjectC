import React, { useState } from 'react'
import style from './mypage.module.css'

const Mypagedetail: React.FC = () => {

const [form, setForm] = useState({
    name: "",
    nickname: "",
    birth: "",
    country: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const { name, value } = e.target;
setForm({ ...form, [name]: value });
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

if (form.password !== form.passwordConfirm) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
}

console.log("수정된 계정 정보:", form);
alert("계정 정보가 수정되었습니다.");
};

return (
    
    <div className={style.container}>
        <h2 className={style.title}>계정 설정</h2>
            <form onSubmit={handleSubmit} className={style.form}>
                <label className={style.label}></label>
                <table className={style.input} style={{margin:'0 auto'}}> 
                    <tbody>
                        <tr>
                            <th>이름</th>
                            <td><input type="text" name="name" value={form.name} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <th>닉네임</th>
                            <td><input type="text" name="nickname" value={form.nickname} onChange={handleChange} /></td>
                        </tr>                      
                        <tr>
                            <th>생년월일</th>
                            <td><input type="text" name="birth" value={form.birth} onChange={handleChange} /></td>
                        </tr>                     
                        <tr>
                            <th>국가</th>
                            <td><input type="text" name="country" value={form.country} onChange={handleChange} /></td>
                        </tr>                    
                       <tr>
                            <th>이메일 주소</th>
                            <td><input type="text" name="email" value={form.email} onChange={handleChange} /></td>
                        </tr>                      
                        <tr>
                            <th>아이디</th>
                            <td><input type="text" name="username" value={form.username} onChange={handleChange} /></td>
                        </tr>                      
                        <tr>
                            <th>비밀번호</th>
                            <td><input type="text" name="password" value={form.password} onChange={handleChange} /></td>
                        </tr>                   
                        <tr>
                            <th>비밀번호 확인</th>
                            <td><input type="text" name="passwordConfirm" value={form.passwordConfirm} onChange={handleChange} /></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={2}>
                                <button type="submit" className={style.button}>정보 수정</button>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </form>
        </div>
    )
}

export default Mypagedetail