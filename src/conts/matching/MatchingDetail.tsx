import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './MatchingHome.module.css'
import axios from 'axios';

interface MatchingVO {
    num: number;
    nickname: string;
    birth: string;
    profileimage: string;
}

const MatchingDetail: React.FC = () => {
    const [matchingDetail, setMatchingDetail] = useState<MatchingVO>();
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);
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
                console.log(imageBasePath + matchingDetail?.profileimage);
                setMatchingDetail(resp.data);
            } catch (error) {
                console.log("데이터 요청 실패: ", error)
            } finally {
                setLoading(false);
            }

        }
        fetchData();
    }, [id]);


    return (
        <div style={{ marginBottom: 80 }}>
            <div className={styles.card} style={{ width: '500px', height: '600px', margin: '0 auto', textAlign: 'center' }}>
                <img src={imageBasePath + matchingDetail?.profileimage} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <br />
            <div style={{ textAlign: 'center' }}>
                <button className={styles.likebutton}>Like</button>
            </div>
            <br />
            <div style={{ textAlign: 'center' }}>
                <button className={styles.button} onClick={() => { navigate(-1) }}>돌아가기</button>
            </div>
        </div>
    )
}

export default MatchingDetail