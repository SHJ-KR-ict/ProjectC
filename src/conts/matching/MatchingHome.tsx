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
    const [matchingValue, setMatchingValue] = useState<any>({});
    const [period, setPeriod] = useState<{ start: string | null; finish: string | null }>({ start: null, finish: null });
    const [detailSearch, setDetailSearch] = useState(false);
    const imageBasePath = `${process.env.REACT_APP_BACK_END_URL}/imgfile/profileimage/`;
    const [city, setCity] = useState("");

    const addressData: { [key: string]: string[] } = {
        '서울': ['강남구', '강동구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구',
            '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
        '부산': ['강서구', '금정구', '기장군', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구'],
        '대구': ['남구', '달서구', '달성군', '동구', '북구', '서구', '수성구', '중구', '군위군'],
        '인천': ['강화군', '계양구', '미추홀구', '남동구', '동구', '부평구', '서구', '연수구', '옹진군', '중구'],
        '광주': ['광산구', '남구', '동구', '북구', '서구'],
        '대전': ['대덕구', '동구', '서구', '유성구', '중구'],
        '울산': ['남구', '동구', '북구', '울주군', '중구'],
        '123': ['123']
    };

    const handleTypeToggle = (type: number) => {
        setMatchingTypeList(prev =>
            (prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type])
        );
    };

    const fetchMatchingList = async (page: number) => {
        const saved = sessionStorage.getItem('matchingSearchData');
        const p = saved ? JSON.parse(saved) : null;
        const matchingdata = {
            cPage: page,
            matchingTypeList: p ? p.matchingTypeList : matchingTypeList,
            matchingValue: p ? p.matchingValue : matchingValue,
            searchType: p ? p.searchType : searchType,
            searchValue: p ? p.searchValue : searchValue,
            period: p ? p.period : period,
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
            setMatchingList(response.data.data);
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
        const saved = sessionStorage.getItem('matchingSearchData');
        if (saved) {
            const p = JSON.parse(saved);
            setSearchType(p.searchType);
            setSearchValue(p.searchValue);
            setMatchingTypeList(p.matchingTypeList);
            setMatchingValue(p.matchingValue);
            setPeriod(p.period);
            setCity(p.city);
            setDetailSearch(p.detailSearch);
            setCurrentPage(p.currentPage || 1);
            fetchMatchingList(p.currentPage || 1);
        } else {
            fetchMatchingList(1);
        }
    }, []);

    useEffect(() => {
        const saved = sessionStorage.getItem('matchingSearchData');
        if (saved) {
            const p = JSON.parse(saved);
            if (currentPage !== p.currentPage) {
                const updatedData = { ...p, currentPage: currentPage };
                sessionStorage.setItem('matchingSearchData', JSON.stringify(updatedData));
                fetchMatchingList(currentPage);
            }
        } else if (currentPage !== 1) {
            fetchMatchingList(currentPage);
        }
    }, [currentPage]);

    const pageChange = (page: number) => {
        setCurrentPage(page);
    }

    const searchFunction = () => {
        if (!searchValue.trim() && matchingTypeList.length === 0) {
            sessionStorage.removeItem('matchingSearchData');
            fetchMatchingList(1);
            return;
        }
        const searchData = {
            currentPage: 1,
            searchType,
            searchValue,
            matchingTypeList,
            matchingValue,
            period,
            city,
            detailSearch
        };
        sessionStorage.setItem('matchingSearchData', JSON.stringify(searchData));
        fetchMatchingList(1);
    }

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

    return (
        <div className={styles.container}>
            <h2 className={styles.title} style={{ fontWeight: 'bold', marginBottom: 30 }}>당신의 PICK은 무엇인가요?</h2>
            <div className={styles.grid}>
                {/*리스트*/}
                {matchingList.map(item => (
                    <Link to={`/matchingHome/${item.NUM}`} key={item.NUM} style={{ textDecoration: 'none' }}>
                        <div className={styles.card}>
                            <img src={`${imageBasePath}${item.PROFILEIMAGE}`} alt={item.PROFILEIMAGE} />
                            <div className={styles.cardtitle} >{item.NICKNAME}, {getAge(item.BIRTH)}세</div>
                        </div>
                    </Link>
                ))}
            </div>
            <br />
            {/*페이징*/}
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
            {/*검색창*/}
            <div style={{ textAlign: 'center' }}>
                <select onChange={(e) => { setSearchType(e.target.value) }}>
                    <option value='1'>닉네임</option>
                    <option value='2'>나이</option>
                </select>
                &nbsp;
                {searchType === '1' && <input
                    type="text"
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                    value={searchValue}
                    placeholder='검색'
                />}
                {searchType === '2' && (
                    <div style={{ display: 'inline-block' }}>
                        <input
                            type="date"
                            onChange={(e) => setPeriod(prev => ({ ...prev, start: e.target.value || null }))}
                            value={period.start || ""}
                        />
                        ~~
                        <input
                            type="date"
                            onChange={(e) => setPeriod(prev => ({ ...prev, finish: e.target.value || null }))}
                            value={period.finish || ""}
                        />
                    </div>
                )}&nbsp;
                <button className='btn btn-warning' onClick={searchFunction}>검색</button>
                &nbsp;&nbsp;
                <button
                    className={`btn ${detailSearch ? 'btn-dark' : 'btn-outline-dark'}`}
                    onClick={() => setDetailSearch(!detailSearch)}
                >
                    검색옵션
                </button>
                {/*세부검색*/}
                {detailSearch && <div style={{ padding: '20px', backgroundColor: '#e9e9e9', borderRadius: '10px', marginBottom: '20px', width: '60%', margin: '0 auto', marginTop: '10px' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <label><input type="checkbox" checked={matchingTypeList.includes(1)}
                            onChange={() => {
                                if (matchingTypeList.includes(1)) {
                                    setMatchingValue(({ country, ...rest }: any) => rest)
                                }
                                handleTypeToggle(1)
                            }} /> 국적 </label>
                        &nbsp;&nbsp;
                        <label><input type="checkbox" checked={matchingTypeList.includes(2)}
                            onChange={() => {
                                if (matchingTypeList.includes(2)) {
                                    setMatchingValue(({ address, ...rest }: any) => rest);
                                    setCity('');
                                }
                                handleTypeToggle(2)
                            }} /> 거주지 </label>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        {matchingTypeList.includes(1) && (
                            <select
                                onChange={(e) =>
                                    setMatchingValue({ ...matchingValue, country: e.target.value || null })}
                                value={matchingValue.country || ""}
                            >
                                <option value="">국적</option>
                                <option value="한국">한국</option>
                                <option value="미국">미국</option>
                                <option value="일본">일본</option>
                            </select>
                        )}

                        {matchingTypeList.includes(2) && (
                            <>
                                <select value={city} onChange={(e) => {
                                    setCity(e.target.value);
                                    setMatchingValue({ ...matchingValue, address: e.target.value || null });
                                }}>
                                    <option value="">시 선택</option>
                                    {Object.keys(addressData).map(city => <option key={city} value={city}>{city}</option>)}
                                </select>

                                <select
                                    disabled={!city}
                                    onChange={(e) => setMatchingValue({
                                        ...matchingValue,
                                        address: e.target.value ? `${city} ${e.target.value}` : city
                                    })}
                                >
                                    <option value="">구/군 선택</option>
                                    {city && addressData[city].map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </>
                        )}
                    </div>
                </div>}
            </div>
            <br />
        </div>
    )
}

export default MatchingHome