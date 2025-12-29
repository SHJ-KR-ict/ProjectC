import React, { useRef, useState } from 'react'
import Style from './Navbar.module.css'
import { NavLink } from 'react-router-dom';

const DropdownNavService: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const toggleDropdown = () => { setIsOpen((prev) => !prev) }
    const closeDropdown = () => { setIsOpen(false) }
    const linkClass = ({ isActive }: { isActive: boolean }) => isActive ? `${Style.link} ${Style.active}` : Style.link

    return (
        <div ref={dropdownRef} className={Style.dropdown}>
            <div onClick={toggleDropdown} className={Style.link} style={{font: 'icon', textDecoration: 'underline', textUnderlineOffset: '5px', fontWeight: 'bolder', paddingTop:'14px'}} >
                고객지원<span className={Style.arrow}>{isOpen ? '▲' : '▼'}</span>
            </div> 
            {isOpen && (<div className={Style.dropdownContent}>
                <NavLink to="/gongji" onClick={closeDropdown} className={linkClass}>
                    공지사항
                </NavLink>
                <NavLink to="/faq" onClick={closeDropdown} className={linkClass}>
                    고객상담
                </NavLink>
            </div>)}
        </div>
    )
}

export default DropdownNavService