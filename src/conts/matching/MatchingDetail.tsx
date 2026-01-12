import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './MatchingHome.module.css'
import axios from 'axios';
import { useAuth } from '../../comp/AuthProvider';

interface MatchingVO {
    num: number;
    nickname: string;
    birth: string;
    profileimage: string;
}

const MatchingDetail: React.FC = () => {
    const [matchingDetail, setMatchingDetail] = useState<MatchingVO>();
    const { member } = useAuth();
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);
    const [members, setMembers] = useState<any[]>([]);

    const [incoming, setIncoming] = useState<any[]>([]);
    const [friends, setFriends] = useState<any[]>([]);
    const [outgoing, setOutgoing] = useState<any[]>([]);
    const [rejected, setRejected] = useState<Set<string>>(new Set());
    const [refresh, setRefresh] = useState(0);
    const imageBasePath = `${process.env.REACT_APP_BACK_END_URL}/imgfile/profileimage/`;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                console.error("id parameter가 없습니다");
                setLoading(false);
                return;
            }
            try {
                const url = `${process.env.REACT_APP_BACK_END_URL}/matching/matchingdetail`;
                const resp = await axios.get(url, {
                    params: { num: parseInt(id) }
                });
                console.log(resp.data);
                setMatchingDetail(resp.data);
            } catch (error) {
                console.log("데이터 요청 실패: ", error)
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const sendRequest = async () => {
        const receiverId = matchingDetail?.nickname;
        await axios.post(`${process.env.REACT_APP_BACK_END_URL}/api/like/request`, { receiverId }, { withCredentials: true });
        alert("Like 신청 완료");
        setRefresh(prev => prev + 1);
    }

    return (
        <div style={{ marginBottom: 80 }}>
            <div className={styles.card} style={{ width: '500px', height: '600px', margin: '0 auto', textAlign: 'center' }}>
                <img src={imageBasePath + matchingDetail?.profileimage} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <br />
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
                    {matchingDetail?.nickname}
                </span>
            </div>
            <div style={{ textAlign: 'center' }}>
                <button className={styles.likebutton} onClick={sendRequest} style={{ fontSize: 'x-large', padding: '10px 20px' }}>Like</button>
            </div>
            <br />
            <div style={{ textAlign: 'center' }}>
                <button className={styles.button} onClick={() => { navigate(-1) }}>돌아가기</button>
            </div>
            {
                !loading&&<div>로딩 중 입니다...</div>
            }
        </div>
    )
}

export default MatchingDetail