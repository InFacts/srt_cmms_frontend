const initialState = {

  // แขวง
  district: [
    {
      "id": 1,
      "name": "แขวงลาดยาว"
    },
    {
      "id": 2,
      "name": "แขวงจตุจักร"
    },
    {
      "id": 3,
      "name": "แขวงนครสวรรค์"
    }
  ],
  // เขต
  zone: [
    {
      "id": 1,
      "name": "ตอนลาดยาว"
    },
    {
      "id": 2,
      "name": "ตอนจตุจักร"
    },
    {
      "id": 3,
      "name": "ตอนบางซื่อ"
    }
  ],


  assetinstall: [
    {
      "id": 1,
      "no_asset_install": "WR-0004",
      "district": "แขวงนครสวรรค์",
      "zone": "",
      "date_start": "2020-04-14",
      "time_start": "04:00",
      "date_end": "2020-04-14",
      "time_end": "04:00",
      "job_name": "รถไฟชน",
      "create_name": "นายศิวกร แสงสว่าง",
      "create_date_time": "2020-04-14",
      "station": "ตอนบางซื่อ",


      "number": "",
      "des": "",
      "unit": "",
      "status": "",
      "note": "",
      "location1": "",
      "location2": "",
      "location3": "",
      "location4": "",
      "note2": "",


    },


  ],

  // Mode การทำงาน
  action: "search",

  // Mode Search
  no_asset_install: "",
  districts: "",
  zones: "",
  date_starts: "",
  date_ends: "",

  asset_install_show_popup: [],
  asset_install_show: [],


  // Mode Add
  no_asset_install_add: "",
  create_date_time_add: "",
  create_name_add: "",
  number_add: "",
  des_add: "",
  unit_add: "",

  status_add: "",
  note_add: "",
  location1_add: "",
  location2_add: "",
  location3_add: "",
  location4_add: "",
  note2_add: "",


  // แนบไฟล์
  files: [],
  clickable: true,
  accepts: null,
  multiple: true,
  maxFiles: Infinity,
  maxFileSize: Infinity,
  minFileSize: 0,

}
export default (state = initialState, action) => {
  switch (action.type) {
    // เลืก mode ในการทำงาน ( Search / Create / Edit )
    case "ACTION":
      // console.log("mode", state.action)
      return {
        ...state,
        action: action.value
      }
    // Mode Search
    case "ON CHANGE NO ASSETINSTALL":
      return {
        ...state,
        no_asset_install: action.value
      }

    case "ON CHANGE DISTRICTS ASSETINSTALL":
      return {
        ...state,
        districts: action.value
      }

    case "ON CHANGE ZONES ASSETINSTALL":
      return {
        ...state,
        zones: action.value
      }


    case "ON CHANGE DATE STRARTS ASSETINSTALL":
      return {
        ...state,
        date_starts: action.value
      }

    case "ON CHANGE DATE ENDS ASSETINSTALL":
      return {
        ...state,
        date_ends: action.value
      }

    case "CLICK POPUP NO ASSETINSTALL":
      return {
        ...state,
        no_asset_install: state.no_word_order
      }
    case "CLICK SEARCH POPUP NO ASSETINSTALL":
      // const no_word_requestRegex = new RegExp(`${state.no_asset_install}`, "gi");
      // const date_endsRegex = new RegExp(`${state.date_ends}`, "gi");
      // const date_startsRegex = new RegExp(`${state.date_starts}`, "gi");
      // const zonesRegex = new RegExp(`${state.zones}`, "gi");
      // const districtsRegex = new RegExp(`${state.districts}`, "gi");
      return {
        ...state,

        // asset_install_show_popup: initialState.assetinstall.filter(function (assetinstall) {
        //   var isMatch = (!no_word_requestRegex || no_word_requestRegex.test(assetinstall.no_asset_install)) &&
        //     (!date_endsRegex || date_endsRegex.test(assetinstall.date_end)) &&
        //     (!date_startsRegex || date_startsRegex.test(assetinstall.date_start)) &&
        //     (!zonesRegex || zonesRegex.test(assetinstall.zone)) &&
        //     (!districtsRegex || districtsRegex.test(assetinstall.district))
        //   return (isMatch);
        // }

        asset_install_show_popup: initialState.assetinstall.filter(item =>{
          const query = state.no_asset_install.toLowerCase();
          const query2 = state.date_starts.toLowerCase();
          const query3 = state.date_ends.toLowerCase();
          const query4 = state.zones.toLowerCase();
          const query5 = state.districts.toLowerCase();
          return(
            (item.no_asset_install.toLowerCase().indexOf(query) >= 0 || !query )&&
            (item.zone.toLowerCase().indexOf(query4) >= 0 || !query4 ) &&
            (item.district.toLowerCase().indexOf(query5) >= 0 || !query5 ) &&
            (item.date_end.toLowerCase().indexOf(query3) >= 0 || !query3 ) &&
            (item.date_start.toLowerCase().indexOf(query2) >= 0 || !query2 ) 
          )

          }

        ),
      }
    case "CLICK SELECT POPUP NO ASSETINSTALL":

      return {
        ...state,
        no_asset_install: state.asset_install_show_popup[action.row_asset_install_show_popup].no_asset_install,
        asset_install_show: state.asset_install_show_popup[action.row_asset_install_show_popup],

      }



    case "ON CHANGE CREATE DATETIME":
      var clone_asset_install_show = { ...state.asset_install_show };
      clone_asset_install_show.create_date_time = action.value;
      return {
        ...state,
        asset_install_show: clone_asset_install_show
      }


    case "ON CHANGE CREATE NAME":
      var clone_asset_install_show = { ...state.asset_install_show };
      clone_asset_install_show.create_name = action.value;
      return {
        ...state,
        asset_install_show: clone_asset_install_show
      }

    case "ON CHANGE NUMBER":
      var clone_asset_install_show = { ...state.asset_install_show };
      clone_asset_install_show.number = action.value;
      return {
        ...state,
        asset_install_show: clone_asset_install_show
      }


    case "ON CHANGE DES":
      var clone_asset_install_show = { ...state.asset_install_show };
      clone_asset_install_show.des = action.value;
      return {
        ...state,
        asset_install_show: clone_asset_install_show
      }


    case "ON CHANGE UNIT":
      var clone_asset_install_show = { ...state.asset_install_show };
      clone_asset_install_show.unit = action.value;
      return {
        ...state,
        asset_install_show: clone_asset_install_show
      }





    case "ON CHANGE STATUS":
      var clone_asset_install_show = { ...state.asset_install_show };
      clone_asset_install_show.status = action.value;
      return {
        ...state,
        asset_install_show: clone_asset_install_show
      }


    case "ON CHANGE NOTE":
      var clone_asset_install_show = { ...state.asset_install_show };
      clone_asset_install_show.note = action.value;
      return {
        ...state,
        asset_install_show: clone_asset_install_show
      }


    case "ON CHANGE LOCATION1":
      var clone_asset_install_show = { ...state.asset_install_show };
      clone_asset_install_show.location1 = action.value;
      return {
        ...state,
        asset_install_show: clone_asset_install_show
      }

    case "ON CHANGE LOCATION2":
      var clone_asset_install_show = { ...state.asset_install_show };
      clone_asset_install_show.location2 = action.value;
      return {
        ...state,
        asset_install_show: clone_asset_install_show
      }
    case "ON CHANGE LOCATION3":
      var clone_asset_install_show = { ...state.asset_install_show };
      clone_asset_install_show.location3 = action.value;
      return {
        ...state,
        asset_install_show: clone_asset_install_show
      }
    case "ON CHANGE LOCATION4":
      var clone_asset_install_show = { ...state.asset_install_show };
      clone_asset_install_show.location4 = action.value;
      return {
        ...state,
        asset_install_show: clone_asset_install_show
      }



    case "ON CHANGE NOTE2":
      var clone_asset_install_show = { ...state.asset_install_show };
      clone_asset_install_show.note2 = action.value;
      return {
        ...state,
        asset_install_show: clone_asset_install_show
      }








    // Mode Add
    case "ON CHANGE NO ASSETINSTALL ADD":
      return {
        ...state,
        no_asset_install_add: action.value
      }
    case "ON CHANGE CREATE DATETIME ADD":
      return {
        ...state,
        create_date_time_add: action.value
      }

    case "ON CHANGE CREATE NAME ADD":
      return {
        ...state,
        create_name_add: action.value
      }


    case "ON CHANGE NUMBER ADD":
      return {
        ...state,
        number_add: action.value
      }

    case "ON CHANGE DES ADD":
      return {
        ...state,
        des_add: action.value
      }

    case "ON CHANGE UNIT ADD":
      return {
        ...state,
        unit_add: action.value
      }



    case "ON CHANGE STATUS ADD":
      return {
        ...state,
        status_add: action.value
      }


    case "ON CHANGE NOTE ADD":
      return {
        ...state,
        note_add: action.value
      }


    case "ON CHANGE LOCATION1 ADD":
      return {
        ...state,
        location1_add: action.value
      }

    case "ON CHANGE LOCATION2 ADD":
      return {
        ...state,
        location2_add: action.value
      }
    case "ON CHANGE LOCATION3 ADD":
      return {
        ...state,
        location3_add: action.value
      }
    case "ON CHANGE LOCATION4 ADD":
      return {
        ...state,
        location4_add: action.value
      }

    case "ON CHANGE NOTE2 ADD":
      return {
        ...state,
        note2_add: action.value
      }

    default:
      return state
  }
}