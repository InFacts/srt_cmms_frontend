import { useEffect } from 'react';
import {fetchFactIfNeeded , FACTS} from '../redux/modules/api/fact';
import { useDispatch } from 'react-redux'
import { navBottomOnReady } from '../redux/modules/nav-bottom';

const useNavBottomStatusInitializer = () => {
    const dispatch = useDispatch();
    // Fetch Fact If needed
    useEffect(() => {
        dispatch(navBottomOnReady('', '', ''));
    }, []);

    return;
}
export default useNavBottomStatusInitializer;