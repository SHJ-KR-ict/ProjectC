import React, { useRef, useState } from 'react'
import Style from './Navbar.module.css'
import { NavLink } from 'react-router-dom';

const DropdownNav: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const toggleDropdown = () => { setIsOpen((prev) => !prev) }
    const closeDropdown = () => { setIsOpen(false) }
    const linkClass = ({ isActive }: { isActive: boolean }) => isActive ? `${Style.link} ${Style.active}` : Style.link

    return (
        <div ref={dropdownRef} className={Style.dropdown} style={{marginTop:14}}>
            <div onClick={toggleDropdown} className={Style.link} style={{font: 'icon', textDecoration: 'underline', textUnderlineOffset: '5px', fontWeight: 'bolder'}} >
                커뮤니티<span className={Style.arrow}>{isOpen ? '▲' : '▼'}</span>
            </div> 
            {isOpen && (<div className={Style.dropdownContent}>
                <NavLink to="/community/uplist" onClick={closeDropdown} className={linkClass}>
                    자유게시판
                </NavLink>
                <NavLink to="/gallery" onClick={closeDropdown} className={linkClass}>
                    자랑하기
                </NavLink>
            </div>)}
        </div>
    )
}

export default DropdownNav