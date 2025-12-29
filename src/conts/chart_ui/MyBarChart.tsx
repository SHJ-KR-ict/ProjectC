import { Bar, Chart } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale,
    BarController, PointElement, Legend, Tooltip, ArcElement
} from "chart.js";

ChartJS.register(
    BarElement, CategoryScale, LinearScale, BarController, PointElement,
    Legend, Tooltip, ArcElement
)

const MyBarChart: React.FC = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Revenue",
        backgroundColor: "rgba(2,117,216,1)",
        borderColor: "rgba(2,117,216,1)",
        data: [4215, 5312, 6251, 7841, 9821, 14984],
      },
    ],
  };

  const options = {
    
    responsive: true,
    scales: {
        x:{
            time: {unit: 'month'},
            grid: {display: false},
            ticks: {maxTicksLimit: 6}
        },
        y:{
            min: 0,
            max: 15000,
            ticks: {
                maxTicksLimit: 5},
            grid: {display: true}
        }
    },
    plugins:{
        legend:{display:false}
    },
    maintainAspectRatio: false
  };

  return <Bar data={data} options={options} style={{ display: "block" }} className="chartjs-render-monitor" />
};

export default MyBarChart;
