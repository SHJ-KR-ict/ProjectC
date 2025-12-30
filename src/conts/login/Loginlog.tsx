import React from 'react'

const Loginlog: React.FC = () => {
  return (
    <div >
      <table style={{margin:'0 auto'}}>
        <thead>
          <tr>
            <td>
              <h2>LoginLog</h2>
            </td>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            2025-12-19 16:10 XX님이 로그인 하였습니다
          </td>
        </tr>
        <tr>
          <td>
            2025-12-19 16:11 XX님이 로그아웃 하였습니다
          </td>
        </tr>
        <tr>
          <td>
            2025-12-19 16:12 XX님이 로그인 하였습니다
          </td>
        </tr>
        <tr>
          <td>
            2025-12-19 16:13 XX님이 로그아웃 하였습니다
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Loginlog