import { Link } from "react-router-dom";
import style from '../upboard/upboard.module.css'
import React, { useState } from "react";

const MyQna: React.FC = () => {
    const boardV = [
        {
            num: 1, title: "제 정보를 잘못 입력했는데 어디에서 수정 가능한가요?", writer: "박수영",
            content: "마이페이지에서 수정 가능합니다"
        },
        {
            num: 6, title: "자랑 게시판에 사진은 몇 장 업로드해야 하나요?", writer: "박수영",
            content: "가장 잘 나오신 사진 한 장만 올리면 됩니다!"
        },
        {
            num: 8, title: "매칭이 성사 되었는지 어떻게 알 수 있나요?", writer: "한지혜",
            content: "홈페이지 상단 우측에 있는 종 모양 아이콘의 알림을 통해 알 수 있습니다."
        },
        {
            num: 9, title: "현재 데이트코스는 수도권만 추천해주는 건가요?", writer: "박수영",
            content: ''//"현재 데이트코스는 수도권 및 충청권 지역이 있으며, 차츰 타 지역까지 추가할 예정입니다. 추가되면 공지사항을 통해 알려드릴 예정입니다."
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
            <h1 style={{ marginBottom: 30 }}>고객 상담</h1>
            <table className={style.boardTable} >
                <thead>
                    <tr>
                        <th colSpan={2} style={{ fontSize: 25 }}>내 문의</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (boardV.map((e) => (
                            <React.Fragment key={e.num}>
                                <tr>
                                    <td className={style.titleLink} onClick={() => { ctoggle(e.num) }} colSpan={2}>{e.title}</td>
                                    <td style={{ textAlign: 'center', width: '105px', border: 'none', visibility: e.content === '' ? 'visible' : 'hidden', pointerEvents: e.content === '' ? 'auto' : 'none' }}>
                                        <button className={style.abutton}>대기중</button>
                                    </td>
                                </tr>
                                {
                                    toggle && number === e.num && (
                                        <tr>
                                            <td style={{ fontWeight: 'bold', height: '75px' }} colSpan={2}>
                                                A.{e.content}
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
                    </tr>
                    <tr>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default MyQna