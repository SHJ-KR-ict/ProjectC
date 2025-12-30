import { Link } from "react-router-dom";
import style from '../upboard/upboard.module.css'
import React, { useState } from "react";

//MyArray.jsx
const FAQ = () => {
    //자바스크립트 배열 -> obj
    const boardV = [
        {
            num: 1, title: "제 정보를 잘못 입력했는데 어디에서 수정 가능한가요?", category: "박수영",
            content: "마이페이지에서 수정 가능합니다"
        },
        {
            num: 2, title: "제가 좋아요를 선택한 상대방의 정보는 어떻게 알 수 있나요?", category: "한지혜",
            content: "좋아요를 받은 상대방도 회원님에게 '좋아요'를 전송하게 된다면 회원님도 상대방의 정보를 열람하실 수 있게 됩니다"
        },
        {
            num: 3, title: "서로 매칭이 되면 어떻게 되나요?", category: "한지혜",
            content: "매칭이 성사가 되면 회원님들의 정보를 바탕으로 데이트 장소를 추천해드립니다."
        },
        {
            num: 4, title: "자랑 게시판에 올리면 무슨 혜택이 있을까요?", category: "한지혜",
            content: "자랑 게시판에 두 분이 함께 찍은 사진을 올려주시면 두 분에게 포인트를 각각 적립해 드리고, 해당 포인트를 통해 더 많은 데이트 코스를 추천받으실 수 있습니다. 이달의 사진으로 선정 시 추가 추가 상금을 지급해드립니다!"
        },
        {
            num: 5, title: "'<경고>사진을 교체해주세요'라는 경고 메시지를 운영자님께 받았습니다. 이유를 알고 싶습니다.", category: "박수영",
            content: "타 회원들에게 불쾌감을 줄 수 있는 사진 및 건전하지 않은 사진은 강제삭제 하고 있습니다. 회원님께 경고 메세지 전송 후, 3일 내 변경 및 삭제하시지 않을 경우 강제삭제 처리해드립니다."
        },
        {
            num: 6, title: "자랑 게시판에 사진은 몇 장 업로드해야 하나요?", category: "박수영",
            content: "가장 잘 나오신 사진 한 장만 올리면 됩니다!"
        },
        {
            num: 7, title: "제가 마음에 드는 상대의 정보를 더 알고 싶어요. 어떻게 해야 하나요?", category: "한지혜",
            content: "서로 '좋아요'를 보내면 더 많은 상대방의 정보를 볼 수 있습니다."
        },
        {
            num: 8, title: "매칭이 성사 되었는지 어떻게 알 수 있나요?", category: "한지혜",
            content: "홈페이지 상단 우측에 있는 종 모양 아이콘의 알림을 통해 알 수 있습니다."
        },
        {
            num: 9, title: "현재 데이트코스는 수도권만 추천해주는 건가요?", category: "박수영",
            content: "현재 데이트코스는 수도권 및 충청권 지역이 있으며, 차츰 타 지역까지 추가할 예정입니다. 추가되면 공지사항을 통해 알려드릴 예정입니다."
        }
    ];
    const [toggle, setToggle] = useState(false);
    const [number, setNumber] = useState(0);
    const ctoggle = (Num: number) => {
        if (number === Num) {
            setToggle(false);
            setNumber(0);
        } else {
            setToggle(true);
            setNumber(Num);
        }
    };
    return (
        <div className={style.container}>
            <div className={style.fading}>
            <h3 className={style.title} >FAQ</h3></div>
            <table className={style.boardTable} >
                <thead>
                    <tr>
                        <th colSpan={2} style={{ fontSize: 20, borderTop:'1px solid rgba(82, 194, 231, 0.445)', textAlign: 'center', color: 'lightpink' }}>FAQ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (boardV.map((e) => (
                            <React.Fragment key={e.num}>
                                <tr style={{height:'60px'}}>
                                    <td className={style.titleLink3} onClick={() => { ctoggle(e.num) }} colSpan={2}>{e.title}</td>
                                </tr>
                                {
                                    toggle && number === e.num && (
                                        <tr>
                                            <td style={{ fontWeight: 'bold', height: '75px', color: 'lightblue' }} colSpan={2}>
                                                A. {e.content}
                                            </td>
                                        </tr>
                                    )
                                }
                            </React.Fragment>)
                        )
                        )
                    }
                </tbody>
                <tfoot style={{ textAlign: 'right' }}>
                    <tr>
                        <td colSpan={2} style={{border:'none', borderTop:'1px solid rgba(82, 194, 231, 0.445)'}}>
                            <Link to="/faq/form" className={style.button}>1대1 문의</Link>
                        </td>
                    </tr>
                    <tr>
                    </tr>
                </tfoot>
            </table>
            <div style={{ textAlign: 'right' }}>
                <Link to="/adminanswer" className={style.button}>admin</Link>
            </div>
        </div>
    )
}
export default FAQ;