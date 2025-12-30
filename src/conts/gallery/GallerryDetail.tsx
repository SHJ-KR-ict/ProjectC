//GalleryDetail.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import style from './gallery.module.css';
import styles from '../matching/MatchingHome.module.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

interface GalleryItem {
  num: number;
  title: string;
  writer: string;
  contents: string;
  reip: string;
  hit: string;
  gdate: string;
  getimglist: string[] | null;
}

const GalleryDetail: React.FC = () => {
  const navigate = useNavigate();
  const { num } = useParams<{ num: string }>();
  const [item, setItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const galleryDel = async () => {
    if (window.confirm("정말 삭제할까요?")) {
      navigate("/gallery");
    }
  }
  return (
    <div className={style.container}>     
      <div >
        <table  className={style.boardTable} >
        <thead>
            <tr className={style.th}>
                <th>쓴이</th>
                <th>Date</th>
                <th>조회수</th>
                <th>추천</th>
            </tr>
        </thead>
        <tbody>
           <tr >
             <td>눈물먹는뻐꾸기9802</td>
             <td>25/12/02</td>
             <td>35</td>
             <td>4</td> 
           </tr>
           </tbody></table>
       
        <div className={style.detail} >
          <img src={`/imge/${num}.jpg`} className={style.image} />
        </div>
      </div>
      <div className={style.gif}><img src={`/imge/a.gif`}></img></div>
      <div style={{ textAlign: 'center', margin: 20 }}>
        <button className={styles.likebutton} style={{margin:10}} >추천</button>
        <button className={style.button} style={{ margin:10}} onClick={()=>{navigate('/gallery')}}>목록</button>
        <button className={style.button} style={{ margin:10}} onClick={galleryDel}>삭제</button>
      </div>
    </div>




  );
};
export default GalleryDetail;