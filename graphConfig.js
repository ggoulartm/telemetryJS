const defaultGraphOptions = {
  type: "line",
  data: {
    datasets: [
      {
        tension: 0,
        fill: false,
        data: [0,0,0,0,0,0,0,0,0,0],
        pointRadius: 3,
        pointBackgroundColour:"#fc912e",
        pointHoverBackgroundColor: "rgb(0,0,255,1)",
        pointBorderColor:"#fc912e",
      },
    ],
    labels: [0,0,0,0,0,0,0,0,0,0],
  },
  options: {
    animation: false,
    plugins: {
        colors: {
          enabled: false
        }
    },
    responsive: true,
    legend: {
      display: false,
    },
    interaction: {
      intersect: false,
    },
    scales: {
      xAxes: [{ display: false }],
      yAxes: [
        {
          display: true,
        },
      ],
    },
    elements: {
      line: {
        borderWidth: 1,
        backgroundColor: "rgba(252,145,46,0.01)",
        borderColor: "rgb(252,145,46)",
      },
      point: {
        radius: 1,
        pointBackgroundColour:"rgba(255, 144, 0, 0 , 0.8)",
        pointHoverBackgroundColor: "rgb(0,0,255,1)",
        pointBorderColor:"rgba(111,222,333,0.5)",
      },
    },
  },
};
const defaultVGraphOptions = {
  ...defaultGraphOptions,
  options: {
    ...defaultGraphOptions.options,
    scales: {
      ...defaultGraphOptions.options.scales,
      yAxes: [
        {
          display: true,
          ticks: {
            min: 33,
            max: 45,
            stepSize: 2,
            callback: (value) => `${value} V`,
          },
        },
      ],
    },
  },
};
const defaultCGraphOptions = {
  ...defaultGraphOptions,
  options: {
    ...defaultGraphOptions.options,
    scales: {
      ...defaultGraphOptions.options.scales,
      yAxes: [
        {
          display: true,
          ticks: {
            min: 0,
            max: 100,
            stepSize: 25,
            callback: (value) => `${value} A`,
          },
        },
      ],
    },
  },
};
const defaultTGraphOptions = {
  ...defaultGraphOptions,
  options: {
    ...defaultGraphOptions.options,
    scales: {
      ...defaultGraphOptions.options.scales,
      yAxes: [
        {
          display: true,
          ticks: {
            min: 20,
            max: 60,
            stepSize: 10,
            callback: (value) => `${value} °C`,
          },
        },
      ],
    },
  },
};


