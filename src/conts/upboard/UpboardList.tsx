import React, { useEffect, useState } from 'react'
import style from  './upboard.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'path';

interface UpBoardVO {
  num:number;
  title:string;
  writer:string;
  content:string;
  imgn:string;
  hit:number;
  reip:string;
  bdate:string;
}

const UpboardList: React.FC = () => {

  const [upboardlist, setUpboardList] =useState<UpBoardVO[]>([]);
  const [totalItems, setTotalItems] =useState(0);
  const [totalPages, setTotalPages] =useState(0);
  const [currentPage, setCurrentPage] =useState(1);
  const [startPage, setStartPage] =useState(1);
  const [endPage, setEndPage] =useState(1);

// 검색을 위한 useState를 추가
  const [searchType, setSearchType] =useState('1');
  const [searchValue, setSearchValue] =useState('');
  const pagePerBlock =5;


  const imageBasePath ='http://192.168.0.250/myictstudy/imgfile/';


  return (

    
    <div className={style.container}>
      <div className={style.fading}><h3>자유게시판</h3></div>
      <table className={style.boardTable}>
        <thead>
            
            
            <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
               
                <th>조회수</th>
                <th>좋아요</th>

            </tr>
        </thead>
        <tbody>
           <tr >
                <td style={{width:"70px"}}>1</td>
                <td><Link to={`/community/updetail/1`} className={style.titleLink} style={{color:"black"}}>월요일</Link></td>
                <td style={{width:"120px"}}>이문세</td>
               
                <td style={{width:"70px"}}>35</td>
                <td style={{width:"70px"}}>3</td>                
            </tr>
            <tr >
                <td style={{width:"70px"}}>2</td>
                <td><Link to={`/community/updetail/2`} className={style.titleLink} style={{color:"black"}}>화요일</Link></td>
                <td style={{width:""}}>변집섭</td>
                <td style={{width:"70px"}}>24</td>
                <td style={{width:"70px"}}>5</td> 
            </tr>
            <tr >
                <td style={{width:"70px"}}>3</td>
                <td><Link to={`/community/updetail/3`} className={style.titleLink} style={{color:"black"}}>수요일</Link></td>
                <td style={{width:"70px"}}>김광석</td>
               
                <td style={{width:"70px"}}>53</td>
                <td style={{width:"70px"}}>4</td> 
            </tr>
            <tr >
                <td style={{width:"70px"}}>4</td>
                <td><Link to={`/community/updetail/4`} className={style.titleLink} style={{color:"black"}}>목요일</Link></td>
                <td style={{width:"70px"}}>이소라</td>
               
                <td style={{width:"70px"}}>31</td>
                <td style={{width:"70px"}}>6</td> 
            </tr>
            <tr >
                <td style={{width:"70px"}}>5</td>
                <td><Link to={`/community/updetail/5`} className={style.titleLink} style={{color:"black"}}>금요일</Link></td>
                <td style={{width:"70px"}}>아이유</td>
               
                <td style={{width:"70px"}}>100</td>
                <td style={{width:"70px"}}>51</td> 
            </tr>
            <tr >
                <td style={{width:"70px"}}>6</td>
                <td><Link to={`/community/updetail/6`} className={style.titleLink} style={{color:"black"}}>토요일</Link></td>
                <td style={{width:"70px"}}>거미</td>
               
                <td style={{width:"70px"}}>77</td>
                <td style={{width:"70px"}}>3</td> 
            </tr><tr >
                <td style={{width:"70px"}}>7</td>
                <td><Link to={`/community/updetail/6`} className={style.titleLink} style={{color:"black"}}>일요일</Link></td>
                <td style={{width:"70px"}}>녹색지대</td>
               
                <td style={{width:"70px"}}>76</td>
                <td style={{width:"70px"}}>3</td> 
            </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={2} className='text-center align-midle'>
              <select onChange={(e)=>{setSearchType(e.target.value)}}>
                <option value="1">작성자</option>
                <option value="2">제목</option>
                <option value="3">내용</option>

              </select>
              <input type='text' onChange={(e)=>{setSearchValue(e.target.value)}}/>
              <button className='btn btn-warning' >검색

              </button>
            </th>      
                <td colSpan={3} style={{textAlign:"center"}}>
                  <nav>
                    <ul className='pagination justify-content-center'>
                      {startPage >1 && (
                        <li className='page-item'>
                          <button className='page-link' onClick={()=>{}}>
                            이전</button>
                        </li>
                      )}
                      {
                        Array.from({length:endPage-startPage+1}, (xx,i) =>i+startPage).map((page)=>(
                          <li key={page} className={`page-item ${page===currentPage?'active':''}`}>
                          <button className='page-link' onClick={()=>{}}>{page}</button>
                          </li>
                        ))                     
                      }
                       {endPage <totalPages &&(
                        <li className='page-item'>
                          <button className='page-link' onClick={()=>{}}>다음</button>
                        </li>
                       )}
                    </ul>
                  </nav>                 
                </td>
            </tr>
        </tfoot>
      </table>
      <div style={{textAlign:"right"}}><Link to="/community/upform" className={style.button}>글쓰기</Link></div>
    </div>
    
  )
}

export default UpboardList