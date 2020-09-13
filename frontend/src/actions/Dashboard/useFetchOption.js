import { useReducer, useEffect } from 'react'
import { ACTIONS } from '../Actions'
import { API_URL } from '../API_URL'
import axios from 'axios'

const reducer = (state, action) => {
	switch(action.type) {
		case ACTIONS.MAKE_REQUEST:
			return {...state, loading : action.payload.loading}
		case ACTIONS.GET_DATA:
			return {...state, loading : action.payload.loading, match : action.payload.match, option : action.payload.option, follow : action.payload.follow, empty : action.payload.empty }
		case ACTIONS.ERROR:
			return {...state, error : action.payload.error}
		default:
			return state
	}
}

// initial value is the first option 
// option is reset each time the button is clicked
// how to stop it from being called on the first time around
const useFetchOption  = (user, option, choice, next, initialState) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
		dispatch({ type : ACTIONS.MAKE_REQUEST, payload : { loading : true }})
		if (choice === true) {
			axios.post(`${API_URL}/api/option/f`, {
				"follower" : user,
				"followed" : option
			})
			.then(res => dispatch({ type : ACTIONS.GET_DATA, payload : { 
				loading : false, 
				option : res.data.new_option, 
				match : res.data.data.match, 
				follow : res.data.data.follow,
				empty: res.data.empty
			}}))
			.catch(e => dispatch({ type : ACTIONS.ERROR, payload : { error : e }}))
		}
		else {
			axios.post(`${API_URL}/api/option/nf`, {
				"follower" : user,
				"followed" : option
			})
			.then(res => dispatch({ type : ACTIONS.GET_DATA, payload : { 
					loading : false, 
					option : res.data.new_option, 
					match : res.data.data.match, 
					follow : res.data.data.follow,
					empty: res.data.empty
				}})
			)
			.catch(e => dispatch({ type : ACTIONS.ERROR, payload : { error : e }}))
		}
	}, [next])

    return state
}

export default useFetchOption


