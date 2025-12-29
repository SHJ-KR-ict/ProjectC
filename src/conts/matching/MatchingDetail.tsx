import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './MatchingHome.module.css'

const MatchingDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const nav = () => {
        navigate("/matchingHome")
    }
    return (
        <div style={{marginBottom:80}}>
            <div className={styles.card} style={{ width: '500px',height:'600px',margin: '0 auto', textAlign: 'center', background:`url(/people/${id}.jpg)`,backgroundSize:'cover',backgroundRepeat:'no-repeat' }}>
            </div>
            <br />
             <div style={{ textAlign: 'center' }}>
                <button className={styles.likebutton}>Like</button>
            </div>
            <br />
            <div style={{ textAlign: 'center' }}>
                <button className={styles.button} onClick={nav}>돌아가기</button>
            </div>
        </div>
    )
}

export default MatchingDetail