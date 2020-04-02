import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
    footer:{
        position: 'absolute',
        bottom: '0',
        width: '100%',
        height: '2.5rem',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'lightgray'
    }
}));
const Footer = (props) =>{
    const classes = useStyles();
    return (
        <div className={classes.footer}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="shenyu16.com">
                    shenyu16.com
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </div>
    )
}

export default Footer;