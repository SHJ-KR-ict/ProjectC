import React from 'react'
import './headers.css'
import DropdownNav from './DropdownNav'
import DropdownNavService from './DropdownNavService'
import { useNavigate } from 'react-router-dom'
import DropdownChart from '../conts/chart_ui/DropdownChart'


interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const navigate = useNavigate();

    const loginNav = () => {
        navigate("/login")
    }
    return (

        <div>
            <header>
                <div className="header">
                    <div className="container">
                        <div className="d-flex flex-wrap align-items-center justify-content-lg-start" style={{ justifyContent: 'center' }}>
                            <a href="/"><img src="/image/header.png" alt="" style={{marginTop: '13px', width:'200px',marginRight:'450px'}}/></a>
                            <ul className="nav col-12 col-lg-auto my-2 my-md-0" style={{ justifyContent: 'center', marginLeft: 10 }}>
                                <li>
                                    <a href="/" className="nav-link text-white" style={{ font: 'icon', textDecoration: 'underline', textUnderlineOffset: '5px', fontWeight: 'bolder', paddingTop: '22px' }}>
                                        홈
                                    </a>
                                </li>
                                <li>
                                    <DropdownNav />
                                </li>
                                <li>
                                    <a href="/fortune" className="nav-link text-white" style={{ font: 'icon', textDecoration: 'underline', textUnderlineOffset: '5px', fontWeight: 'bold', paddingTop: '22px' }}>
                                        오늘의 운세
                                    </a>
                                </li>
                                <li>
                                    <DropdownChart />
                                </li>
                                <li>
                                    <DropdownNavService />
                                </li>
                            </ul>
                            <div className="text-end">
                                <button type="button" className="login-btn" onClick={loginNav}>Login</button> <a href="/alarm"><img src="/home/alarm.jpg" alt="1" style={{ width: '45px', paddingLeft: '8px' }} /></a>
                                <a href="/mypage"><img src="/imgs/Default_user.jpg" alt="1" style={{ marginLeft: '13px', border: '3px solid #ddd', borderRadius: '50%', width: '45px' }} /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-3 py-2 border-bottom mb-3">
                </div>
            </header>

            <main>{children}</main>

            <footer>
                <div style={{ color: '#000', padding: '1px', borderRadius: '0 0 8px 8px', textAlign: 'center' }}>
                    @ 2025 ICTPassword
                </div>
            </footer>
        </div>
    )
}

export default Layout