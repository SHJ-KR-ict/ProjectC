import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './gallery.module.css';
import axios from 'axios';


interface GalleryVO {
  NUM: number;
  TITLE: String;
  WRITER: String;
  CONTENTS: string;
  REIP?: string;
  HIT?: string;
  GDATE?: string;
  IMAGENAME: string;    //json data는 대소문자 구분함.
}
const Gallery: React.FC = () => {
  const [upboardlist, setUpboardList] = useState<GalleryVO[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);

  // 검색을 위한 useState를 추가
  const [searchType, setSearchType] = useState('1');
  const [searchValue, setSearchValue] = useState('');
  const pagePerBlock = 5;

  return (
    <div className={styles.container}>
      <div className={styles.fading}>
        <h3 className={styles.title} >자랑하기</h3></div>
      <div style={{ textAlign: 'right', marginBottom: '15px' }}>
        <Link to="/gallery/write" className={styles.button}>글쓰기</Link>
      </div>
      <div className={styles.grid}>


        <Link to={'/gallery/gdetail/1'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <img src={'./imge/1.jpg'} />
            제목
          </div>
        </Link>
        <Link to={'/gallery/gdetail/2'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <img src={'./imge/2.jpg'} />
            <div>야경 같이봐요~</div>
          </div>
        </Link><Link to={'/gallery/gdetail/3'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <img src={'./imge/3.jpg'} />
            <div>제목</div>
          </div>
        </Link><Link to={'/gallery/gdetail/4'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <img src={'/imge/4.jpg'} />
            <div>제목</div>
          </div>
        </Link><Link to={'/gallery/gdetail/5'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <img src={'/imge/5.jpg'} />
            <div>불금이래요~</div>
          </div>
        </Link><Link to={'/gallery/gdetail/6'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <img src={'/imge/6.jpg'} />
            <div>우리 결혼했어요~</div>
          </div>
        </Link><Link to={'/gallery/gdetail/7'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <img src={'/imge/7.jpg'} />
            <div>제목</div>
          </div>
        </Link><Link to={'/gallery/gdetail/8'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <img src={'/imge/8.jpg'} />
            <div>제목</div>
          </div>
        </Link><Link to={'/gallery/gdetail/9'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <img src={'/imge/9.jpg'} />
            <div>제목</div>
          </div>
        </Link><Link to={'/gallery/gdetail/10'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <img src={'/imge/10.jpg'} />
            <div>제목</div>
          </div>
        </Link><Link to={'/gallery/gdetail/11'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <img src={'/imge/11.jpg'} />
            <div>제목</div>
          </div>
        </Link><Link to={'/gallery/gdetail/12'} style={{ textDecoration: 'none' }}>
          <div className={styles.card}>
            <img src={'/imge/12.jpg'} />
            <div>제목</div>
          </div>
        </Link>

      </div>


      <tfoot>
        <table className={styles.container} >
        <td style={{width:"500px", textAlign:"center",margin:"10px" , borderRadius:"8px"}}>
          <select onChange={(e) => { setSearchType(e.target.value) }}>
            <option value="1">작성자</option>
            <option value="2">제목</option>
            <option value="3">내용</option>

          </select>
          <input type='text' onChange={(e) => { setSearchValue(e.target.value) }} />
          <button className='btn btn-warning' >검색

          </button>

        </td>
        <td style={{width:"500px", textAlign:"center", borderRadius:"8px" }}>
          <ul className='pagination justify-content-center'>
            {startPage > 1 && (
              <li className='page-item'>
                <button className='page-link' onClick={() => { }}>
                  이전</button>
              </li>
            )}
            {
              Array.from({ length: endPage - startPage + 1 }, (xx, i) => i + startPage).map((page) => (
                <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
                  <button className='page-link' onClick={() => { }}>{page}</button>
                </li>
              ))
            }
            {endPage < totalPages && (
              <li className='page-item'>
                <button className='page-link' onClick={() => { }}>다음</button>
              </li>
            )}
          </ul></td></table>
      </tfoot>

    </div>

  );
};

export default Gallery;