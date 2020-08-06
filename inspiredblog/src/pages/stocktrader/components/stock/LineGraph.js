import React from 'react';
// import {connect} from 'react-redux';
import {Line} from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    LineGraph: {
        width:'auto',
        minWidth: '60%',
        margin: '0 auto',
    }
})
const LineGraph = (props)=>{
    const classes = useStyles();
    let chartDataArr = props.chartData;
    const labels = [];
    const values = [];
    if (chartDataArr){
        chartDataArr.forEach(element => {
            labels.push(element.label)
            values.push(element.close)
        });
    }
    const data = {
        labels: labels,//['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: props.symbol,
            fill: false,
            lineTension: 0.1,
            borderColor: 'rgba(75,192,192,1)',
            data: values//[50,80,20,70,10,90,120,30,90,40,60,100,25,40]
          }
        ]
    };
    // const displayName = 'LineExample'
    return (
        <div className={classes.LineGraph}>
            <Line 
                data={data} 
                width={500}
                height={300}
                options={{
                    maintainAspectRatio: false
                }}
            />
        </div>
    )
}

export default LineGraph;