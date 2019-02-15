import React from 'react';
import { scoreChartColor } from '../../utils/helper_functions';

const ScorePieChart = ({ score = 0 }) => {
    const circleColor = scoreChartColor(score);

    return (
        <div className="flex-wrapper justify-content-center">
            <div className="single-chart">
                <svg viewBox="0 0 36 36" className={`circular-chart ${circleColor}`}>
                {/* <path className="circle-bg"
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                /> */}
                <path className="circle"
                    strokeDasharray={`${score * 10}, 100`}
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="23.35" className="percentage">{score}</text>
                </svg>
            </div>
        </div>
    );
}

export default ScorePieChart;
