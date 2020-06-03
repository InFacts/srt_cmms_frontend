import { useEffect } from 'react';
import {  toModeSearch, handleClickAdd, handleClickHomeToSpareMain,
    handleClickForward, handleClickBackward,handleClickRefresh, TOOLBAR_MODE,TOOLBAR_ACTIONS } from '../redux/modules/toolbar.js';
import {FOOTER_MODE, FOOTER_ACTIONS, footerToModeSearch, footerToModeAddDraft, footerToModeInvisible} from '../redux/modules/footer.js';
import { useDispatch, useSelector  } from 'react-redux'

const useFactInitializer = () => {
    const dispatch = useDispatch();
    const toolbar = useSelector((state) => ({...state.toolbar}));

    // Handle Toolbar Mode
    useEffect(() => {
        if (toolbar.mode === TOOLBAR_MODE.SEARCH){
            dispatch(footerToModeSearch());
        }
        else if (toolbar.mode === TOOLBAR_MODE.ADD){
            dispatch(footerToModeAddDraft());
        }
        else {
            dispatch(footerToModeInvisible());
        }
    }, [toolbar.mode]);

    return;
}
export default useFactInitializer;