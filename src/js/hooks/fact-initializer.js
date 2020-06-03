import { useEffect } from 'react';
import {fetchFactIfNeeded , FACTS} from '../redux/modules/api/fact';
import { useDispatch } from 'react-redux'

const useFactInitializer = () => {
    const dispatch = useDispatch();

    // Fetch Fact If needed
    useEffect(() => {
        for (const factName of Object.values(FACTS)){
            dispatch(fetchFactIfNeeded(factName));
        }
    }, []);

    return;
}
export default useFactInitializer;