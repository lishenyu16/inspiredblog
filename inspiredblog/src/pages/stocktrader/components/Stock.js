
import React, { Component, useEffect, useState } from 'react';
import { Switch, Route, Redirect, Link ,useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { checkAuthState } from '../selectors/authSelector';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles({
    main: {
        display:'flex',
        justifyContent:'center',
        width:'100%',
        flexWrap: 'wrap',
        position: 'relative',
        paddingBottom: '40px', // for bottom footer.
    },
    signInButton: {
        textTransform: 'none',
        '&:hover': {
            color: 'rgb(0,180,5)',
            backgroundColor: 'inherit'
        }
    },

})

const host = process.env.NODE_ENV === "production"?'':'http://localhost:5000';
let header = {
    headers: localStorage.getItem('stock_token')? {
        Authorization: 'Bearer ' + localStorage.getItem('stock_token')
    } :null
} 
const Stock = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [stock, setStock] = useState(null);
    useEffect(()=>{
        async function fetchData(){
            const result = await axios.get(host + `/api/stocktrader/quotes/stocks/${props.match.params.symbol}`, header);
            setStock(result.data);
        }
        fetchData();
    },[])
    useEffect(()=>{
        if (stock&&stock.quote.isUSMarketOpen){
            setTimeout(() => {
                async function fetchData() {
                    const result = await axios.get(host + `/api/stocktrader/quotes/stocks/${props.match.params.symbol}`, header);
                    setStock(result.data);
                }
                fetchData();
            }, 10000);
        }
    },[stock])
    return (
        <div className={classes.mainDiv}>
            <div>
                
            </div>
            <div></div>
            <div></div>
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