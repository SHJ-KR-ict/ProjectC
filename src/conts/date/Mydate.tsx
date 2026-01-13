import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, ListGroup } from 'react-bootstrap';
import { AddressMap } from '../matching/Geocoding';

interface DateInfo {
    NUM: number;
    NICKNAME: string;
    BIRTH: string;
    PROFILEIMAGE: string;
    DATE_LOCATION: string;
}
// 부모의 setshow(모달 열고 닫는 상태 저장 usestate) 받아오기
interface MyDateProps {
    setShow: (show: boolean) => void;
}

const MyDate: React.FC<MyDateProps> = ({ setShow }) => {
    const [date, setDate] = useState<DateInfo | null>(null);
    const imageBasePath = `${process.env.REACT_APP_BACK_END_URL}/imgfile/profileimage/`;

    useEffect(() => {
        const fetchMyDate = async () => {
            try {
                const resp = await axios.get(`${process.env.REACT_APP_BACK_END_URL}/api/date/mydate`, {
                    withCredentials: true
                });
                setDate(resp.data[0]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMyDate();
    }, []);

    const CancelDate = async (nickname: string) => {
        if (!window.confirm("정말로 이 데이트를 취소하시겠습니까?")) return;
        try {
            const resp = await axios.post(`${process.env.REACT_APP_BACK_END_URL}/api/date/respond`,
                { nickname: nickname, action: 'reject' },
                { withCredentials: true }
            );
            if (resp.data === 'rejected') {
                alert("데이트가 취소되었습니다.");
                setShow(false); //취소시 모달 닫힘
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (!date) {
        return (
            <div className="p-4 text-center">
                <p className="text-muted">확정된 데이트 일정이 없습니다.</p>
                <Button variant="secondary" size="sm" onClick={() => setShow(false)}>닫기</Button>
            </div>
        );
    }

    return (
        <div className="p-2">
            {/* 상단 프로필 요약 */}
            <div className="d-flex align-items-center mb-3">
                <img
                    src={`${imageBasePath}${date?.PROFILEIMAGE}`}
                    alt=""
                    style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', marginRight: '12px' }}
                />
                <div>
                    <h6 className="mb-0 fw-bold">{date?.NICKNAME}님과의 Date</h6>
                </div>
            </div>

            {/* 지도 영역 */}
            <div style={{ width: '100%', height: '280px', marginBottom: '1rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid #ddd' }}>
                <AddressMap address={date?.DATE_LOCATION.split(',')[0] || ''} />
            </div>

            {/* 하단 상세 주소 및 취소 버튼 */}
            <div className="text-center">
                <p className="mb-1 fw-bold small">약속 장소</p>
                <p className="mb-3 small text-secondary">{date?.DATE_LOCATION.replace(',', ' ')}</p>
                <div className="d-grid gap-2">
                    <Button variant="danger" size="sm" onClick={() => { CancelDate(date?.NICKNAME || '') }}>
                        데이트 취소하기
                    </Button>
                    <Button variant="outline-secondary" size="sm" onClick={() => setShow(false)}>
                        닫기
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MyDate;