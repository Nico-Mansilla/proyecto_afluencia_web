const xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
const yValues = [200, 100, 50, 25, 10,5,2];
const barColors = ["red", "green","blue","orange","brown"];

new Chart("myChart", {
  type: "bar",
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