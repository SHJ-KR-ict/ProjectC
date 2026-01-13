import React, { useEffect, useState } from 'react'
import styles from './MatchingHome.module.css'
import Chart from '../chart_ui/Chart';
import { Button, Modal } from 'react-bootstrap';
import Map from '../map/Map';
import axios from 'axios';
import { useAuth } from '../../comp/AuthProvider';
import { AddressMap } from './Geocoding';

interface MemberProfile {
  NUM: number;
  NICKNAME: string;
  BIRTH: string;
  PROFILEIMAGE: string;
  ID: number;
  DATE_LOCATION?: string;
}

const Alarm: React.FC = () => {
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [likeprofile, setLikeProfile] = useState<MemberProfile[]>([]);
  const [dateprofile, setDateProfile] = useState<MemberProfile[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { member } = useAuth();
  const imageBasePath = `${process.env.REACT_APP_BACK_END_URL}/imgfile/profileimage/`;

  //alarm 첫 화면 마운트 시
  useEffect(() => {
    setCategory('like');
  }, []);

  //나이 함수
  const getAge = (birth: string): number => {
    const birthDate = new Date(birth);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // category 바뀔때마다 재 요청
  useEffect(() => {
    const fetchData = async () => {
      if (category === 'like') {
        try {
          const url = `${process.env.REACT_APP_BACK_END_URL}/api/like/incoming`;
          const resp = await axios.get(url, {
            withCredentials: true
          });
          console.log(resp.data);
          const exceptme = resp.data.filter((req: any) => req.NICKNAME !== member?.nickname);
          console.log(exceptme);
          setLikeProfile(exceptme);
        } catch (error) {
          console.log("데이터 요청 실패: ", error)
        } finally {
          setLoading(false);
        }
      } else if (category === 'date') {
        try {
          const url = `${process.env.REACT_APP_BACK_END_URL}/api/date/incoming`;
          const resp = await axios.get(url, {
            withCredentials: true
          });
          console.log(resp.data);
          setDateProfile(resp.data);
        } catch (error) {
          console.log("데이터 요청 실패: ", error)
        } finally {
          setLoading(false);
        }
      }
    }
    fetchData();
  }, [category, member]);

  const likeResponse = async (nickname: string, action: string) => {
    try {
      await axios.post(`${process.env.REACT_APP_BACK_END_URL}/api/like/respond`, { nickname, action }, { withCredentials: true });
      alert(`${action === 'accept' ? '수락' : '거절'} 처리됨`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }

  }

  const dateResponse = async (nickname: string, action: string) => {
    try {
      const resp = await axios.post(`${process.env.REACT_APP_BACK_END_URL}/api/date/respond`, { nickname, action }, { withCredentials: true });
      const status = resp.data;
      alert(`${action === 'accept' ? '수락처리됨' : action === 'reject' ? '거절처리됨' : `${member?.nickname}님 또는 상대방이 이미 다른 데이트를 진행 중입니다.`}`);
      window.location.reload();
      setCategory('date');
    } catch (error) {
      console.error(error);
    }
  }

  // modal
  const [show, setShow] = useState(false);
  const [menu, setMenu] = useState('');

  const handleClose = () => { setShow(false); setMenu('') }
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenu(e.currentTarget.id)
    setShow(true)
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>{member?.nickname}님의 Alarm</h2>
      <div style={{ textAlign: 'center', fontSize: '30px', height: '50px' }}>
        <button className={styles.button} id='like' type='button' onClick={() => { setCategory('like') }}>Like 요청</button>
        <button className={styles.button} id='date' type='button' onClick={() => { setCategory('date') }}>Date 요청</button>
      </div>

      {
        category === 'date' && (<div style={{ margin: '30px auto' }}>
          {
            dateprofile.map((e, i) => (<React.Fragment key={i}>
              <div className={styles.card} style={{ width: '500px', margin: '20px auto', textAlign: 'center' }}>
                <img src={`${imageBasePath}${e.PROFILEIMAGE}`} alt='' />
                <div className={styles.cardTitle}>{e.NICKNAME}님의 Date 요청</div>
                <div className={styles.cardTitle}>{e.DATE_LOCATION}에서 만나요</div>
              </div>
              <br />
              <div style={{ textAlign: 'center' }}>
                <button id='mapp' className={styles.likebutton} onClick={(e) => { handleClick(e); setSelectedIndex(i) }}>위치보기</button>
                <button className={styles.dislikebutton} onClick={() => { dateResponse(e.NICKNAME, 'reject') }}>싫어요</button>
              </div>
            </React.Fragment>
            ))
          }
        </div>)
      }
      {
        category === 'like' && (<div style={{ margin: '30px auto' }}>
          {likeprofile.map((e, i) => (<React.Fragment key={i}>
            <div className={styles.card} style={{ width: '500px', margin: '20px auto', textAlign: 'center' }}>
              <img src={`${imageBasePath}${e.PROFILEIMAGE}`} alt='' />
              <div className={styles.cardTitle}>{e.NICKNAME}</div>
              <div className={styles.cardTitle}>{getAge(e.BIRTH)}</div>
            </div>
            <br />
            <div style={{ textAlign: 'center' }}>
              <button className={styles.likebutton} onClick={() => { likeResponse(e.NICKNAME, 'accept') }}>좋아요</button>
              <button className={styles.dislikebutton} onClick={() => { likeResponse(e.NICKNAME, 'reject') }}>싫어요</button>
            </div></React.Fragment>
          ))
          }
        </div >)
      }

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='xl'
      >
        <Modal.Header closeButton>
          <Modal.Title>{menu}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {show && dateprofile[selectedIndex]?.DATE_LOCATION ? (
            <>
              <AddressMap address={dateprofile[selectedIndex].DATE_LOCATION?.split(',')[0] || ''} />
              <div style={{ textAlign: 'center' }}><p>상세주소 : {dateprofile[selectedIndex].DATE_LOCATION?.split(',')[1]}</p></div>
            </>) : (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              위치 정보를 불러올 수 없습니다.
            </div>)}
        </Modal.Body>
        <Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="primary" onClick={() => { dateResponse(dateprofile[selectedIndex].NICKNAME, 'accept') }}>
            Date
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Alarm