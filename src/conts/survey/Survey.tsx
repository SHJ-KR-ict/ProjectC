import React from 'react'

const Survey: React.FC = () => {
    const formSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        localStorage.setItem('surveyCompleted','true');
        window.location.reload()
    }
  return (
    <div>
      <h2 style={{ color: 'lightpink' }}>Survey Please♡</h2>
      <form onSubmit={formSubmit}>
        성별<br/>
        <input type="radio" name='gender' value='female'/>여성
        <span style={{ marginLeft: '10px' }}/>
        <input type="radio" name='gender' value='male'/>남성
        <br/><br/>
        나이<br/>
        <select name="age">
            <option value="10">10대</option>
            <option value="20">20대</option>
            <option value="30">30대</option>
            <option value="40">40대</option>
        </select>
        <br/><br/>
        <input type="submit"/>
      </form>
    </div>
  )
}

export default Survey