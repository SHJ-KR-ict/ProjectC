import axios from 'axios';
import React, { useEffect, useState } from 'react'

//부모로부터 전송되어 오는 properties
interface UpboardCommProps {
    num?:string;
}
//서버로부터 전송되어 오는 json구조를 인터페이스로 선언
interface UpboardCommVO {
  num:number;
  ucode:number;
  uwriter: string;
  ucontent: string;
  reip: string;
  uregdate: string;
}

const UpboardComm: React.FC<UpboardCommProps> = ({num}) => {


    const [comments, setComments] =useState<UpboardCommVO[]>([]);
    const getComments =async() =>{
        try{
            const url =`http://192.168.0.250/myictstudy/upboard/upcommlist?num=${num}`;
            const response = await axios.get<UpboardCommVO[]>(url);
            console.log("$$$$$$$$$$$$$")
            console.log(response.data);
            setComments(response.data);
        }catch(error){
            console.log("데이터 로딩 실패!", error);
        }
    }

    useEffect(() =>{
        console.log("Num" +num);
        getComments();        
    },[num]);
    //폼에서 입력한 값을 onCange 이벤트가 발생할 때 마다 값을 저장하기 위한 저장장소를 선언한다.
    const [writer, setWriter] =useState("");
    const [content, setContent] =useState("");
    const commentSubmit =async (e:React.FormEvent) =>{
        e.preventDefault();
        console.log(`writer =>${writer}`);
        console.log(`Content =>${content}`);
        //useState에서 받아온 데이터를 json화 하기
        //이때 키 : 값 일때는 키는 UpBoardCommVO의 property와 같아야 한다.

        const commentData={
            ucode:num,
            uwriter:writer,
            ucontent:content,
            // reip:'192.168.0.9'  --> 자동 입력으로 설정함
        }
        //axios.post(url,data,{headers:{'Content-Type':'application/json='}})
        try {
            await axios.post(`http://192.168.0.250/myictstudy/upboard/upcommAdd`, commentData, 
                {headers:{'Content-Type':'application/json'}})
            //입력 후 초기화 및 댓글 리스트 다시 실행    
            setWriter("");
            setContent("");
            getComments();
        } catch (error) {
            
        }
    }

  return (
    <div className='mt-4'>
        <h4>Comments</h4>
        <form className='mb-3' onSubmit={commentSubmit}>
            <div className='mb-2'>
                <input type='text' placeholder='작성자' className='form-control' onChange={(e) => setWriter(e.target.value)}/>
            </div>
            <div className='mb-2'>
                <textarea className='form-control' placeholder='댓글' onChange={(e)=>setContent(e.target.value)}></textarea>
            </div>
            <div className='text-center'>
                <button type="submit" className='btn btn-primary' >댓글작성</button>
            </div>
        </form>
      
      <ul className='list-group'>
        {
            comments.map((vo)=>(
                <li key={vo.num} className='list-group-item'>
                    <strong>{vo.uwriter}</strong>
                    <span className='text-muted'>{vo.uregdate}</span>
                    <p>{vo.ucontent}&nbsp;&nbsp;&nbsp;{vo.reip}</p>
                    
                </li>
            ))
        }
      </ul>
    </div>
  )
}

export default UpboardComm