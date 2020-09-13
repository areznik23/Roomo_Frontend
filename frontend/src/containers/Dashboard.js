import React, { useState, useEffect } from 'react'
import Deck from '../components/Deck'
import useFetchOption from '../actions/Dashboard/useFetchOption'
import useFetchInitialOption from '../actions/Dashboard/useFetchInitialOption'

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem("tokens"))
    // const { initialOption, initialOptionLoading} = useFetchInitialOption(user, {option : null, initialOptionLoading : true, error : null})
    const [choice, setChoice] = useState(false)
    const [next, setNext] = useState(false)
    const [currentOption, setCurrentOption] = useState({"id" : 1})

    // issue is the new option is dependant upon the old value so always in a bit of a limbo
    const {match, option, follow, loading, empty, error} = useFetchOption(user, currentOption, choice, next, {
        match : false, 
        option : currentOption,
        follow : null,
        loading : true, 
        error : null,
        empty: false
    })

    // May not need to sort out the whole functionality a bit

    // The issue lies with the option, and that it does not exist at the proper times
    const onRightClick = () => {
        setCurrentOption(option)
        setNext(prevNext => !prevNext)
        setChoice(true)
    }

    const onLeftClick = () => {
        setCurrentOption(option)
        setNext(prevNext => !prevNext)
        setChoice(false)
    }
    
    return (
        <div>
            {loading && <div>loading...</div>}
            <Deck onRightClick = {() => onRightClick()} onLeftClick = {() => onLeftClick()} option = {option} loading = {loading} empty = {empty}/>
        </div>
    )
}
export default Dashboard