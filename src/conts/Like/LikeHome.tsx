import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from '../gallery/gallery.module.css';

const LikeHome: React.FC = () => {
  const navigate = useNavigate();
  const { num } = useParams<{ num: string }>();
  const [loading, setLoading] = useState(true);
  const galleryDel = async () => {
    if (window.confirm("정말 삭제할까요?")) {
      navigate("/gallery");
    }
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title} style={{ fontSize: 40, fontWeight: 'bold' }}>Like</h2>
      <div className={styles.grid}>


        <Link to={'/like/detail/1'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <img src={'/img/1.jpg'} />
            <td>이름</td>
          </div>
        </Link>
        <Link to={'/like/detail/2'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <img src={'/img/2.jpg'} />
            <td>이름</td>
          </div>
        </Link><Link to={'/like/detail/3'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <img src={'/img/3.jpg'} />
            <td>이름</td>
          </div>
        </Link><Link to={'/like/detail/4'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <img src={'/img/4.jpg'} />
            <td>이름</td>
          </div>
        </Link><Link to={'/like/detail/5'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <img src={'/img/5.jpg'} />
            <td>이름</td>
          </div>
        </Link><Link to={'/like/detail/6'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <img src={'/img/6.jpg'} />
            <td>이름</td>
          </div>
        </Link><Link to={'/like/detail/7'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <img src={'/img/7.jpg'} />
            <td>이름</td>
          </div>
        </Link><Link to={'/like/detail/8'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <img src={'/img/8.jpg'} />
            <td>이름</td>
          </div>
        </Link><Link to={'/like/detail/9'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <img src={'/img/9.jpg'} />
            <td>이름</td>
          </div>
        </Link><Link to={'/like/detail/10'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <img src={'/img/10.jpg'} />
            <td>이름</td>
          </div>
        </Link><Link to={'/like/detail/11'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <img src={'/img/11.jpg'} />
            <td>이름</td>
          </div>
        </Link><Link to={'/like/detail/12'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <img src={'/img/12.jpg'} />
            <td>이름</td>
          </div>
        </Link>

      </div>

    </div>




  );
};
export default LikeHome;