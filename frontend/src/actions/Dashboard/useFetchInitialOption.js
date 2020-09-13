import { useReducer, useEffect } from 'react'
import { ACTIONS } from '../Actions'
import { API_URL } from '../API_URL'
import axios from 'axios'

const reducer = (state, action) => {
	switch(action.type) {
		case ACTIONS.MAKE_REQUEST:
			return {...state, loading : action.payload.loading}
		case ACTIONS.GET_DATA:
			return {...state, initialOptionLoading : action.payload.loading, initialOption : action.payload.option }
		case ACTIONS.ERROR:
			return {...state, error : action.payload.error}
		default:
			return state
	}
}
const useFetchInitialOption  = (user, initialState) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        console.log(user)
		dispatch({ type : ACTIONS.MAKE_REQUEST, payload : { loading : true }})
        axios.get(`${API_URL}/api/option/io`, {
            params : {
                pk : user.pk
            }
        })
        .then(res => dispatch({ type : ACTIONS.GET_DATA, payload : { 
            loading : false, 
            option : res.data.option, 
        }}))
        .catch(e => dispatch({ type : ACTIONS.ERROR, payload : { error : e }}))
	}, [])

    return state
}

export default useFetchInitialOption


