import React from 'react'
import HTMLFlipBook from 'react-pageflip';

interface MyBookProps {
    //책디자인의 너비와 높이 (필수)
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    className?: string; //우리가 만들 클래스 속성 적용
    //showCover 가 true이면 첫번째 페이지를 표지로 사용하겠다 
    showCover?: boolean;
    autoSize?: boolean;
    //페이지를 넘길때 그림자의 투명도값 (기본값 1 , 0 ~ 1)
    maxShadowOpacity?: number;
    mobileScrollSupport?: boolean;// 모바일 장치에서 스크롤로 넘길 것이냐
}
const myData = [
    {
        image: "image/bg1.png",
        title: "Date : 2025-12-17",
        text: "오늘의 애정운은 가볍고 경쾌한 리듬을 타고 흐릅니다. \n복잡하게 생각하던 감정이 의외로 쉽게 풀리며, 웃음 섞인 대화 속에서 마음의 거리가 빠르게 좁혀져요. "
    },
    {
        image: "image/bg2.png",
        title: "Date : 2025-12-18",
        text: "솔로라면 부담 없는 만남이 즐거운 설렘으로 이어질 수 있고, \n연인이라면 장난스러운 한마디가 하루 종일 기분 좋은 여운을 남깁니다. "
    },
    {
        image: "image/bg3.png",
        title: "Date : 2025-12-19",
        text: "완벽하지 않아도 괜찮다는 여유가 사랑을 더 자유롭고 행복하게 만들어주는 날입니다."
    },
    {
        image: "image/bg4.png",
        title: "Date : 2025-12-20",
        text: "급하지 않게 가꿔온 마음이 안정과 확신으로 돌아오며, 관계 속에서 ‘함께’라는 단어의 의미가 더욱 선명해져요."
    },
    {
        image: "image/bg5.png",
        title: "Date : 2025-12-21",
        text: "사랑은 기다림과 작은 노력이 쌓여, 언젠가 한 폭의 그림처럼 찬란한 결실로 피어날 것입니다."
    }
]

const Diary: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <h2 style={{fontFamily: 'sans-serif'}}>My Diary</h2>
            <div style={{
                width: '930px', height: '600px', margin: '20px auto',
                overflow: 'hidden', borderRadius: '10px',
                boxShadow: '0 8px 20px rgba(1, 12, 29, 0.2)'
            }}>
                {/* usePortrait={true} : 모바일에서 화면이 작으면 책이 한장(반응형웹) 
              {...({ style: {}, usePortrait: true } as any)} 
              기존의 스타일 인터페이스에 동적으로 추가 하기  
             */}
                <HTMLFlipBook width={450} height={600}
                    showCover={true}
                    {...({ style: {}, usePortrait: true } as any)}
                    autoSize={true} mobileScrollSupport={true}
                    maxShadowOpacity={0.2} usePortrait={true}
                    style={{ borderRadius: '12px' }}
                >
                    {/* myData에서 flatMap 사용해서 데이터를 반복 배치하기 
                1. 즉시 실행함수 를 선언한다.(function(){})()
                ,(() => ))()
                HTMLFlipBook 에 데이터를 배치한다.
            */}
                    {
                        (() => myData.flatMap((entry, idx) => [
                            //이미지 페이지
                            <div key={`img-${idx}`} style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: '#fff',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                overflow: 'hidden',
                            }}>
                                <img src={entry.image} alt={`Diary Image ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>,

                            //텍스트 페이지
                            <div key={`txt-${idx}`} style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: '#fff',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                lineHeight: '1.8',
                                alignItems: 'center',
                                padding: '20px',
                                fontSize: '18px',

                            }}>
                                <h3 style={{marginRight: 3,
                                            marginBottom: 13,
                                            marginLeft:3,
                                            marginTop:13, 
                                            fontSize: '20px', 
                                            fontWeight: 'bold', 
                                            textAlign: 'center' }}> 
                                {entry.title} 
                                </h3>
                                <p style={{ textAlign: 'center',    // 텍스트 자체 가로 중앙
                                            lineHeight: '1.8',      // 읽기 편한 줄 간격
                                            whiteSpace: 'pre-wrap', // \n 반영
                                            marginRight: 3,
                                            marginBottom: 13,
                                            marginLeft:3,
                                            marginTop:13               // 부트스트랩 기본 마진 제거
                                        }}>{entry.text}</p>
                            </div>

                        ]))()

                    }
                </HTMLFlipBook>
            </div>
        </div>
    )
}

export default Diary