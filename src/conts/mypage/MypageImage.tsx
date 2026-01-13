import React, { useState } from 'react'
import { useAuth } from '../../comp/AuthProvider';
import axios from 'axios';

interface UpBoardVO {
  num?: number;
  imgn?: string;
  mfile: File | null;
}

const Mypageimage: React.FC = () => {
  const { member } = useAuth();
  const [formData, setFormData] = useState<UpBoardVO>({
    mfile: null as File | null
  });
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

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

  const ProfileUpdate = async () => {
    if (!formData.mfile) {
      alert("업로드할 파일을 선택해주세요.");
      return;
    }

    const Data = new FormData();

    Data.append("profile", formData.mfile);
    Data.append("userid", String(member?.num));

    try {
      const url = `${process.env.REACT_APP_BACK_END_URL}/matching/profileup`;
      const resp = await axios.post(url, Data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });
      if (resp.status === 200) {
        alert("정상적으로 이미지가 바뀌었습니다");
        window.location.reload();
      }
      console.log(resp.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <input type="file" name="mfile" id="mfile" onChange={fileChange} required />
      {preview &&
        (<div><img src={preview as string} alt='' style={{ width: '150px', height: '150px', marginRight: '10px', marginBottom: '10px', marginTop: '30px' }} /></div>)
      }
      <div style={{ marginTop: '20px' }}>
        <button onClick={ProfileUpdate}
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
          프로필 사진 변경하기
        </button>
      </div>
    </div>
  )
}

export default Mypageimage