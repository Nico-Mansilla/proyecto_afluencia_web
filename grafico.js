const xValues = ['8:00','','9:00','','10:00','','11:00','','12:00','','13:00','','14:00','','15:00','','16:00','','17:00','','18:00','','19:00','','20:00'];
const yValues = [3,6, 12,150, 50,60,50, 65, 50, 200, 12,6,3,3,6, 12,150, 50,60,50, 65, 50, 200, 12,6,3];
const barColors = ["orange"];

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: false,
      text: ""
    }
  }
});