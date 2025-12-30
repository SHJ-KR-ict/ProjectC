//GalleryDetail.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import style from '../gallery/gallery.module.css';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import Map from '../map/Map';

declare global {
  interface Window {
    naver: any;
  }
}

const LikeDetail: React.FC = () => {
  const navigate = useNavigate();
  const { num } = useParams<{ num: string }>();
  const [show, setShow] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<React.ReactElement>()

  const handleClose = () => { setShow(false); }
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShow(true)
    console.log(show)
  };
  const galleryDel = async () => {
    if (window.confirm("싫어요 하시겠습니까?")) {
      navigate("/like");
    }
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
          <img src={`/img/${num}.jpg`} className={style.image} />
        </div>
        <div style={{ margin: '20px auto' }}>
          <p>이름 나이 전화번호 </p>
          <p>거주지(XX시 XX구 XX동)</p>
          <p>SNS 연동 시 SNS 계정 주소</p>
          <p>이후 사용자가 원하는 태그 작성 가능 ex) #러닝장인</p>
        </div>
        <div>
          <button className={style.button} style={{ backgroundColor: 'green' }} onClick={handleClick}>date 신청</button>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <button className={style.button} style={{ margin: 10 }} onClick={() => { navigate('/like') }}>목록</button>
        <button className={style.button} style={{ margin: 10 }} onClick={galleryDel}>삭제</button>
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
          {show && <><Map /><div style={{textAlign:'center'}}>상세주소 : <input type="text" name="detailaddr" id="detailaddr" style={{ height: '30px' }} /></div></>}
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