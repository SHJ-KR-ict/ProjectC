import React, { useState } from 'react'

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

const Mypageimage: React.FC = () => {
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

  return (
    <div>
      <input type="file" name="mfile" id="mfile" onChange={fileChange} required />
      {preview &&
        (<div><img src={preview as string} alt='' style={{ width: '150px', height: '150px', marginRight: '10px', marginBottom: '10px', marginTop:'30px'}} /></div>)
      }
    </div>
  )
}

export default Mypageimage