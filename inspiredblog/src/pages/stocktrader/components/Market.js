
import React, { Component, useEffect, useState } from 'react';
import { Switch, Route, Redirect, Link ,useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { checkAuthState } from '../selectors/authSelector';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles({
    mainDiv: {
        width: '100%',
        padding: '5% 0'
    },
    stock_boxes: {
        width: '50%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        margin: '0 auto',
        '@media(max-width:1600px)':{
            width:'55%'
        },
        '@media(max-width:1400px)':{
            width:'63%'
        },
        '@media(max-width:1200px)':{
            width:'70%'
        },
        '@media(max-width:900px)':{
            width:'90%'
        },
    },
    stock_box: {
        width: '185px',
        height: '184px',
        padding: '22px 23px',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #b8c1ca',
        justifyContent: 'space-between',
        margin: '5px 5px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#e7e7e7'
        }
    }
})
const host = process.env.NODE_ENV === "production"?'':'http://localhost:5000';
let header = {
    headers: localStorage.getItem('stock_token')? {
        Authorization: 'Bearer ' + localStorage.getItem('stock_token')
    } :null
} 

const Market = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [marketStocks, setMarketStocks] = useState(null);
    useEffect(()=>{
        async function fetchData() {
            const result = await axios.get(host + `/api/stocktrader/quotes/fetch_market_quotes`, header);
            setMarketStocks(result.data.data);
        }
        fetchData();
    },[]);
    useEffect(() => {
        //this hook will run after the state has been filled with datas.
        if (marketStocks&&marketStocks['BA'].quote.isUSMarketOpen){
            setTimeout(() => {
                async function fetchData() {
                    const result = await axios.get(host + `/api/stocktrader/quotes/fetch_market_quotes`, header);
                    setMarketStocks(result.data.data);
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
      }, [marketStocks]);
    return (
        <div className={classes.mainDiv}>
            <div className={classes.stock_boxes}>
                {marketStocks&&Object.keys(marketStocks).length>0?
                    Object.keys(marketStocks).map(item=>
                    <div key={item} className={classes.stock_box} onClick={()=>props.history.push(`/stocktrader/stocks/${marketStocks[item].quote.symbol}`)}>
                        <div>
                            <span style={{fontSize:'13px'}}>{marketStocks[item].quote.companyName}</span>
                        </div>
                        <div style={{marginBottom:'10px'}}>
                            <span style={{fontSize:'13px'}}>{marketStocks[item].quote.symbol}</span>
                        </div>
                        <div style={{color: marketStocks[item].quote.changePercent>0?'#00C805':'#FF5000'}}>
                            <span style={{fontSize:'24px'}}>US${marketStocks[item].quote.latestPrice}</span>
                        </div>
                        <div style={{color: marketStocks[item].quote.changePercent>0?'#00C805':'#FF5000'}}>
                            <span style={{fontSize:'13px'}}>{(marketStocks[item].quote.changePercent*100).toFixed(3)+'%'}</span>
                        </div>
                    </div>):''
                }
            </div>
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
        onSignIn: (email,password)=> dispatch({type: 'SIGN_IN', data: {email, password}}),
        onLogout: (history) => dispatch({type: 'logout', data: history}),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Market);