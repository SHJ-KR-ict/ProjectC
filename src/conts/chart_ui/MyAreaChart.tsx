import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const MyAreaChart = () => {
  const data = {
    labels: [
      "Mar 1", "Mar 2", "Mar 3", "Mar 4", "Mar 5", "Mar 6", "Mar 7",
      "Mar 8", "Mar 9", "Mar 10", "Mar 11", "Mar 12", "Mar 13"
    ],
    datasets: [
      {
        fill: {
          target: 'origin',
          above: "rgba(2,117,216,0.2)",
        },
        label: "Sessions",
        tension: 0.3,
        backgroundColor: "rgba(2,117,216,0.2)",
        borderColor: "rgba(2,117,216,1)",
        pointRadius: 5,
        pointBackgroundColor: "rgba(2,117,216,1)",
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(2,117,216,1)",
        pointHitRadius: 50,
        borderWidth: 2,
        data: [
          20, 25, 24, 27, 34,
          26, 37, 30, 39, 40,
          45, 30, 46
        ]
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: { display: false },
        ticks: { maxTicksLimit: 7 }
      },
      y: {
        min: 0,
        max: 60,
        ticks: { maxTicksLimit: 5 },
        grid: { color: "rgba(0,0,0,.125)" }
      }
    },
    plugins: {
      legend: { display: false }
    },
    maintainAspectRatio: false
  };

  return <Line data={data} options={options} style={{ display: "block" }} className="chartjs-render-monitor" />;
}
export default MyAreaChart