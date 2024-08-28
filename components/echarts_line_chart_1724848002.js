<!--
INSTRUCTION: To add this component to the user's app, you must follow these steps:
INSTRUCTION: - You are given the correct SQL statement -- replace the `PLACEHOLDER_SQL_STATEMENT` variable in this file with the actual SQL statement.
-->

<template>
    <div style="display: flex; justify-content: center;">
        <div id="line-chart" style="width: 100vw; height: 50vh;"></div>
    </div>
</template>

<script>
export default {
    name: 'EchartsLineChart',
    data() {
        return {
            tableItems: [],
            tableHeaders: [],
            SQL_statement: 'PLACEHOLDER_SQL_STATEMENT',
        }
    },
    mounted() {
        this.fetchDataFromDatabase(this.SQL_statement)
            .then(([tableHeaders, tableItems]) => {
                this.tableHeaders = tableHeaders;
                this.tableItems = tableItems;
                this.prepareDataForLineChart(tableHeaders, tableItems)
                    .then(chartData => {
                        this.renderLineChart(chartData);
                    });
            });
    },
    methods: {
        fetchDataFromDatabase(SQL_statement) {
            return axios.post('https://nl2sql-prod.azurewebsites.net/execute_sql', { query: SQL_statement })
                .then(response => {
                    const tableItems = response.data.result;
                    if (tableItems.length > 0) {
                        const tableHeaders = Object.keys(tableItems[0]);
                        this.tableItems = tableItems;
                        this.tableHeaders = tableHeaders;
                        return [tableHeaders, tableItems];
                    }
                });
        },
        prepareDataForLineChart(tableHeaders, tableItems) {
            return new Promise((resolve) => {
                let xAxisData = [];
                let yAxisData = [];
                let xAxisCandidate = null;
                let yAxisCandidate = null;

                for (let header of tableHeaders) {
                    let hasNonEmptyStringValues = tableItems.some(item => typeof item[header] === "string" && item[header] !== "" && !item[header].startsWith('{') && 
                        !item[header].startsWith('(') && !item[header].startsWith('['));
                    if (hasNonEmptyStringValues) {
                        xAxisCandidate = header;
                        console.log('X-axis candidate:', xAxisCandidate);
                        break;
                    }
                }

                if (!xAxisCandidate) {
                    console.log('Unable to find suitable X-axis data. Returning empty chart data.');
                    resolve({ xAxisCandidate: null, yAxisCandidate: null, xAxisData: [], yAxisData: [] });
                    return;
                }

                xAxisData = tableItems.map(item => {
                    let value = item[xAxisCandidate];
                    if (typeof value === "string" && !value.startsWith('{')) {
                        return value;
                    } else {
                        console.log(`Skipping value "${value}" for X-axis data.`);
                        return null;
                    }
                }).filter(value => value !== null);

                for (let header of tableHeaders) {
                    if (header !== xAxisCandidate) {
                        let hasNumericOrParsableValues = tableItems.some(item => {
                            let value = item[header];
                            return typeof value === "number" || (typeof value === "string" && !isNaN(parseFloat(value)) && !value.startsWith('0x'));
                        });
                        if (hasNumericOrParsableValues) {
                            yAxisCandidate = header;
                            console.log('Y-axis candidate:', yAxisCandidate);
                            break;
                        }
                    }
                }

                if (!yAxisCandidate) {
                    console.log('Unable to find suitable Y-axis data. Returning empty chart data.');
                    resolve({ xAxisCandidate: null, yAxisCandidate: null, xAxisData: [], yAxisData: [] });
                    return;
                }

                for (let item of tableItems) {
                    let yValue = item[yAxisCandidate];
                    if (typeof yValue === "number") {
                        yAxisData.push(yValue);
                        console.log(`Adding numeric value ${yValue} to Y-axis data.`);
                    } else if (typeof yValue === "string" && !isNaN(parseFloat(yValue)) && !yValue.startsWith('0x')) {
                        let parsedValue = parseFloat(yValue);
                        yAxisData.push(parsedValue);
                        console.log(`Adding parsed value ${parsedValue} to Y-axis data.`);
                    } else {
                        console.log(`Skipping value ${yValue} for Y-axis data.`);
                    }
                }

                resolve({ xAxisData, yAxisData, xAxisCandidate, yAxisCandidate, 
                         seriesData: [{ type: 'line', data: yAxisData }] });
            });
        },
        renderLineChart(chartData) {
            let lineChart = echarts.init(document.getElementById('line-chart'), 'dark');

            let option = {
                grid: { containLabel: true },
                xAxis: { type: 'category', data: chartData.xAxisData, name: chartData.xAxisCandidate, nameLocation: 'center', axisLabel: { margin: 60 } },
                yAxis: { type: 'value', name: chartData.yAxisCandidate, nameLocation: 'middle', axisLabel: { margin: 60 } },
                tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
                series: chartData.seriesData
            };

            lineChart.setOption(option);
        }
    }
}
</script>

<style scoped>
</style>
