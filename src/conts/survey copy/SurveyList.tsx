import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './SurveyList.css';
import { useAuth } from '../../comp/AuthProvider';

interface SurveyContent {
    surveytype: string;
    surveytitle: string;
    surveyCnt: number;
}

interface Survey {
    num: number;
    sub: string;
    code: number;
    contents: SurveyContent[];
}
const SurveyList: React.FC = () => {
    const { member } = useAuth();
    const navigate = useNavigate();
    const [surveylist, setSurveyList] = useState<Survey[]>([]);

    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                const url = `${process.env.REACT_APP_BACK_END_URL}/api/survey/allList`
                const resp = await axios.get(url);
                setSurveyList(resp.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchSurveys();
    }, []);

    const SurveyClick = (num: number) => {
        navigate(`/surveyclient/${num}`);
    };

    return (
        <div className="survey-list-container container">
            <div className="survey-list-header mb-4">
                <h2 className="fw-bold">Survey List</h2>
                <p className="text-muted">참여하고 싶은 설문을 선택해주세요.</p>
            </div>

            <div className="survey-item-wrapper" style={{marginBottom:'45px'}}>
                {surveylist.map((survey) => (
                    <div
                        key={survey.num}
                        className="survey-item-card"
                        onClick={() => SurveyClick(survey.num)}
                    >
                        <div className="survey-item-info">
                            <span className="survey-num">No.{survey.num}</span>
                            <h3 className="survey-sub">{survey.sub}</h3>
                            <div className="survey-meta">
                                <span className="survey-code-badge">
                                    {survey.code}지 선택형
                                </span>
                                <span className="survey-content-count">
                                    문항 수: {survey.contents.length}개
                                </span>
                            </div>
                        </div>
                        <div className="survey-item-action">
                            <button className="enter-btn">참여하기</button>
                        </div>
                    </div>
                ))}
            </div>

            {surveylist.length === 0 && (
                <div className="text-center py-5 text-muted">
                    등록된 설문이 없습니다.
                </div>
            )}
            {
                member?.num === 0 && <button
                    className="survey-add-btn"
                    onClick={() => navigate('/surveyaddform')}
                    style={{ margin: '20px auto', marginTop: '35px' }}
                >
                    설문 등록
                </button>
            }

        </div>
    )
}

export default SurveyList