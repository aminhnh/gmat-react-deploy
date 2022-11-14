import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';

const option = {
    title: {
      text: 'Speed'
    },
      axisPointer: {
        animation: false
      }
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
        show: false
      }
    },
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        showSymbol: false,
        data: data
      }
    ],
};

function Chart1({ data, label}){
    const [chart, setChart] = useState();
    const chartRef = useRef();

    // useEffect {
    //     function(){
    //         if ()
    //     }
    // }

    return {
        <div 
        ref= {chartRef} 
        id="line-chart" 
        style={{
            height: '200px',
            width: '100%',
        }}
        ></div>
    };
}


export default Chart1;