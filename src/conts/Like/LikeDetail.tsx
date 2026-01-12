//GalleryDetail.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import style from '../gallery/gallery.module.css';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import Map from '../map/Map';
import { useAuth } from '../../comp/AuthProvider';
import axios from 'axios';

declare global {
  interface Window {
    naver: any;
  }
}

interface ProfileVO {
  MEMBERID: number;
  DRINKING: string;
  NUM: number;
  PHONE: string;
  HOBBY: string;
  SMOKING: string;
  HEIGHT: number;
  MBTI: string;
  NICKNAME: string;
  COUNTRY: string;
  RELIGION: string;
  ADDRESS: string;
  PROFILEIMAGES: string[];
  GENDER: '남자' | '여자';
  BIRTH: string;
  WEIGHT: number;
}

const LikeDetail: React.FC = () => {
  const { member } = useAuth();
  const [profile, setProfile] = useState<ProfileVO>();
  const navigate = useNavigate();
  const { num } = useParams<{ num: string }>();
  const [show, setShow] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<React.ReactElement>();
  const imageBasePath = `${process.env.REACT_APP_BACK_END_URL}/imgfile/profileimage/`;

  useEffect(() => {
    const likedetail = async () => {
      try {
        const url = `${process.env.REACT_APP_BACK_END_URL}/api/like/likedetail`;
        const resp = await axios.get(url, { params: { num: num } });
        setProfile(resp.data);
      } catch (error) {
        console.error(error);
      }
    }
    likedetail();
  }, []);

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

  const handleClose = () => { setShow(false); }
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShow(true)
    console.log(show)
  };

  const likeDel = async (nickname: string, action: string) => {
    await axios.post(`${process.env.REACT_APP_BACK_END_URL}/api/like/respond`, { nickname, action }, { withCredentials: true });
    alert('삭제 처리됨');
    navigate(-1);
  }

  const [address, setAddress] = useState<string>('');
  useEffect(() => {
    const { naver } = window;

    if (naver && naver.maps && document.getElementById('map')) {
      const mapOptions = {
        center: new naver.maps.LatLng(37.5666103, 126.9783882),
        zoom: 14,
      };
      const map = new naver.maps.Map('map', mapOptions);
      const marker = new naver.maps.Marker({
        position: mapOptions.center,
        map: map
      });
      naver.maps.Event.addListener(map, 'click', (e: any) => {
        const clickedLatLng = e.coord;
        marker.setPosition(clickedLatLng);
        naver.maps.Service.reverseGeocode({
          coords: clickedLatLng,
          orders: [
            naver.maps.Service.OrderType.ADDR,
            naver.maps.Service.OrderType.ROAD_ADDR
          ].join(',')
        }, (status: any, response: any) => {
          if (status !== naver.maps.Service.Status.OK) {
            return alert('주소를 찾을 수 없습니다.');
          }
          const items = response.v2.results;
          if (items.length > 0) {
            const res = items[0];
            const addr = `${res.region.area1.name} ${res.region.area2.name} ${res.region.area3.name} ${res.land.number1 || ''}`;
            setAddress(addr);
            console.log("변환된 주소:", addr);
          }
        });
      });
    }
  }, []);

  return (
    <div className={style.container}>
      <h3 className={style.title}></h3>
      <div className={style.detail}>
        <div className={style.detail} >
          <img src={`${imageBasePath}${profile?.PROFILEIMAGES[0]}`} className={style.image} />
        </div>
        <div style={{ margin: '20px auto' }}>
          <p>{member?.nickname} {getAge(profile?.BIRTH || '')}세</p>
          <p>{profile?.ADDRESS} 살아요 </p>
          <p>연락은 {profile?.PHONE || ''}</p>
          <p>#취미는 {profile?.HOBBY} #술은 {profile?.DRINKING} 마셔요 #MBTI는 {profile?.MBTI} #종교는 {profile?.RELIGION} #흡연은 {profile?.SMOKING}</p>
        </div>
        <div>
          <button className={style.button} style={{ backgroundColor: 'green' }} onClick={handleClick}>Date 신청</button>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <button className={style.button} style={{ margin: 10 }} onClick={() => { navigate('/like') }}>목 록</button>
        <button className={style.button} style={{ margin: 10 }} onClick={() => { likeDel(profile?.NICKNAME || '', 'reject') }}>삭 제</button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='xl'
      >
        <Modal.Header closeButton>
          <Modal.Title>date 신청</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {show && <><Map /><div style={{ textAlign: 'center' }}>상세주소 : <input type="text" name="detailaddr" id="detailaddr" style={{ height: '30px' }} /></div></>}
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
    </div >




  );
};
export default LikeDetail;