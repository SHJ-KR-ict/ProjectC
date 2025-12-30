import React, { useEffect, useState } from 'react'
import styles from './MatchingHome.module.css'
import Chart from '../chart_ui/Chart';
import { Button, Modal } from 'react-bootstrap';
import Map from '../map/Map';

const Alarm: React.FC = () => {
  const [category, setCategory] = useState('');
  useEffect(() => {
    setCategory('like')
  }, []);
  const [show, setShow] = useState(false);
  const [menu, setMenu] = useState('');
  const [selectedMenu, setSelectedMenu] = useState<React.ReactElement>()

  const renderContent = (menu: string) => {
    switch (menu) {
      case 'mapp':
        return <Map />;
      default:
        return null;
    }
  };

  const handleClose = () => {setShow(false);setMenu('')}
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenu(e.currentTarget.id)
    setShow(true)
  };

  return (
    <div>

      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>alarm</h2>
      <div style={{ textAlign: 'center', fontSize: '30px', height: '50px' }}>
        <button className={styles.button} id='like' type='button' onClick={() => { setCategory('like') }}>Like 요청</button>
        <button className={styles.button} id='date' type='button' onClick={() => { setCategory('date') }}>Date 요청</button>
      </div>
      {
        category === 'date' && (<><div style={{ margin: '30px auto' }}>
          <div className={styles.card} style={{ width: '500px', margin: '20px auto', textAlign: 'center' }}>
            <img src={'/alarm/1.jpg'} alt='' />
            <div className={styles.cardTitle}>xx님의 Date 요청</div>
            <div className={styles.cardTitle}>~~동 ~~에서 만나요</div>
          </div>
          <br />
          <div style={{ textAlign: 'center' }}>
            <button id='mapp' className={styles.likebutton} onClick={handleClick}>위치보기</button> <button className={styles.dislikebutton}>싫어요</button>
          </div>
        </div>
          <div style={{ margin: '30px auto' }}>
            <div className={styles.card} style={{ width: '500px', margin: '0 auto', textAlign: 'center' }}>
              <img src={'/alarm/2.jpg'} alt='' />
              <div className={styles.cardTitle}>xx님의 Date 요청</div>
              <div className={styles.cardTitle}>~~동 ~~에서 만나요</div>
            </div>
            <br />
            <div style={{ textAlign: 'center' }}>
              <button id='mapp' className={styles.likebutton} onClick={handleClick}>위치보기</button> <button className={styles.dislikebutton}>싫어요</button>
            </div>
          </div></>)
      }
      {
        category === 'like' && (<><div style={{ margin: '30px auto' }}>
          <div className={styles.card} style={{ width: '500px', margin: '20px auto', textAlign: 'center' }}>
            <img src={'/alarm/2.jpg'} alt='' />
            <div className={styles.cardTitle}>이름</div>
            <div className={styles.cardTitle}>나이</div>
          </div>
          <br />
          <div style={{ textAlign: 'center' }}>
            <button className={styles.likebutton}>좋아요</button> <button className={styles.dislikebutton}>싫어요</button>
          </div>
        </div>
          <div style={{ margin: '30px auto' }}>
            <div className={styles.card} style={{ width: '500px', margin: '0 auto', textAlign: 'center' }}>
              <img src={'/alarm/3.jpg'} alt='' />
              <div className={styles.cardTitle}>이름</div>
              <div className={styles.cardTitle}>나이</div>
            </div>
            <br />
            <div style={{ textAlign: 'center' }}>
              <button className={styles.likebutton}>좋아요</button> <button className={styles.dislikebutton}>싫어요</button>
            </div>
          </div>
          <div style={{ margin: '30px auto' }}>
            <div className={styles.card} style={{ width: '500px', margin: '0 auto', textAlign: 'center' }}>
              <img src={'/alarm/1.jpg'} alt='' />
              <div className={styles.cardTitle}>이름</div>
              <div className={styles.cardTitle}>나이</div>
            </div>
            <br />
            <div style={{ textAlign: 'center' }}>
              <button className={styles.likebutton}>좋아요</button> <button className={styles.dislikebutton}>싫어요</button>
            </div>
          </div></>)
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
          {show && (<>{renderContent(menu)}<div style={{textAlign:'center'}}><p>상세주소 : ~~~~~</p></div></>)}
        </Modal.Body>
        <Modal.Footer style={{display:'flex',justifyContent:'center'}}>
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