import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Modal } from "react-bootstrap";
import Diary from "../diary/Diary";




const Fortune: React.FC = () => {

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [menu, setMenu] = useState('');

  const handleClose = () => setShow(false);
  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
          setShow(true)
      setMenu(e.currentTarget.id)
  };

  const divBlockStyle1: React.CSSProperties = {
    width: "50%", // 중앙 정렬을 위해 너비를 지정해야 합니다.
    margin: "0 auto", // 상하 마진 0, 좌우 마진 'auto'로 중앙 정렬
    //backgroundColor: "#f0f0f0",
    padding: "30px",
    textAlign: "center", // 블록 자체를 중앙 정렬 후, 텍스트는 다시 왼쪽 정렬 가능
    border: '2px solid #00000034',
    borderRadius: '20px'
  };

  const coupleStyle: React.CSSProperties = {
    fontWeight: "bold", // 글씨를 굵게
    color: "red", // 빨간색으로 변경
    fontSize: "1.1em", // 글자 크기 키우기
  };

  const lovefortuneStyle: React.CSSProperties = {
    color: "blue", // 글자 색을 파란색으로 변경
    fontStyle: "italic", // 기울임꼴 적용
  };

  const loveHighlightStyle: React.CSSProperties = {
    backgroundColor: "yellow", // 배경색을 노란색으로
    color: "red", // 글자색을 빨간색으로
    padding: "2px 5px", // 텍스트 주변에 약간의 패딩(여백)을 주어 배경색을 더 잘 보이게 함
    borderRadius: "3px", // 모서리를 살짝 둥글게 처리 (선택 사항)
    fontWeight: "bolder", // 글씨를 더 굵게
  };

  const pTagStyle: React.CSSProperties = {
    backgroundColor: "pink",
  };

   
  

  return (
    <div style={divBlockStyle1}>
      {/* <div style={{ marginBottom: 25 , display:"flex" ,justifyContent:'space-evenly'}}>
        <div>
          <input type="date" name="birth" id="birth" />
        </div>
        <div>
          <select name="birthtime" id="birthtime">
            <option value="">생시를 선택</option>
            <option value="0">모름</option>
            <option value="1">23~1시</option>
            <option value="2">1~3시</option>
            <option value="3">3~5시</option>
            <option value="4">5~7시</option>
            <option value="5">7~9시</option>
            <option value="6">9~11시</option>
            <option value="7">11~13시</option>
            <option value="8">13~15시</option>
            <option value="9">15~17시</option>
            <option value="10">17~19시</option>
            <option value="11">19~21시</option>
            <option value="12">21~23시</option>
          </select>
        </div>
      </div> */}
      <h1 style={{fontWeight:'bold', fontFamily: 'sans-serif'}}>오늘의 애정운✨</h1>
      <hr />
      <p style={pTagStyle}>
        이 달, 내게 생길 연인과 만나게 될 귀인은 누구일까? <br />
        행복하게 연인과 <span style={coupleStyle}>커플</span>까지 이어질 수
        있을까?
        <br /> 이 달에 일어날 <span style={lovefortuneStyle}>애정운</span>에
        관한, 정보를 제공해 드립니다^^
      </p>

      <hr />
      <h3>
        모두 <span style={loveHighlightStyle}>행복한 사랑</span>하세요~♥
      </h3>
      <div>
        <img src='/imgs/coupleImg01.png' alt="커플 이미지" />
      </div>
      <hr />
      <div>
        <h4 style={{fontStyle:'italic', fontFamily: 'sans-serif'}}>오늘의 연인 애정운 ❀</h4>
        <p>
          여러 가지 상황이 당신에게 적합한 것으로 보이고, 애정운 또한 상승세를
          <br />
          타고 있으니, 좋은 인연을 만날 수 있는 날입니다. <br />
          굳이, <br />
          당신의 마음을 크게 잡아 당기고 있는 사람이 아니다 하더라도, <br />
          일단, 만남의 기회가 생기면, 귀찮아 하지 말고, 적극적으로 나서는 것이,
          <br />
          좋겠습니다. <br />
          용감한 자가 사랑을 얻는 법입니다. <br />
          나서서 얻으려 하면, 능히 구할 수 있는 날입니다. <br />
          사랑의 행운이 당신과 함께 합니다. <br />
          이러한 확신을 갖고 밖으로 나가 보시기 바랍니다.
        </p>
      </div>
      <hr />
      <div>
            <Button id="MyPage" variant="primary" className="me-3" onClick={handleClick}>My Diary</Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="xl"
            >
                {/* <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header> */}
                
                  <Modal.Body>
                  <Diary/>
                  </Modal.Body>
                
                
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Button variant="info" onClick={() =>{}}>Add to Diary</Button>
            
      </div>
    </div>
  );
};

export default Fortune;
