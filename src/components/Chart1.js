import * as echarts from "echarts";
import { useEffect, useRef, useState } from "react";

const option = {
  title: {
    text: "NAMA CHARTNYA",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      animation: false,
    },
  },
  xAxis: {
    type: "time",
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    type: "value",
    boundaryGap: [0, "100%"],
    splitLine: {
      show: false,
    },
  },
  series: [
    {
      name: "Fake Data",
      type: "line",
      showSymbol: false,
      data: [],
    },
  ],
};

export default function Chart1({ data, label, title = "Chart" }) {
  const [chart, setChart] = useState();
  const chartRef = useRef();

  useEffect(
    function () {
      if (!chartRef.current) return;

      const chart = echarts.init(chartRef.current);

      chart.setOption(option);
      chart.setOption({
        title: {
          text: title,
        },
      });
      setChart(chart);

      window.addEventListener("resize", function () {
        chart.resize();
      });
    },
    [chartRef, title]
  );

  useEffect(() => {
    if (!chart) return;

    const dataObject = [];

    for (let i = 0; i < data.length; i++) {
      if (dataObject.length > 15) {
        dataObject.shift();
      }

      const formattedDate = formatDate(label[i]);
      dataObject.push({
        name: formattedDate,
        value: [formattedDate, data[i]],
      });
    }

    chart.setOption({
      series: [
        {
          data: dataObject,
        },
      ],
    });
  }, [chart, data, label]);

  function formatDate(dateHHMMSS) {
    const dateArr = dateHHMMSS.split(":");
    const now = new Date();
    now.setHours(dateArr[0]);
    now.setMinutes(dateArr[1]);
    now.setSeconds(dateArr[2]);

    const formattedDate = `${now.getFullYear()}/${now.getMonth()}/${now.getDay()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    return formattedDate;
  }

  return (
    <div
      ref={chartRef}
      id="line-chart"
      style={{
        height: "200px",
        width: "100%",
      }}
    ></div>
  );
}
