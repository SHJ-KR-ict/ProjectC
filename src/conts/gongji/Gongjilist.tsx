import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import style from '../upboard/upboard.module.css'

const Gongjilist: React.FC = () => {
  const gongjisahang = [
    {
      num: 1, title: "새로운 기능이 추가되었습니다-'빠른매칭'", writer: "admin",
      content: "기존의 '일반매칭'에 이어 '빠른매칭'이 추가되었습니다."
    },
    {
      num: 2, title: "서버 점검 사전 안내(2025.07.31 04:00~06:00)(완료)", writer: "admin",
      content: "잠시 서버 점검이 있을 예정입니다. 해당 시간 동안 서버 접속이 불가합니다. 죄송합니다."
    },
    {
      num: 3, title: "사진 업로드 불가 현상 안내(완료)", writer: "admin",
      content: "일부 사진을 업로드할 수 없는 현상이 발견되어 해결 중입니다. 이용에 불편을 드려 죄송합니다."
    },
    {
      num: 4, title: "이달의 커플 선정 기준 안내", writer: "admin",
      content: "이달의 커플은 조회수, 댓글 수 를 포함한 다양한 요소들을 바탕으로 운영진이 선정합니다."
    },
    {
      num: 5, title: "서버 점검 사전 안내(2025.02.31 04:00~06:00)(완료)", writer: "admin",
      content: "잠시 서버 점검이 있을 예정입니다. 해당 시간 동안 서버 접속이 불가합니다. 죄송합니다."
    },
    {
      num: 6, title: "사진 규정 안내", writer: "admin",
      content: "타인에게 불쾌감을 줄 수 있거나 노출이 과다한 사진은 업로드가 불가합니다."
    },
    {
      num: 7, title: "데이트 코스 추천 범위가 추가됩니다", writer: "admin",
      content: "데이트 코스 추천 범위가 수도권에서 강원도(강릉,속초), 대전, 부산, 전라남도(해남), 충청북도(청주)가 추가되었습니다."
    },
    {
      num: 8, title: "채팅 기능 안내", writer: "admin",
      content: "현재 채팅 기능은 개발 중입니다. 채팅 기능 개발 완료 후 차후 안내드리도록 하겠습니다."
    },
    {
      num: 9, title: "새로운 기능이 추가되었습니다-'데이트 코스 추천'", writer: "admin",
      content: "매칭이 성사 되면 회원님들이 입력해주신 자료를 토대로 데이트 코스를 추천해드립니다."
    },
    {
      num: 10, title: "서버 점검 사전 안내(2024.12.1 04:00~06:00)(완료)", writer: "admin",
      content: "잠시 서버 점검이 있을 예정입니다. 해당 시간 동안 서버 접속이 불가합니다. 죄송합니다."
    },
    {
      num: 11, title: "발렌타인데이 이벤트 안내", writer: "admin",
      content: "발렌타인데이 기념으로 2월 14일, 자랑게시판에 글을 올려주시면 포인트를 2배로 적립해드립니다. 포인트는 차후 업데이트 될 컨텐츠에서 이용 가능합니다."
    },
    {
      num: 12, title: "새로운 기능이 추가되었습니다-'오늘의 운세'", writer: "admin",
      content: "홈페이지 상단에 '오늘의 운세' 기능이 추가됩니다. '오늘의 운세'는 매일 오전 6시에 갱신됩니다."
    },
    {
      num: 13, title: "매칭 기능 활성화 안내", writer: "admin",
      content: "매칭 기능은 회원님께서 모든 정보를 작성해주셔야 이용하실 수 있습니다.",
    },
    {
      num: 14, title: "고객님이 데이트하고 싶은 장소는 어디인가요?(설문조사)", writer: "admin",
      content: "고객님께서 가장 선호하는 데이트 장소는 어느 곳인지 자유롭게 골라주시면 됩니다",
    }
  ];


  return (

    <div className={style.container}>
      <div className={style.fading2}><h3>공지사항</h3></div>
      <table className={style.boardTable} >
        <thead style={{textAlign:'center'}}>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {
            gongjisahang.map((e, i) => (
              <tr>
                <td style={{ width: "120px", textAlign: 'center' }}>{e.num}</td>
                <td><Link to={`/gongji/detail/${i + 1}`} className={style.titleLink}>{e.title}</Link></td>
                <td style={{ width: "170px", textAlign: 'center' }}>{e.writer}</td>
                <td style={{ width: "170px", textAlign: 'center' }}>2025.12.{i + 7}</td>
              </tr>
            ))
          }
        </tbody>
        <tfoot style={{ textAlign: 'right' }}>
          <tr>
            <td colSpan={4}>
              <Link to="/gongji/form" className={style.button}>글쓰기</Link>
            </td>
          </tr>
          <tr>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default Gongjilist