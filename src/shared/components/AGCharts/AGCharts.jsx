import React, { useState } from "react";
import { AgCharts } from "ag-charts-react";

function getData() {
    return [
        { asset: "Stocks", amount: 60000 },
        { asset: "Bonds", amount: 40000 },
        { asset: "Cash", amount: 7000 },
        { asset: "Real Estate", amount: 5000 },
        { asset: "Commodities", amount: 3000 },
    ];
}

export default function AGChart() {
    const [options, setOptions] = useState({
        data: getData(),
        title: {
            text: "Portfolio Composition",
        },
        series: [
            {
                type: "pie",
                angleKey: "amount",
                legendItemKey: "asset",
            },
        ],
    });

    return <AgCharts options={options} />;
}

// const root = createRoot(document.getElementById("root"));
// root.render(<AGChart />);