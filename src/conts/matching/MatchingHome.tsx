import React, { useEffect, useState } from 'react'
import styles from './MatchingHome.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios';

interface MatchingVO {
    NUM: number;
    NICKNAME: string;
    BIRTH: string;
    PROFILEIMAGE: string;
}

const MatchingHome: React.FC = () => {
    const [matchingList, setMatchingList] = useState<MatchingVO[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(1);
    const [searchType, setSearchType] = useState('1');
    const [searchValue, setSearchValue] = useState('');
    const [matchingTypeList, setMatchingTypeList] = useState<number[]>([]);
    const [matchingValue, setMatchingValue] = useState({});
    const [period, setPeriod] = useState({ start: '', finish: '' });
    const imageBasePath = `${process.env.REACT_APP_BACK_END_URL}/imgfile/profileimage/`;

    const fetchMatchingList = async (page: number) => {
        const matchingdata = {
            matchingTypeList: matchingTypeList,
            matchingValue: {
                ...matchingValue,
            },
            searchType: searchType,
            searchValue: searchValue,
            period: period,
        }
        try {
            const urls = `${process.env.REACT_APP_BACK_END_URL}/matching/matchinglist`
            const response = await axios.post(urls, matchingdata, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log((response.data));
            console.log(response.data.currentPage);
            setMatchingList(response.data.data)
            setTotalItems(response.data.totalItems);
            setTotalPages(response.data.totalPages);
            setCurrentPage(response.data.currentPage);
            setStartPage(response.data.startPage);
            setEndPage(response.data.endPage);
        } catch (error) {
            console.log("데이터 가져오기 실패: " + error);
        }
    }

    useEffect(() => {
        fetchMatchingList(currentPage)
    }, [currentPage]);

    const pageChange = (page: number) => {
        setCurrentPage(page);
    }

    const searchFunction = () => {
        fetchMatchingList(1);
    }

    const getAge = (birthStr: string): number => {
        const birthDate = new Date(birthStr);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title} style={{ fontWeight: 'bold', marginBottom: 30 }}>당신의 PICK은 무엇인가요?</h2>
            <div className={styles.grid}>
                {matchingList.map(item => (
                    <Link to={`/matchingHome/${item.NUM}`} key={item.NUM} style={{ textDecoration: 'none' }}>
                        <div className={styles.card}>
                            <img src={`${imageBasePath}${item.PROFILEIMAGE}`} alt={item.PROFILEIMAGE} />
                            <div className={styles.cardtitle} >{item.NICKNAME}, {getAge(item.BIRTH)}세</div>
                        </div>
                    </Link>
                ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 30 }}>
                <button className={styles.button}>다시 매칭하기</button>
            </div>
            <br />
            <div style={{ textAlign: 'center' }}>
                <select onChange={(e) => { setSearchType(e.target.value) }}>
                    <option value='1'>닉네임</option>
                    <option value='2'>나이</option>
                </select>
                &nbsp;
                {searchType === '1' && <input type="text" onChange={(e) => { setSearchValue(e.target.value) }} />}
                {searchType === '2' && (
                    <div style={{ display: 'inline-block' }}>
                        <input
                            type="date"
                            onChange={(e) => setPeriod(prev => ({ ...prev, start: e.target.value }))}
                        />
                        ~~
                        <input
                            type="date"
                            onChange={(e) => setPeriod(prev => ({ ...prev, finish: e.target.value }))}
                        />
                    </div>
                )}&nbsp;
                <button className='btn btn-warning' onClick={searchFunction}>검색</button>
            </div>
            <br />
            <div>
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
            </div>
        </div>
    )
}

export default MatchingHome