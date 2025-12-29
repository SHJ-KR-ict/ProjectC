import React from 'react'
import MyAreaChart from './MyAreaChart';
import MyBarChart from './MyBarChart';
import MyPieChart from './MyPieChart';

const Chart: React.FC = () => {

  return (
    <div className="container-fluid px-4" style={{ width: '1000px' }}>
      <h1 className="mt-4">통계</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item">
          <a href="/">메인</a>
        </li>
        <li className="breadcrumb-item active">통계</li>
      </ol>
      <div className="card mb-4" style={{width:'105%'}}>
        <div className="card-header">
          <img src="https://www.svgrepo.com/show/444991/chart-area-solid.svg" alt="area-chart-icon" className="svg-inline--fa fa-chart-area me-1" aria-hidden="true" />
          Area Chart Example
        </div>
        <div className="card-body">
          <MyAreaChart />
        </div>
        <div className="card-footer small text-muted">
          Updated yesterday at 11:59 PM
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="card mb-4" style={{display:'inline-block', width:'140%'}}>
            <div className="card-header">
              <img src="https://www.svgrepo.com/show/471054/bar-chart-08.svg" alt="area-chart-icon" className="svg-inline--fa fa-chart-area me-1" aria-hidden="true" />
              Bar Chart Example
            </div>
            <div className="card-body">
              <MyBarChart />
            </div>
            <div className="card-footer small text-muted">
              Updated yesterday at 11:59 PM
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card mb-4" style={{display:'inline-block', width:'72%',marginLeft:'38%'}}>
            <div className="card-header">
              {/* https://www.svgrepo.com/show/394348/pie-chart-2.svg */}
              <img src="https://www.svgrepo.com/show/471054/bar-chart-08.svg" alt="area-chart-icon" className="svg-inline--fa fa-chart-area me-1" aria-hidden="true" />
              Bar Chart Example
            </div>
            <div className="card-body">
              <MyPieChart />  
            </div>
            <div className="card-footer small text-muted">
              Updated yesterday at 11:59 PM
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Chart