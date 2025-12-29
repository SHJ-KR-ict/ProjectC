import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import style from './upboard.module.css';
import axios from 'axios';


interface UpBoardVO {
  num?: number;
  title: string;
  writer: string;
  content: string;
  imgn?: string;
  hit?: number;
  reip?: string;
  bdate?: string;
  mfile: File | null;

}

const UpboardForm: React.FC = () => {

  const [formData, setFormData] = useState<UpBoardVO>({
    title: '',
    writer: '',
    content: '',
    mfile: null as File | null
  });


  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);


  const formChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    const { name, value } = e.target

    setFormData({ ...formData, [name]: value })

  }
  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("파일 이미지가 감지 됨!");
        console.log(reader.result);
        setPreview(reader.result);
      }
      reader.readAsDataURL(file);
      setFormData({ ...formData, mfile: file });
    }
  }


  const navigate = useNavigate();

  //change이후 입력값을 axios를 사용해서 전송
  const myFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  //폼 전송을 막기

    const data = new FormData();
    //
    data.append('title', formData.title);
    data.append('writer', formData.writer);
    data.append('content', formData.content);
    if (formData.mfile) {
      data.append('mfile', formData.mfile);
      try {
        const url = '';
        await axios.post(url, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        navigate('/community/uplist')

      } catch (error) {
        console.log(`Erro =>{error}`);
      }
      console.log(`FormData 전송 시 name이 필수!  Title => ${formData.title}, Writer => ${formData.writer}`);
    }

  }

  return (
    <div className={style.container}>
      <h2>자유 게시판</h2>
      <form onSubmit={myFormSubmit} className={style.form}>
        <table className={style.boardTable}>
          <tbody>
            <tr>
              <th>제목</th>
              <td>
                <input type="text" name="title" id="title" className={style.input} onChange={formChange}
                  style={{ width: "95%" }} required />
              </td>
            </tr>
            <tr>
              <th>작성자</th>
              <td>
                <input type="text" name="writer" id="writer" className={style.input} onChange={formChange}
                  style={{ width: "95%" }} required />  </td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <textarea name="content" id="content" style={{ width: "95%", height: "300px", padding: "8px" }}
                  onChange={formChange} required />
              </td>
            </tr>
            <tr>
              <th>이미지</th>
              <td>
                <input type="file" name="mfile" id="mfile" className={style.input} onChange={fileChange} required />
              </td>
            </tr>
            {preview &&
              (<tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <img src={preview as string} alt='' style={{ width: '150px', height: '150px', marginRight: '10px', marginBottom: '10px' }} />
                </td>
              </tr>)
            }
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

export default UpboardForm