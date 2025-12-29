import React, { useRef, useState } from "react";
import Style from "../../comp/Navbar.module.css";
import MyPieChart from "./MyPieChart";
import MyBarChart from "./MyBarChart";
import MyAreaChart from "./MyAreaChart";

const DropdownChart: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={Style.dropdown} style={{ marginTop: 14 }}>
      <div
        onClick={toggleDropdown}
        className={Style.link}
        style={{
          font: "icon",
          textDecoration: "underline",
          textUnderlineOffset: "5px",
          fontWeight: "bolder",
        }}
      >
        매칭 통계<span className={Style.arrow}>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className={Style.dropdownContent}>
          <div
            id="myCarousel"
            className="carousel slide mb-6"
            data-bs-ride="carousel"
            style={{ backgroundColor: "#000" }}
          >
            <div className="carousel-inner">
              <div className="carousel-item">
                <div className="bd-placeholder-img">
                  <MyAreaChart />
                </div>
                <div>
                  <h2>1번 차트</h2>
                </div>
              </div>
              <div className="carousel-item">
                <div className="bd-placeholder-img">
                  <MyBarChart />
                </div>
                <div>
                  <h2>2번 차트</h2>
                </div>
              </div>
              <div className="carousel-item active">
                <div className="bd-placeholder-img">
                  <MyPieChart />
                </div>
                <div>
                  <h2>3번 차트</h2>
                </div>
              </div>
            </div>
            <div>
              <button
                // className="carousel-control-prev"
                type="button"
                data-bs-target="#myCarousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                // className="carousel-control-next"
                type="button"
                data-bs-target="#myCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownChart;
