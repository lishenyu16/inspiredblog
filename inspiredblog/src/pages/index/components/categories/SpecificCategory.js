import { makeStyles } from '@material-ui/core/styles';
import React, { Component, useEffect, useState  } from 'react';
import { Link ,useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import format from 'date-fns/format';
// import {connect} from 'react-redux';
const useStyles = makeStyles(theme => ({
    outerDiv: {
        width:'100%',
        minHeight:'100vh',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        padding: '40px'
    },
    mainTitle: {
        opacity: '1',
        display: 'block',
        transform: 'translateX(0px)',
        position: 'relative',
        margin: '60px 0',
        '&::before': {
            content: '" "',
            position: 'absolute',
            left: '0',
            top: '50%',
            marginLeft: '-4px',
            marginTop: '-4px',
            width: '8px',
            height: '8px',
            background: '#bbb',
            borderRadius: '50%',
        },
    },
    posts: {
        position: 'relative',
        zIndex: '1010',
        marginLeft: '5%',
        width: '100%',
        '&::after': {
            content: '" "',
            position: 'absolute',
            top: '80px',
            left: '0',
            marginLeft: '-2px',
            width: '4px',
            height: '100%',
            background: '#f5f5f5',
            zIndex: '-1',
        }
    },
    collectionPost: {
        margin: '30px 0',
    },
    header: {
        opacity: '1',
        transform: 'translateY(0px)',
        margin: '30px 0',
        position: 'relative',
        transitionDuration: '0.2s',
        transitionTimingFunction: 'ease-in-out',
        transitionDelay: '0s',
        transitionProperty: 'border',
        borderBottom: '1px dashed #ccc',
        '&::before': {
            content: '" "',
            position: 'absolute',
            left: 0,
            top: '8px',
            width: '6px',
            height: '6px',
            marginLeft: '-4px',
            background: '#bbb',
            borderRadius: '50%',
            border: '1px solid #fff',
            transitionDuration: '0.2s',
            transitionTimingFunction: 'ease-in-out',
            transitionDelay: '0s',
            transitionProperty: 'background',
        },
        '&:hover': {
            borderBottomColor: '#666',
            cursor: 'pointer'
        },
        '&:hover::before': {
            backgroundColor: '#222',
        },
    },
    postTitle: {
        marginLeft: '60px',
        fontSize: '16px',
        fontWeight: 'normal',
        lineHheight: 'inherit',
    },
    postmeta: {
        position: 'absolute',
        fontSize: '12px',
        left: '20px',
        top: '4px',
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
const SpecificCategory = (props) => {
    const classes = useStyles();
    let history = useHistory();
    const [editorValue, setEditorValue] = useState('');
    useEffect(()=>{
        props.fetchSingleCategory(props.match.params.category);
    },[]);
    return (
        <div className={classes.outerDiv}>
            <div className={classes.posts}>
                <div className={classes.collectionPost}>
                    <div className={classes.mainTitle}>
                        <h1 style={{marginLeft: '20px', fontSize:'22px'}}>{props.match.params.category}</h1>
                    </div>
                    {props.blog.categoryBlogs.map(ele=>                      
                        <header className={classes.header} onClick={()=>history.push(`/blogs/blog-detail/${ele.blog_id}`)}>
                            <h2 className={classes.postTitle}>{ele.blog_title}</h2>
                            <div className={classes.postmeta}>{format(new Date(ele.created_on), 'MM-dd')}</div>
                        </header>
                    )}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        blog: state.blog,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchSingleCategory: (name)=>dispatch({type: 'FETCH_SINGLE_CATEGORY', name})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecificCategory);