
import React, { Component, useEffect, useState } from 'react';
import { Switch, Route, Redirect, Link ,useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { checkAuthState } from '../selectors/authSelector';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import LineGraph from './stock/LineGraph';

const useStyles = makeStyles({
    mainDiv: {
        display:'flex',
        flexDirection: 'column',
        width:'100%',
        padding: '3% 0 5%'
    },
    backbutton:{
        fontSize:'25px',
        paddingLeft:'25px'
    },
    // signInButton: {
    //     textTransform: 'none',
    //     '&:hover': {
    //         color: 'rgb(0,180,5)',
    //         backgroundColor: 'inherit'
    //     }
    // },
    mainChart: {
        width:'100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },
    headerChart: {
        width: '60%',
        paddingLeft: '25px'
    },
    headline:{
        fontSize: '1.5rem',
        margin: '0.5rem 0',
    },
    logo: {
        width:'30%',
        maxWidth: '150px',
        maxHeight:'150px',
        margin: '0 auto',
    },
    rangeChoice: {
        width:'100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        listStyle: 'none',
        padding: '0 0.5rem',
    },
    rangeButton:{
        cursor:'pointer',
        padding: '7px 16px',
        fontSize:'12px',
    },
    RangeChoiceActive: {
        cursor:'pointer',
        padding: '7px 16px',
        fontSize:'12px',
        backgroundColor: 'aqua',
    }  
})

const host = process.env.NODE_ENV === "production"?'':'http://localhost:5000';
let header = {
    headers: localStorage.getItem('stock_token')? {
        Authorization: 'Bearer ' + localStorage.getItem('stock_token')
    } :null
} 
const Stock = (props) => {
    const classes = useStyles();
    // const history = useHistory();
    const [range, setRange] = useState('1d');
    const [chartInterval, setChartInterval] = useState(5);
    const [activeRange, setActiveRange] = useState('1d');
    const [chartData, setChartData] = useState(null);

    const [stock, setStock] = useState(null);
    const [news, setNews] = useState(null);
    const [tradeType, setTradeType] = useState('buy');
    const [quantity, setQuantity] = useState(0);
    const [orderType, setOrderType] = useState('Market');
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        async function fetchData(){
            const result = await axios.get(host + `/api/stocktrader/quotes/stocks/${props.match.params.stock_symbol}`, header);
            setStock(result.data.data.quote);
            setNews(result.data.data.news);
        }
        fetchData();
    },[]);

    useEffect(()=>{
        if (stock&&stock.isUSMarketOpen){
            setTimeout(() => {
                async function fetchData() {
                    const result = await axios.get(host + `/api/stocktrader/quotes/stocks/${props.match.params.stock_symbol}`, header);
                    setStock(result.data.data.quote);
                    setNews(result.data.data.news);
                }
                try {
                    fetchData();
                }
                catch(err){
                    console.log(err);
                    fetchData();
                }
            }, 10000);
        }
    },[stock]);

    useEffect(()=>{
        async function fetchData(){
            const result = await axios.get(host + `/api/stocktrader/quotes/chart/${props.match.params.stock_symbol}/${range}/${chartInterval}`, header);
            setChartData(result.data.data);
        }
        fetchData();
    },[range]);
    // useEffect(()=>{
    //     async function fetchData(){
    //         const result = await axios.get(host + `/api/stocktrader/quotes/chart/${props.match.params.stock_symbol}/${range}/${chartInterval}`, header);
    //         setChartData(result.data.data);
    //     }
    //     fetchData();
    // },[]);
    useEffect(()=>{
        setTimeout(() => {
            async function fetchData() {
                const result = await axios.get(host + `/api/stocktrader/quotes/chart/${props.match.params.stock_symbol}/${range}/${chartInterval}`, header);
                setChartData(result.data.data);
            }
            try {
                fetchData();
            }
            catch(err){
                console.log(err);
                fetchData();
            }
        }, range=='1d'?15000:30000);
    },[]);

    function selectRange(range){
        setRange(range);
        setActiveRange(range);
        setChartInterval(range==='1d'?5:null);
    }

    function abbreviateNumber(value) {
        if(value){
            let newValue = value;
            const suffixes = ["", "K", "M", "B","T"];
            let suffixNum = 0;
            while (newValue >= 1000) {
              newValue /= 1000;
              suffixNum++;
            }
            newValue = newValue.toPrecision(3);
          
            newValue += suffixes[suffixNum];
            return newValue;
        }       
    }

    return (
        <div className={classes.mainDiv}>
            <div className={classes.backbutton} onClick={()=>props.history.goBack()}>&#10094; Back</div>
            {stock?
            <div className={classes.mainChart}>
                <div className={classes.headerChart}>
                    <div className={classes.headline}>{stock.companyName}</div>
                    <div className={classes.headline}>${stock.latestPrice.toLocaleString()}</div>
                </div>
                <div className={classes.logo}>
                    <img src={`https://storage.googleapis.com/iex/api/logos/${stock.symbol.toUpperCase()}.png`}></img>  
                </div>
            </div>:null}
            {chartData?
            <div>
                <ul className={classes.rangeChoice}>
                    <button onClick={()=>selectRange('1d')} className={activeRange=='1d'?classes.RangeChoiceActive:classes.rangeButton}>1d</button>
                    <button onClick={()=>selectRange('5dm')} className={activeRange=='5dm'?classes.RangeChoiceActive:classes.rangeButton}>5d</button>
                    <button onClick={()=>selectRange('1m')} className={activeRange=='1m'?classes.RangeChoiceActive:classes.rangeButton}>1m</button>
                    <button onClick={()=>selectRange('3m')} className={activeRange=='3m'?classes.RangeChoiceActive:classes.rangeButton}>3m</button>
                    <button onClick={()=>selectRange('6m')} className={activeRange=='6m'?classes.RangeChoiceActive:classes.rangeButton}>6m</button>
                    <button onClick={()=>selectRange('1y')} className={activeRange=='1y'?classes.RangeChoiceActive:classes.rangeButton}>1y</button>
                    <button onClick={()=>selectRange('2y')} className={activeRange=='2y'?classes.RangeChoiceActive:classes.rangeButton}>2y</button>
                </ul>
                <hr></hr>
                <LineGraph symbol={props.match.params.stock_symbol} chartData={chartData}></LineGraph>
            </div>:null}
            {/* tradeComponent
            user_position
            stock_datas */}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Stock);