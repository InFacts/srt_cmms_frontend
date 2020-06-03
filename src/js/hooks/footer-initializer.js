import { useEffect } from 'react';
import { TOOLBAR_MODE } from '../redux/modules/toolbar.js';
import { FOOTER_MODE, FOOTER_ACTIONS, footerToModeSearch, footerToModeAddDraft, footerToModeInvisible} from '../redux/modules/footer.js';
import { useDispatch, useSelector  } from 'react-redux';
import useTokenInitializer from '../hooks/token-initializer';

import axios from "axios";

import { API_PORT_DATABASE } from '../config_port.js';
import { API_URL_DATABASE } from '../config_url.js';

const useFactInitializer = () => {
    const dispatch = useDispatch();
    const toolbar = useSelector((state) => ({...state.toolbar}));
    const user = useSelector((state) => ({...state.token.decoded_token}));
    useTokenInitializer();

    // Handle Toolbar Mode
    useEffect(() => {
        let url = window.location.search;
        const urlParams = new URLSearchParams(url);
        const internal_document_id = urlParams.get('internal_document_id');
        const document_id = urlParams.get('document_id');

        if (toolbar.mode === TOOLBAR_MODE.SEARCH){
            dispatch(footerToModeSearch());
        }
        else if (toolbar.mode === TOOLBAR_MODE.ADD){
            dispatch(footerToModeAddDraft());
        }
        else if (internal_document_id !== "") {
            // GET Infomation of user
            axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/user/profile`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((resUser) => {
                const userLevelID = resUser.data.level_id;
                const userHasPosition = resUser.data.has_positions;// abbreviation: "สสญ.นว.", name: "สารวัตรงานบำรุงรักษาอาณัติสัญญาณแขวงนครสวรรค์", position_group_id: 3, position_id: 33, warehouse_id: null
                axios.get(`http://${API_URL_DATABASE}:${API_PORT_DATABASE}/approval/${document_id}/all`, { headers: { "x-access-token": localStorage.getItem('token_auth') } }).then((res) => {
                    console.log("DONUT TEST", res.data.results)
                    // action_approval
                    // GET APPROVAL STEP http://43.229.79.36:60013/approval/{document_id}/all
                    // For Loop find "approval_step.approval_by" & "position_id" & "user_id" & Check "isCancel" & "approval_status_id"
                }).catch(function (err) {
                    console.log(err)
                })
            }).catch(function (err) {
                console.log(err)
            })
        }
        else {
            dispatch(footerToModeInvisible());
        }
    }, [toolbar.mode]);
    
    return;
}
export default useFactInitializer;