import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SurveyClient.css";
import { useNavigate, useParams } from "react-router-dom";


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

const SurveyClient: React.FC = () => {
  const { num } = useParams<string>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [selectedSurveyType, setSelectedSurveyType] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchLatestSurvey = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACK_END_URL}/api/survey/result/${num}`);
      if (response.status === 200) {
        console.log(response.data);
        setSurvey(response.data);
      } else {
        console.log("No survey data available.");
      }
    } catch (error) {
      console.error("Failed to fetch survey:", error);
    }
  };

  const submitSurvey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSurveyType || !survey) {
      alert("항목을 선택해주세요.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACK_END_URL}/api/survey/updateCount`, {
        subcode: survey.num,
        surveytype: selectedSurveyType,
      });

      if (response.status === 200) {
        alert("설문이 성공적으로 제출되었습니다.");

        navigate(`/surveyresult/${survey.num}`);
      } else {
        alert("설문 제출에 실패했습니다.");
      }
    } catch (error) {
      console.error("Failed to submit survey:", error);
      alert("설문 제출 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchLatestSurvey();
  }, []);

  if (!survey) {
    return <div>설문 데이터를 불러오는 중...</div>;
  }

  return (
    <div className="survey-detail-container">
      <h2>{survey.sub}</h2>
      <p className="survey-meta-text">문항 수: {survey.code}</p>

      <form onSubmit={submitSurvey}>
        <div className="survey-question-wrapper">
          {survey.contents.map((content, index) => (
            <div key={index} className="survey-option-item">
              <label className="survey-option-label">
                <input
                  type="radio"
                  name="surveytype"
                  value={content.surveytype}
                  onChange={(e) => setSelectedSurveyType(e.target.value)}
                  required
                />
                <span className="option-text">{content.surveytitle}</span>
              </label>
            </div>
          ))}
        </div>
        <div style={{display:'flex', gap:'10px'}}>
          <button type="submit" className="btn btn-primary">제출하기</button>
          <button type="button" className="btn btn-primary" onClick={() => { navigate(`/surveyresult/${survey.num}`) }}>결과보기</button>
        </div>
      </form>
    </div>
  );
};

export default SurveyClient;
