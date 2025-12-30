import React, { useState } from 'react'
import style from '../upboard/upboard.module.css'

const GongjiForm: React.FC = () => {

    return (
        <div className={style.container}>
            <h2>공지사항 작성</h2>
            <form className={style.form}>
                <table className={style.boardTable}>
                    <tbody>
                        <tr>
                            <th>제목</th>
                            <td>
                                <input type="text" name="title" id="title" className={style.input}
                                    style={{ width: "95%" }} required />
                            </td>
                        </tr>
                        <tr>
                            <th>작성자</th>
                            <td>
                                <input type="text" name="writer" id="writer" className={style.input}
                                    style={{ width: "95%" }} required />  </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td>
                                <textarea name="content" id="content" style={{ width: "95%", height: "300px", padding: "8px" }}
                                    required />
                            </td>
                        </tr>
                        <tr>
                            <th>이미지</th>
                            <td>
                                <input type="file" name="mfile" id="mfile" className={style.input} required />
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={2}>
                                <button type="submit" className={style.button}>등록하기</button>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </form>

        </div>

    )

}

export default GongjiForm