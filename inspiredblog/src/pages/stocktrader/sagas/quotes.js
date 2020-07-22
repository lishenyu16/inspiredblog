import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';

const host = process.env.NODE_ENV === 'production'?'':'http://localhost:5000';