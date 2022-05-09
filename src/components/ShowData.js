import React from "react";
import { CanvasJSChart } from "canvasjs-react-charts";
import "./ShowData.css";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";

const getSequentialAndParallelTimes = (data) => {
    const dataLines = [];
    for (let i = 0; i < data.length; i++) {
        const dataLine = data[i].split("\n");
        const reqData = dataLine.filter(
            (dataLine1) => dataLine1.search("Finding") !== -1
        );
        const seq = reqData[0].split(" ");
        const para = reqData[1].split(" ");
        dataLines.push([
            parseFloat(seq[seq.length - 2]),
            parseFloat(para[para.length - 2]),
        ]);
    }
    return dataLines;
};

const getCount = (data) => {
    const count = [];
    for (let i = 0; i < data.length; i++) {
        const dataLine = data[i].split("\n");
        let cnt = 0;
        for (let j = 2; j < dataLine.length; j++) {
            if (dataLine[j].search("Finding") !== -1) {
                break;
            }
            cnt++;
        }
        count.push(cnt);
    }
    return count;
};

const getTableData = (data) => {
    const tableData = [];
    for (let i = 0; i < data.length; i++) {
        const dataLines = data[i].split("\n");
        const currData = [];
        for (let j = 2; j < dataLines.length; j++) {
            if (dataLines[j].search("Finding") !== -1) {
                break;
            }
            const newDataLine = dataLines[j].replace(/\s\s+/g, " ");
            currData.push(newDataLine.split(" "));
        }
        tableData.push(currData);
    }
    return tableData;
};

const ShowData = (props) => {
    const { data, fileNames } = props;
    const seqAndParaTimes = getSequentialAndParallelTimes(data);
    const options1 = {
        animationEnabled: true,
        title: {
            text: "Sequential VS Parallel Execution",
        },
        axisY: {
            title: "Time (in ms)",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC",
        },
        toolTip: {
            shared: true,
        },
        legend: {
            cursor: "pointer",
        },
        data: [
            {
                type: "column",
                name: "Sequential (ms)",
                legendText: "Sequential",
                showInLegend: true,
                dataPoints: seqAndParaTimes.map((times, index) => {
                    return { label: fileNames[index], y: times[0] };
                }),
            },
            {
                type: "column",
                name: "Parallel (ms)",
                legendText: "Parallel",
                showInLegend: true,
                dataPoints: seqAndParaTimes.map((times, index) => {
                    return { label: fileNames[index], y: times[1] };
                }),
            },
        ],
    };

    const diseaseCount = getCount(data);

    const options2 = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Count of Diseases",
        },
        axisY: {
            title: "Count",
        },
        data: [
            {
                type: "column",
                showInLegend: true,
                legendMarkerColor: "grey",
                legendText: "DNA Sequences",
                dataPoints: fileNames.map((fileName, index) => {
                    return { label: fileName, y: diseaseCount[index] };
                }),
            },
        ],
    };

    const tableData = getTableData(data);
    return (
        <div style={{ padding: "30px", textAlign: "center" }}>
            <div style={{ margin: "20px 0" }}>
                <CanvasJSChart options={options1} />
            </div>
            <div style={{ margin: "20px 0" }}>
                <CanvasJSChart options={options2} />
            </div>
            {tableData.map((tableData, index) => {
                return (
                    <div key={index}>
                        <h1>{fileNames[index]}</h1>
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Keyword</TableCell>
                                        <TableCell align="right">
                                            Count
                                        </TableCell>
                                        <TableCell align="right">
                                            Disease Name
                                        </TableCell>
                                        <TableCell align="right">
                                            Disease Diagnosis Result
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.map((data) => (
                                        <TableRow
                                            key={data[1]}
                                            sx={{
                                                "&:last-child td, &:last-child th":
                                                    {
                                                        border: 0,
                                                    },
                                            }}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {data[1]}
                                            </TableCell>
                                            <TableCell align="right">
                                                {data[2]}
                                            </TableCell>
                                            <TableCell align="right">
                                                {data[3]}
                                            </TableCell>
                                            <TableCell align="right">
                                                {data[4]}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                );
            })}
            <button onClick={() => props.fileUploaded(false)}>Okay</button>
        </div>
    );
};

export default ShowData;
