import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SurveyClientResult.css";
import { useParams } from "react-router-dom";
/*

{
  "num": 5,
  "sub": "내일 회식때 베스트 음식은?",
  "code": 2,
  "sdate": "2025-12-18 17:54:44",
  "contents": [
    {
      "surveytype": "B",
      "surveytitle": "닭도리탕",
      "surveycnt": 3
    },
    {
      "surveytype": "A",
      "surveytitle": "치킨",
      "surveycnt": 0
    }
  ]
}
*/
interface SurveyContent {
  surveytype: string;
  surveytitle: string;
  surveycnt: number;
}

interface Survey {
  num: number;
  sub: string;
  code: number;
  sdate:string;
  contents: SurveyContent[];
}

const SurveyClientResult: React.FC = () => {
  const { num } = useParams<{ num: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);

  useEffect(() => {
    const fetchLatestSurvey = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACK_END_URL}/api/survey/result/${num}`);
        if (response.status === 200) {
          setSurvey(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch survey results:", error);
      }
    };

    fetchLatestSurvey();
  }, [num]);

  if (!survey) {
    return <div>결과를 불러오는 중...</div>;
  }

  // 전체 투표 수 계산
  const totalVotes = survey.contents.reduce((sum, content) => sum + content.surveycnt, 0);

  return (
    <div className="result-container">
      <h2>{survey.sub} - 투표 결과</h2>
      <div className="results">
        {survey.contents.map((content, index) => {
          const percentage = totalVotes > 0 
            ? Math.round((content.surveycnt / totalVotes) * 100) 
            : 0;

          return (
            <div key={index} className="result-item">
              <div className="result-label">
                {content.surveytitle} ({content.surveycnt}표)
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="percentage">{percentage}%</div>
            </div>
          );
        })}
      </div>
      <div className="total-votes">
        총 투표 수: {totalVotes}
      </div>
    </div>
  );
};

export default SurveyClientResult;