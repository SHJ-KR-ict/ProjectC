import React, { useEffect, useState } from 'react'
import './home.css'
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import Survey from '../survey/Survey';

const Home: React.FC = () => {
  const [Matching, setMatching] = useState(false);
  const navigate = useNavigate();
  const nav = () => {
    navigate("/matchingHome")
  }
  const signupnav = () => {
    navigate("/signup")
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [isSurveyCompleted, setIsSurveyCompleted] = useState(
    localStorage.getItem('surveyCompleted') === 'true'
  );
  useEffect(() => {
    if (!isSurveyCompleted) {
      setShow(true)
    }
  }, [isSurveyCompleted])
  return (
    <div style={{ background: 'url(/image/card4.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', }}>
      <div className="px-4 pt-5 text-center border-bottom" style={{ height: '810px' }}>
        <div className='mymymy'>
          <h1 className="display-3 fw-bold" style={{ color: '#f1ce09ff', marginTop: '100px', fontSize: '130px' }}>당신의 새로운 만남을 위해</h1>
        </div>
        <div className="col-lg-6 mx-auto mymymy">
          <p className="lead mb-4" style={{ color: '#000000ff', fontWeight: 'bold', fontSize: '40px' }}>당신이 원한다면 언제 어디서든</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5 mymy">
            <button type="button" className="btn btn-primary btn-lg p-2" onClick={signupnav} style={{ width: 160 }}>계정 만들기</button>
          </div>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5 mymy">
            <button type="button" className="btn btn-primary btn-lg p-2" onClick={nav} style={{ width: 160 }}>매칭하기</button>
          </div>
        </div>
        <div className="overflow-hidden" style={{ maxHeight: '400px' }}>
          <div className="container px-5">
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>설문조사 부탁해요!!!!ㅜㅜㅜㅜㅜ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Survey />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  )
}

export default Home