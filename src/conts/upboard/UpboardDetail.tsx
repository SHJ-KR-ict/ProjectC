import React, { useEffect, useState } from 'react'
import style from './upboard.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { url } from 'inspector';
import UpboardComm from './UpboardComm';
import styles from '../matching/MatchingHome.module.css'

interface UpBoardVO {
  num: number;
  title: string;
  writer: string;
  content: string;
  imgn?: string;
  hit?: number;
  reip?: string;
  bdate?: string;
  mfile: File | null;
}

const UpboardDetail: React.FC = () => {
  const [upboard, setUpboard] = useState<UpBoardVO | null>(null);
  const { num } = useParams<{ num: string }>();
  console.log(`num =>${num}`);
  //useEffect(()={},[]);
  const navigate = useNavigate();

  return (
    <div className={style.container}>


      <div className={style.text}> {upboard?.content}</div>
      <div className={style.detail} >
        <img src={`/img/16.jpg`} className={style.image} />

      </div>
      <div  style={{ width: "150px", height: "auto" }}>
      
        <img src={`/img/12.jpg`}  />
        </div>
      <div style={{ textAlign: 'center', margin: 20 }}>
        <button className={styles.likebutton} style={{ margin:10}} >추천</button>
     

     
        <Link to="/community/uplist" className={style.button} style={{ margin:10}} >목록</Link>
        <button className={style.button} style={{ margin:10}} >삭제</button>
      

      </div>


      <hr />
      <UpboardComm num={num} />
    </div>
  )
}

export default UpboardDetail