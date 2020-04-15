import { makeStyles } from '@material-ui/core/styles';
import React, { Component, useEffect, useState  } from 'react';
import { Link ,useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
// import {connect} from 'react-redux';
const useStyles = makeStyles(theme => ({
    outerDiv: {
        width:'100%',
        minHeight:'100vh',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        padding: '30px 20px'
    },
    title: {
        fontSize: '25px',
        '@media(max-width: 500px)': {
            fontSize: '17px'
        }
    },
    subtitle:{
        fontSize: '17px',
        margin: '10px 0 20px',
        '@media(max-width: 500px)': {
            fontSize: '12px'
        }
    },
    list: {
        width: '100%',
        fontSize: '20px',
    },
    listItem: {
        width: 'fit-content',
        margin: '7px 0',
        cursor: 'pointer',
        '&:hover': {
            transform: 'scale(1.2)',
        },
        
    }
}));

const icons = {
    1: <i class="fab fa-js-square" style={{width: '30px', textAlign: 'center'}}></i>,
    2: <i class="fab fa-php" style={{width: '30px', textAlign: 'center'}}></i>,
    3: <i class="fab fa-node" style={{width: '30px', textAlign: 'center'}}></i>,
    4: <i class="fab fa-react" style={{width: '30px', textAlign: 'center'}}></i>,
    5: <i class="fab fa-vuejs" style={{width: '30px', textAlign: 'center'}}></i>,
    6: <i class="fas fa-database" style={{width: '30px', textAlign: 'center'}}></i>,
    7: <i class="fas fa-calculator" style={{width: '30px', textAlign: 'center'}}></i>,
    8: <i class="fas fa-network-wired" style={{width: '30px', textAlign: 'center'}}></i>,
    9: <i class="fab fa-linux" style={{width: '30px', textAlign: 'center'}}></i>,
    10: <i class="fas fa-star-half-alt" style={{width: '30px', textAlign: 'center'}}></i>,
}
const Tags = (props) => {
    const classes = useStyles();
    let history = useHistory();
    // const [editorValue, setEditorValue] = useState('');
    useEffect(()=>{
        props.fetchCategories();
    },[]);
    return (
        <div className={classes.outerDiv}>
            <div className={`${classes.title} sansBold`}>Category</div>
            <div className={classes.subtitle}>10 categories in total currently</div>
            <div className={classes.list}>
                {props.blog.categories.map(ele=>
                    <div className={classes.listItem} onClick={()=>history.push(`/blogs/categories/${ele.description}`)}>
                        {icons[ele.category_id]} {ele.description} <span style={{color: 'lightgray'}}>({ele.count})</span>
                    </div>)
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        blog: state.blog,
        // isLoggedIn: checkAuthState()
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch({type: 'FETCH_CATEGORIES'}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags);