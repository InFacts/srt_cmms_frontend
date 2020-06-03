import { useEffect } from 'react';
import {decodeTokenIfNeeded} from '../redux/modules/token';
import { useDispatch } from 'react-redux'

const useTokenInitializer = () => {
    const dispatch = useDispatch();
    // Decode Token If needed
    useEffect(() => {
        dispatch(decodeTokenIfNeeded());
    }, []);
    return;
}
export default useTokenInitializer;