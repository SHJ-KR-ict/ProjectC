import React, { useEffect, useState } from 'react'
import styles from './MatchingHome.module.css'
import Chart from '../chart_ui/Chart';
import { Button, Modal } from 'react-bootstrap';
import Map from '../map/Map';
import axios from 'axios';
import { useAuth } from '../../comp/AuthProvider';

interface MemberProfile {
  NUM: number;
  NICKNAME: string;
  BIRTH: string;
  PROFILEIMAGE: string;
  LOCATION?: string;
}

const Alarm: React.FC = () => {
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [memberprofile, setMemberProfile] = useState<MemberProfile[]>([]);
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
            params: { nickname: member?.nickname }
          });
          console.log(resp.data);
          setMemberProfile(resp.data);
        } catch (error) {
          console.log("데이터 요청 실패: ", error)
        } finally {
          setLoading(false);
        }
      } else if (category === 'date') {
        try {
          const url = `${process.env.REACT_APP_BACK_END_URL}/api/date/incoming`;
          const resp = await axios.get(url, {
            params: { nickname: member?.nickname }
          });
          console.log(resp.data);
          setMemberProfile(resp.data);
        } catch (error) {
          console.log("데이터 요청 실패: ", error)
        } finally {
          setLoading(false);
        }
      }
    }
    fetchData();
  }, [category]);

  // modal
  const [show, setShow] = useState(false);
  const [menu, setMenu] = useState('');

  const handleClose = () => { setShow(false); setMenu('') }
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenu(e.currentTarget.id)
    setShow(true)
  };

  //date 요청시 map 정보
  const renderContent = (menu: string) => {
    switch (menu) {
      case 'mapp':
        return <Map />;
      default:
        return null;
    }
  };

  return (
    <div>

      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>alarm</h2>
      <div style={{ textAlign: 'center', fontSize: '30px', height: '50px' }}>
        <button className={styles.button} id='like' type='button' onClick={() => { setCategory('like') }}>Like 요청</button>
        <button className={styles.button} id='date' type='button' onClick={() => { setCategory('date') }}>Date 요청</button>
      </div>

      {
        category === 'date' && (<div style={{ margin: '30px auto' }}>
          {
            memberprofile.map((e) => (<>
              <div className={styles.card} style={{ width: '500px', margin: '20px auto', textAlign: 'center' }}>
                <img src={`${imageBasePath}${e.PROFILEIMAGE}`} alt='' />
                <div className={styles.cardTitle}>{e.NICKNAME}님의 Date 요청</div>
                <div className={styles.cardTitle}>{e.LOCATION}에서 만나요</div>
              </div>
              <br />
              <div style={{ textAlign: 'center' }}>
                <button id='mapp' className={styles.likebutton} onClick={handleClick}>위치보기</button> <button className={styles.dislikebutton}>싫어요</button>
              </div></>
            ))
          }
        </div>)
      }
      {
        category === 'like' && (<div style={{ margin: '30px auto' }}>
          {memberprofile.map((e) => (<>
            <div className={styles.card} style={{ width: '500px', margin: '20px auto', textAlign: 'center' }}>
              <img src={`${imageBasePath}${e.PROFILEIMAGE}`} alt='' />
              <div className={styles.cardTitle}>{e.NICKNAME}</div>
              <div className={styles.cardTitle}>{getAge(e.BIRTH)}</div>
            </div>
            <br />
            <div style={{ textAlign: 'center' }}>
              <button className={styles.likebutton}>좋아요</button> <button className={styles.dislikebutton}>싫어요</button>
            </div></>
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
          {show && (<>{renderContent(menu)}<div style={{ textAlign: 'center' }}><p>상세주소 : ~~~~~</p></div></>)}
        </Modal.Body>
        <Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="primary" >
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