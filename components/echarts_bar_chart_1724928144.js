<!--
INSTRUCTION: To add this component to the user's app, you are required to follow these steps:
INSTRUCTION: - You are given the correct SQL statement -- replace the `PLACEHOLDER_SQL_STATEMENT` variable in this file with the actual SQL statement.
-->

<template>
  <div style="display: flex; justify-content: center;">
    <div id="bar-chart" style="width: 100%; height: 50vh;"></div>
  </div>
</template>

<script>
export default {
  name: 'EchartsBarChart',
  data() {
    return {
      tableItems: [],
      tableHeaders: [],
      SQL_statement: 'PLACEHOLDER_SQL_STATEMENT',
    };
  },
  mounted() {
    this.fetch_data_from_database(this.SQL_statement)
      .then(([tableHeaders, tableItems]) => {
        this.tableHeaders = tableHeaders;
        this.tableItems = tableItems;
        this.prepare_data_for_bar_chart(tableHeaders, tableItems)
          .then(chartData => {
            this.render_bar_chart(chartData);
          });
      });
  },
  methods: {
    fetch_data_from_database(SQL_statement) {
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
    prepare_data_for_bar_chart(tableHeaders, tableItems) {
      return new Promise((resolve) => {
        let xAxisData = [];
        let seriesData = [];
        let xAxisCandidate = null;
        let yAxisCandidate = null;

        for (let header of tableHeaders) {
          let hasNonEmptyStringValues = tableItems.some(item => 
            typeof item[header] === 'string' && item[header] !== '' && !item[header].startsWith('{')
          );
          if (hasNonEmptyStringValues) {
            xAxisCandidate = header;
            console.log('X-axis candidate:', xAxisCandidate);
            break;
          }
        }

        if (!xAxisCandidate) {
          console.log('Unable to find suitable X-axis data. Returning empty chart data.');
          return resolve({ xAxisData: [], seriesData: [], xAxisCandidate: null, yAxisCandidate: null });
        }

        xAxisData = tableItems.map(item => {
          let value = item[xAxisCandidate];
          return typeof value === 'string' && !value.startsWith('{') ? value : null;
        }).filter(value => value !== null);

        for (let header of tableHeaders) {
          if (header !== xAxisCandidate && yAxisCandidate === null) {
            let hasNumericOrParsableValues = tableItems.some(item => {
              let value = item[header];
              return typeof value === 'number' || 
                (typeof value === 'string' && !isNaN(parseFloat(value)) && !value.startsWith('0x'));
            });
            if (hasNumericOrParsableValues) {
              yAxisCandidate = header;
              console.log('Y Axis Candidate: ', yAxisCandidate);
              break;
            }
          }
        }

        if (!yAxisCandidate) {
          console.log('Unable to find suitable Y-axis data. Returning empty chart data.');
          return resolve({ xAxisData: [], seriesData: [], xAxisCandidate: null, yAxisCandidate: null });
        }

        for (let header of tableHeaders) {
          if (header !== xAxisCandidate && header === yAxisCandidate) {
            let series = { name: header, type: 'bar', data: [] };

            for (let item of tableItems) {
              let yValue = item[header];
              if (typeof yValue === 'number') {
                series.data.push(yValue);
                console.log(`Adding numeric value ${yValue} to series data.`);
              } else if (typeof yValue === 'string' && !isNaN(parseFloat(yValue))) {
                let parsedValue = parseFloat(yValue);
                series.data.push(parsedValue);
                console.log(`Adding parsed value ${parsedValue} to series data.`);
              } else {
                console.log(`Skipping value ${yValue} for series data.`);
              }
            }

            seriesData.push(series);
          }
        }

        resolve({ xAxisData, seriesData, xAxisCandidate, yAxisCandidate });
      });
    },
    render_bar_chart(chartData) {
      const barChart = echarts.init(document.getElementById('bar-chart'), 'dark');
      const option = {
        grid: { containLabel: true },
        xAxis: { type: 'category', data: chartData.xAxisData, name: chartData.xAxisCandidate, nameLocation: 'center', axisLabel: { margin: 60 } },
        yAxis: { type: 'value', name: chartData.yAxisCandidate, nameLocation: 'middle', axisLabel: { margin: 60 } },
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
        series: chartData.seriesData
      };

      barChart.setOption(option);
    },
  }
};
</script>

<style>
/* Add component-specific styles if any */
</style>
