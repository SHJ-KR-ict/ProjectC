import React, { useEffect, useState } from 'react'
import style from './mypage.module.css'
import { useNavigate } from 'react-router-dom'
import Mypagedetail from './Mypagedetail'
import Gallery from '../gallery/Gallery'
import Chart from '../chart_ui/Chart'
import UpboardList from '../upboard/UpboardList'
import LikeHome from '../Like/LikeHome'
import Gongjilist from '../gongji/Gongjilist'
import MyQna from '../faq/MyQna'
import { Button, Modal } from 'react-bootstrap'
import Mypageimage from './MypageImage'
import Loginlog from '../login/Loginlog'

const Mypagehome: React.FC = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [menu, setMenu] = useState('');
  const [selectedMenu, setSelectedMenu] = useState<React.ReactElement>()

  const renderContent = (menu: string) => {
    switch (menu) {
      case 'Chart':
        return <Chart />
      case 'Change Profile':
        return <Mypagedetail />
      case 'Gallery':
        return <Gallery />
      case 'Community':
        return <UpboardList />
      case 'Like':
        return <LikeHome />
      case 'Notice':
        return <Gongjilist />
      case 'FAQ':
        return <MyQna />
      case 'Image':
        return <Mypageimage />
      case 'LoginLog':
        return <Loginlog />
    }
  }

  useEffect(() => {
    setSelectedMenu(renderContent(menu));
  }, [menu])

  const handleClose = () => setShow(false);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShow(true)
    setMenu(e.currentTarget.id)
  };
  return (
    <div>
      <section className={style.mypageContainer}>
        {/* 로고 */}
        <div className={style.mypageLogoWrap}>
          <img
            className={style.mypageImg}
            src="/img/mypage.png"
            alt="MyPage logo"
          />
        </div>

        {/* 상단 영역 */}
        <div className={style.topArea}>
          <div className={style.profileRow}>
            {/* 프로필 */}
            <div className={style.profileSection}>
              <img
                className={style.profileImg}
                src="/imgs/Default_user.jpg"
                alt="user"
              />
              <button id='Image' className={style.addBtn} onClick={handleClick}>+</button>
              <div className={style.username}>Sally</div>
              <p>다들 좋은 하루 되세요</p>
            </div>

            {/* 통계 버튼 */}
            <div className={style.statsRow}>
              <button
                className={style.statBtn}
              >
                <div className={style.num}>15</div>
                <div className={style.label}>내 게시물</div>
              </button>

              <button
                className={style.statBtn}

              >
                <div className={style.num}>10</div>
                <div className={style.label}>팔로워</div>
              </button>
              <button
                className={style.statBtn}
              >
                <div className={style.num}>30</div>
                <div className={style.label}>즐겨찾기</div>
              </button>
            </div>
          </div>
        </div>

        {/* 메뉴 */}
        <div className={style.menuGrid}>
          <button id='Change Profile' onClick={handleClick} className={style.menuBtn}>
            개인정보 수정
          </button>
          <button id='Chart' onClick={handleClick} className={style.menuBtn}>
            내 매칭 통계
          </button>
          <button id='Gallery' onClick={handleClick} className={style.menuBtn}>
            나의 자랑하기
          </button>
          <button id='Community' onClick={handleClick} className={style.menuBtn}>
            내 작성글
          </button>
          <button id='Like' onClick={handleClick} className={style.like}>
            Like
          </button>
          <button id='FAQ' onClick={handleClick} className={style.menuBtn}>
            내 문의
          </button>
          <button id='LoginLog' className={style.menuBtn} onClick={handleClick}>로그인 기록</button>
          <button className={style.danger}>회원 탈퇴</button>
        </div>

      </section>
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
        <Modal.Body style={{ textAlign: 'center' }}>
          {selectedMenu}
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

export default Mypagehome
