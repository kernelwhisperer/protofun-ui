import React, { useEffect, useRef } from 'react';

import { createChart, ColorType  } from 'lightweight-charts';

// import { ExampleQueryDocument, ExampleQueryQuery, execute } from '../../.graphclient/index.js'
import graph from '../../.graphclient/index.js'
const { FetchBlocksDocument, execute } = graph

const result = await execute(FetchBlocksDocument, {})
console.log("📜 LOG > result:", result);

export const Chart = () => {
	console.log("📜 LOG > result:", result);
  const data = [
    { time: '2018-12-22', value: 32.51 },
    { time: '2018-12-23', value: 31.11 },
    { time: '2018-12-24', value: 27.02 },
    { time: '2018-12-25', value: 27.32 },
    { time: '2018-12-26', value: 25.17 },
    { time: '2018-12-27', value: 28.89 },
    { time: '2018-12-28', value: 25.46 },
    { time: '2018-12-29', value: 23.92 },
    { time: '2018-12-30', value: 22.68 },
    { time: '2018-12-31', value: 22.67 },
  ];
	const {
		colors: {
			backgroundColor = 'white',
			lineColor = '#2962FF',
			textColor = 'black',
			areaTopColor = '#2962FF',
			areaBottomColor = 'rgba(41, 98, 255, 0.28)',
		} = {},
	} = {};

	const chartContainerRef = useRef();
	console.log("📜 LOG > render ");

	useEffect(
		() => {
			const chart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				width: chartContainerRef.current.clientWidth,
				height: 300,
			});
			chart.timeScale().fitContent();
			
			const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
			// const barSeries = chart.addBarSeries({ upColor: '#26a69a', downColor: '#ef5350' });
			newSeries.setData(data);


			return () => {
				chart.remove();
			};
		},
		[data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor, chartContainerRef.current]
	);

	return (
		<div
			ref={chartContainerRef}
		/>
	);
}
