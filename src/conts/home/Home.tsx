import React, { useEffect, useState } from 'react'
import './home.css'
import { useNavigate } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useAuth } from '../../comp/AuthProvider'
import { Link } from 'react-router-dom'
import Survey from '../survey/Survey'

const Home: React.FC = () => {
  const { member } = useAuth();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: false
  }

  const homeData = [
    {
      id: 1,
      img: '/image/couple1.jpg',
      title: '당신의 새로운 만남을 위해',
      subtitle: '설레는 인연이 지금 시작됩니다'
    },
    {
      id: 2,
      img: '/image/couple2.jpg',
      title: '우연이 아닌 인연',
      subtitle: '당신과 닮은 사람을 만나보세요'
    },
    {
      id: 3,
      img: '/image/couple3.jpg',
      title: '지금 이 순간',
      subtitle: '가장 잘 어울리는 상대를 추천해요'
    },
    {
      id: 4,
      img: '/image/couple4.jpg',
      title: '혼자가 아닌 시간',
      subtitle: '함께할 누군가를 찾아보세요'
    },
    {
      id: 5,
      img: '/image/couple5.jpg',
      title: '당신의 선택으로',
      subtitle: '새로운 이야기가 시작됩니다'
    }
  ]
  const signupnav = () => navigate('/signup')

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleModalClose = () => {
    if (checked) {
      localStorage.setItem('surveyCompleted', 'true');
    }
    handleClose();
  };

  const [isSurveyCompleted] = useState(
    localStorage.getItem('surveyCompleted') === 'true'
  )

  useEffect(() => {
    if (!isSurveyCompleted) setShow(true)
  }, [isSurveyCompleted])


  return (
    <>
      <Slider {...settings}>
        {homeData.map((item) => (
          <div key={item.id}>
            <div
              className="home-slide"
              style={{ backgroundImage: `url(${item.img})` }}
            >
              <div className="overlay" />

              <div className="home-content">
                <h1 className="home-title">{item.title}</h1>
                <p className="home-subtitle">{item.subtitle}</p>

                <div className="btn-group">
                  {
                    !member && <button className="main-btn" onClick={signupnav}>
                      계정 만들기
                    </button>
                  }
                  {
                    member && <button className="main-btn outline" onClick={() => { navigate('/matchingHome'); sessionStorage.removeItem('matchingSearchData'); }}>
                      매칭하기
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>설문조사 부탁드립니다 ♥</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center', padding:'20px 0'}}>
          <div>
            <Link to='/surveylist' onClick={() => {
              localStorage.setItem('surveyCompleted', 'true');
              handleClose();
            }} style={{fontSize:'25px'}}>설문조사 하러가기</Link>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              id="dontShowCheck"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            <label htmlFor="dontShowCheck" style={{ fontSize: '14px', cursor: 'pointer', margin: 0 }}>
              다시 보지 않기
            </label>
          </div>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Home
