import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(
  ArcElement, Tooltip, Legend
)

const MyPieChart = () => {
  const data = {
    labels: ["Blue", "Red", "Yellow", "Green"],
    datasets: [
      {
        data: [12.21, 15.58, 11.25, 8.32],
        backgroundColor: ["#2f00ffff", "#dc3545", "#ffc107", "#28a745"],
      },
    ],
  };

  return <Pie data={data} options={{maintainAspectRatio: false}} className="chartjs-render-monitor" style={{ display: "block" }} />
};

export default MyPieChart;