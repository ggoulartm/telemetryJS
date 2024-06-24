client = new Paho.MQTT.Client(brokerIp, brokerPort, username);

let interface = {};

window.onload = () => {
  interface = {
    ...interface,
    vGraph: new Chart(
      document.getElementById("vPack").getContext("2d"),
      defaultVGraphOptions
    ),
    cGraph: new Chart(
      document.getElementById("cPack").getContext("2d"),
      defaultCGraphOptions
    ),
    tGraph: new Chart(
      document.getElementById("tPack").getContext("2d"),
      defaultTGraphOptions
    ),
    infoList: infoIdList.reduce((accumulator, currentId) => {
      accumulator[currentId] = document.getElementById(currentId);
      return accumulator;
    }, {}),
  };

  client.connect({
    useSSL: true,
    timeout: 100,
    userName: username,
    password: password,
    onSuccess: () => {
      console.log("MQTT Connected Succesfully");
      client.subscribe("test");
      client.subscribe(GPS_Topic);
      client.subscribe(POWER_Topic);
      client.subscribe(TEMPERATURE_Topic1);
      client.subscribe(TEMPERATURE_Topic2);
      client.subscribe(VOLTAGE_Topic);
    },
  });
};

client.onConnectionLost = (responseObject) => {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
    client.connect({
    useSSL: true,
    timeout: 100,
    userName: username,
    password: password,
    onSuccess: () => {
      console.log("MQTT Connected Succesfully");
      client.subscribe("test");
      client.subscribe(GPS_Topic);
      client.subscribe(POWER_Topic);
      client.subscribe(VOLTAGE_Topic);
      client.subscribe(TEMPERATURE_Topic1);
      client.subscribe(TEMPERATURE_Topic2);
    },
  });
};

client.onMessageArrived = (message) => {
  const topic = message.destinationName;
  const data = message.payloadString.split(";");
  console.log(topic);
  console.log(data);
  const { SoC, cPackInfo, vPackInfo, tPackInfo, power } = interface.infoList;
  
  switch (topic) {
    case GPS_Topic:
        const payload = JSON.parse(data)
        console.log(payload.location.coordinates)
        location.lat = parseFloat(payload.location.coordinates[1])
        location.lng = parseFloat(payload.location.coordinates[0])
        window.placeMarker(location, window.marker)
        break;
    case POWER_Topic:
        boatBattery.power = Number(data[3]);
        power.innerHTML = `${boatBattery.power} W`;
        overTemperature.style.backgroundColor =
        data[2][0] == "1" || data[2][1] == "1" ? red : green;
        overCurrent.style.backgroundColor =
        data[2][2] == "1" || data[2][3] == "1" ? red : green;
        CHG.style.backgroundColor = data[2][4] == "1" ? red : green;
        DSG.style.backgroundColor = data[2][5] == "1" ? red : green;
        overVoltage.style.backgroundColor = data[2][6] == "1" ? red : green;
        underVoltage.style.backgroundColor = data[2][7] == "1" ? red : green;
        break;
    case "test":
        const payloadPower = JSON.parse(data);
        console.log(payloadPower);
        boatBattery.power=payloadPower.power
        boatBattery.vPack=payloadPower.voltage
        boatBattery.cPack=payloadPower.current
        console.log(boatBattery)
        updateCGraph(payloadPower.time);
        cPackInfo.innerHTML = `${boatBattery.cPack} A`;
        updateVGraph(payloadPower.time);
        vPackInfo.innerHTML = `${boatBattery.vPack} V`;
        power.innerHTML = `${boatBattery.power} W`;
        boatBattery.tPack=payloadPower.temperature
        tPackInfo.innerHTML = `${boatBattery.tPack} °C`;
        updateTGraph(payloadPower.time);
        boatBattery.SoC = payloadPower.SoC;
        SoC.innerHTML = `${boatBattery.SoC} %`;
        break;
    case VOLTAGE_Topic:
        boatBattery.SoC = parseInt(data[3]);
        SoC.innerHTML = `${boatBattery.SoC} %`;
        boatBattery.cPack = (parseInt(data[2]) + parseInt(data[1])) / 2;
        cPackInfo.innerHTML = `${boatBattery.cPack / 10} A`;
        updateCGraph();
        boatBattery.vPack = parseInt(data[0]);
        vPackInfo.innerHTML = `${boatBattery.vPack / 10} V`;
        updateVGraph();
        break;
    case TEMPERATURE_Topic1:
        boatBattery.cellTemp.cell4 = parseInt(data[3]);
        boatBattery.cellTemp.cell3 = parseInt(data[2]);
        boatBattery.cellTemp.cell2 = parseInt(data[1]);
        boatBattery.cellTemp.cell1 = parseInt(data[0]);
        boatBattery.tPack =
        Object.values(boatBattery.cellTemp).reduce((a, b) => a + b, 0) /
        Object.values(boatBattery.cellTemp).filter((val) => val !== 0)
          .length || 0;
        tPackInfo.innerHTML = `${boatBattery.tPack / 10} °C`;
        break;
    case TEMPERATURE_Topic2:
        boatBattery.cellTemp.cell8 = parseInt(data[3]);
        boatBattery.cellTemp.cell7 = parseInt(data[2]);
        boatBattery.cellTemp.cell6 = parseInt(data[1]);
        boatBattery.cellTemp.cell5 = parseInt(data[0]);
        boatBattery.tPack =
        Object.values(boatBattery.cellTemp).reduce((a, b) => a + b, 0) /
        Object.values(boatBattery.cellTemp).filter((val) => val !== 0)
          .length || 0;
        tPackInfo.innerHTML = `${boatBattery.tPack / 10} °C`;
        updateTGraph();
        break;
    default:
      break;
  }
};
