import { useState, useEffect } from 'react';
import {decodeTokenIfNeeded, setLoggedInTrue, setLoggedInFalse} from '../redux/modules/token';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {validateToken} from '../helper'

const useTokenInitializer = () => {
    const dispatch = useDispatch();
    // const decoded_token = useSelector((state) => ({...state.token.decoded_token}), shallowEqual);
    // const [loggedIn, setLoggedIn] = useState(false); // Reminder: using this hook for every page will mean that this state will be made anew everytime!!!!

    // Since useTokenInitializer hook will be pasted in every file. this will be run at every componentDidMount
    useEffect(() => {
        if (localStorage.getItem("token_auth") === null) { // Check if there is token
            console.log('I dont think i have token')
            localStorage.clear(); // Clear any remaining data
            // setLoggedIn(false);
            dispatch(setLoggedInFalse());
            // return false;
        }else{
            console.log(" i am validating token through API")
            validateToken(true) // Set willRefreshToken to be True, so it will return 201 if token is refreshed
            .then((res) => {
                dispatch(setLoggedInTrue());
                if(res.status === 201){
                    console.log("I refreshed token with ", res.data);
                    localStorage.setItem("token_auth", res.data.token);
                }
                // setLoggedIn(true);
            }).catch((err) => { //400 (expired) and 500 (internal server error)
                console.warn("Token validated failed with ", err.response);
                localStorage.clear(); // Clear the token
                // setLoggedIn(false);
                dispatch(setLoggedInFalse());
            });
        }
    }, []);

    // Decode Token If needed
    useEffect(() => {
        if (localStorage.getItem("token_auth") !== null) { // Check if there is token
            dispatch(decodeTokenIfNeeded());
        }
    }, [dispatch]);


    // check expiry date everytime there is new decoded token
    // useEffect(() => {
    //     if (decoded_token.exp) { // If there is expiry date
    //         console.log(" i am validating token expiry date2")
    //         if (Date.now() >= decoded_token.exp * 1000) {
    //             localStorage.clear(); // Clear the token
    //             setLoggedIn(false);
    //         }
    //     }
    // }, [decoded_token]);

    // console.log("This is logged In", loggedIn)
    return;
}
export default useTokenInitializer;