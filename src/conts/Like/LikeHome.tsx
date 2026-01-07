import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from '../gallery/gallery.module.css';
import axios from 'axios';
import { useAuth } from '../../comp/AuthProvider';

interface likeProfile {
  NUM: number;
  USERNAME: string;
  NICKNAME: string;
  BIRTH: string;
  PROFILEIMAGE: string;
}

const LikeHome: React.FC = () => {
  const { member } = useAuth();
  const [likelist, setLikeList] = useState<likeProfile[]>([]);
  // const [totalItems, setTotalItems] = useState(0);
  // const [totalPages, setTotalPages] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [startPage, setStartPage] = useState(1);
  // const [endPage, setEndPage] = useState(1);
  // const [searchType, setSearchType] = useState('1');
  // const [searchValue, setSearchValue] = useState('');
  // const [matchingTypeList, setMatchingTypeList] = useState<number[]>([]);
  // const [matchingValue, setMatchingValue] = useState<any>({});
  // const [period, setPeriod] = useState<{ start: string | null; finish: string | null }>({ start: null, finish: null });
  // const [detailSearch, setDetailSearch] = useState(false);
  // const [city, setCity] = useState("");


  const navigate = useNavigate();
  const imageBasePath = `${process.env.REACT_APP_BACK_END_URL}/imgfile/profileimage/`;

  const fetchLikeList = async (page: number) => {
    // const matchingdata = {
    //   cPage: page,
    //   matchingTypeList: matchingTypeList,
    //   matchingValue: matchingValue,
    //   searchType: searchType,
    //   searchValue: searchValue,
    //   period: period,
    // }
    try {
      const urls = `${process.env.REACT_APP_BACK_END_URL}/api/like/mylike`;

      const response = await axios.get(urls, { params: { nickname: member?.nickname }, withCredentials: true });
      // const responses = await axios.post(urls, matchingdata, {
      //               headers: {
      //                   'Content-Type': 'application/json'
      //               }
      //           })
      // console.log(response.data);
      // console.log(response.data.currentPage);
      // setLikeList(response.data.data);
      // setTotalItems(response.data.totalItems);
      // setTotalPages(response.data.totalPages);
      // setCurrentPage(response.data.currentPage);
      // setStartPage(response.data.startPage);
      // setEndPage(response.data.endPage);
      setLikeList(response.data);
    } catch (error) {
      console.log("데이터 가져오기 실패: " + error);
    }
  }

  useEffect(() => {
    fetchLikeList(1);
  }, [])

  //생년 >> 나이 함수
  const getAge = (birth: string): number => {
    const birthDate = new Date(birth);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // const pageChange = (page: number) => {
  //   if (page < 1 || page > totalPages) return;
  //   fetchLikeList(page);
  // };

  return (
    <div className={styles.container}>
      <h2 className={styles.title} style={{ fontSize: 40, fontWeight: 'bold' }}>Like</h2>
      <div className={styles.grid}>
        {likelist.map((e, i) => (
          <Link to={`/like/detail/${e.NUM}`} style={{ textDecoration: 'none' }} key={i}>
            <div className={styles.card}>
              <img src={`${imageBasePath}${e.PROFILEIMAGE}`} />
              <td>{e.NICKNAME} {getAge(e.BIRTH)}</td>
            </div>
          </Link>
        ))
        }
      </div>

      {/*페이징*/}
      {/* <div>
        <nav>
          <ul className='pagination justify-content-center'>
            {currentPage > 1 && (
              <li className='page-item'>
                <button className='page-link' onClick={() => {
                  pageChange(currentPage - 1)
                }}>이전</button>
              </li>


            )}
            {
              Array.from({ length: endPage - startPage + 1 }, (xx, i) => i + startPage)
                .map((page) => (
                  <li key={page} className={`page-item ${page ===
                    currentPage ? 'active' : ''}`}>
                    <button className='page-link' onClick={() => {
                      pageChange(page)
                    }}>{page}</button>
                  </li>

                ))
            }
            {currentPage < totalPages && (
              <li className='page-item'>
                <button className='page-link' onClick={() => {
                  pageChange(currentPage + 1)
                }}>다음 </button>
              </li>
            )}
          </ul>
        </nav>
      </div> */}

    </div>




  );
};
export default LikeHome;