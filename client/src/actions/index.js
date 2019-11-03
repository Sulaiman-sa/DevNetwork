import uuid from 'uuid'
import axios from '../utils/localapi'
//import setAuthToken from '../utils/setAuthToken'

import {
  SET_ALERT,
  REMOVE_ALERT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_PROFILE,
  PROFILE_ERROR
} from './types'

export const setAlert = (msg, alertType, timeout = 3000) => dispatch => {
  const id = uuid.v4()
  dispatch({
    type: SET_ALERT,
    payload: {
      msg,
      alertType,
      id
    }
  })

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout)
}

//LOAD

export const loadUser = () => async dispatch => {
  // if (localStorage.token) {
  //   setAuthToken(localStorage.token)
  // }
  try {
    const res = await axios.get('/api/auth')
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}
//REGISTER

export const register = ({ name, email, password }) => async dispatch => {
  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // }
  const body = JSON.stringify({ name, email, password })
  try {
    const res = await axios.post('/api/users', body)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 5000)))
    }

    dispatch({
      type: REGISTER_FAIL
    })
  }
}

//Login
export const login = (email, password) => async dispatch => {
  const body = JSON.stringify({ email, password })
  try {
    const res = await axios.post('/api/auth', body)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 5000)))
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }
}

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT })
}

//Get current users profile

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me')

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}
