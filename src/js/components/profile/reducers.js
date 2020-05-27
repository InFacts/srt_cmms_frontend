const initialState = {
  pass:"",
  pass_new:"",
  pass_con:"",
  profile: [],
  working_document_show: [],
  complete_document_show: [],
  history_document_show: [],
}
export default (state = initialState, action) => {
  switch (action.type) {

    case "PROFILE":
      console.log("reducer", action.value)
      // console.log("reducer", action.resDoc.results)
      return {
        ...state,
        profile: action.value,
        
        working_document_show : action.resDoc.results.filter(item =>{
          if(item.is_document_on_going === 1){
            return(item)
          }
        }),
        complete_document_show : action.resDoc.results.filter(item =>{
          if(item.is_document_on_going === 0){
            return(item)
          }
        }),
        history_document_show: action.resDoc.results,
      }

    case "WORKING":
      return {
        ...state,
        working_document_show: action.value,
      }

    case "COMPLETE":
      return {
        ...state,
        complete_document_show: action.value,
      }

    case "HISTORY":
      return {
        ...state,
        history_document_show: action.value,
      }

    case "ON CHANGE NAME":
      var clone_profile_show = { ...state.profile };
      clone_profile_show.firstname_th = action.value;
      return {
        ...state,
        profile: clone_profile_show
      }

    case "ON CHANGE LAST NAME":
      var clone_profile_show = { ...state.profile };
      clone_profile_show.lastname_th = action.value;
      return {
        ...state,
        profile: clone_profile_show
      }

    case "ON CHANGE EMAIL":
      var clone_profile_show = { ...state.profile };
      clone_profile_show.email = action.value;
      return {
        ...state,
        profile: clone_profile_show
      }

    case "ON CHANGE PASS":
      // var clone_profile_show = { ...state.profile };
      // clone_document_show.created_by_user_name_th = action.value;
      return {
        ...state,
        pass: action.value
      }

    case "ON CHANGE NEW PASS":
      // var clone_profile_show = { ...state.profile };
      // clone_document_show.created_by_user_name_th = action.value;
      return {
        ...state,
        pass_new: action.value
      }

    case "ON CHANGE CONFILE NEW PASS":
      // var clone_profile_show = { ...state.profile };
      // clone_document_show.created_by_user_name_th = action.value;
      return {
        ...state,
        pass_con: action.value
      }

    case "ON CHANGE CENTER":
      var clone_profile_show = { ...state.profile };
      // clone_document_show.created_by_user_name_th = action.value;
      return {
        ...state,
        profile: clone_profile_show
      }

    case "ON CHANGE TEAM":
      var clone_profile_show = { ...state.profile };
      // clone_document_show.created_by_user_name_th = action.value;
      return {
        ...state,
        profile: clone_profile_show
      }

    case "ON CHANGE DEPARTMENT":
      var clone_profile_show = { ...state.profile };
      // clone_document_show.created_by_user_name_th = action.value;
      return {
        ...state,
        profile: clone_profile_show
      }

    case "ON CHANGE PLACE":
      var clone_profile_show = { ...state.profile };
      // clone_document_show.created_by_user_name_th = action.value;
      return {
        ...state,
        profile: clone_profile_show
      }




    case "CLICK SAVE PROFILE":
      // var clone_profile_show = { ...state.profile };
      // clone_document_show.created_by_user_name_th = action.value;
      return {
        ...state,
        profile: action.value,
      }

    case "CLICK SAVE PASS":
      // var clone_profile_show = { ...state.profile };
      // clone_document_show.created_by_user_name_th = action.value;
      return {
        ...state,
        profile: action.value,
      }

    case "CLICK SAVE LOCATION":
      // var clone_profile_show = { ...state.profile };
      // clone_document_show.created_by_user_name_th = action.value;
      return {
        ...state,
        profile: action.value,
      }

    default:
      return state
  }
}