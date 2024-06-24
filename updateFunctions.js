function updateCGraph(time) {
     interface.cGraph.data.labels.shift();
  interface.cGraph.data.labels.push(time);
  interface.cGraph.data.datasets[0].data.shift();
    interface.cGraph.data.datasets[0].data.push(boatBattery.cPack);
  
  interface.cGraph.update();
}

function updateVGraph(time) {
    interface.vGraph.data.labels.shift();
  interface.vGraph.data.labels.push(time);
  interface.vGraph.data.datasets[0].data.shift();
  interface.vGraph.data.datasets[0].data.push(boatBattery.vPack);
    
  interface.vGraph.update();
}

function updateTGraph(time) {
    interface.tGraph.data.labels.shift();
  interface.tGraph.data.labels.push(time);
  interface.tGraph.data.datasets[0].data.shift();
  interface.tGraph.data.datasets[0].data.push(boatBattery.tPack);
  interface.tGraph.update();
}
