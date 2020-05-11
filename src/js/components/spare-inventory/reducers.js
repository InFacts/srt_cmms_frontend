const initialState = {
  // ค่าคงที่ต่างๆใน DropDawn
  // สถานที่
  station: [
    {
      "id": 1,
      "name": "คลังบางซื่อ"
    },
    {
      "id": 2,
      "name": "คลังลาดกระบัง"
    },
    {
      "id": 3,
      "name": "คลังหัวตะเข้"
    }
  ],
  // แขวง
  district: [
    {
      "id": 1,
      "name": "ลาดยาว"
    },
    {
      "id": 2,
      "name": "จตุจักร"
    },
    {
      "id": 3,
      "name": "ดอนเมือง"
    }
  ],
  // เขต
  zone: [
    {
      "id": 1,
      "name": "ลาดยาว"
    },
    {
      "id": 2,
      "name": "จตุจักร"
    },
    {
      "id": 3,
      "name": "ดอนเมือง"
    }
  ],
  // จังหวัด
  county: [
    {
      "id": 1,
      "name": "กรุงเทพมหานคร"
    },
    {
      "id": 2,
      "name": "นนทบุรี"
    },
    {
      "id": 3,
      "name": "ลพบุรี"
    }
  ],

  // ค่าคงที่ต่างๆ ของแต่ละคลัง
  inventory: [
    {
      "id": 1,
      "no_inventory": "11",
      "full_name": "คลังบางซื่อ",
      "short_name": "คบ.",
      "status": 1, //สถานการใช้งาน 1 = ใช้งาน , 2 = ไม่ใช้งาน
      "station": "คลังบางซื่อ",
      "address": "99/46 บางซื่อ",
      "district": "ลาดยาว",
      "zone": "ลาดยาว",
      "county": "กรุงเทพมหานคร",
      "post_office": "10000"
    },
    {
      "id": 2,
      "no_inventory": "101",
      "full_name": "คลังลาดกระบัง",
      "short_name": "คล.",
      "status": 2, //สถานการใช้งาน 1 = ใช้งาน , 2 = ไม่ใช้งาน
      "station": "คลังลาดกระบัง",
      "address": "99/46 ลาดกระบัง",
      "district": "ลาดยาว",
      "zone": "ลาดยาว",
      "county": "กรุงเทพมหานคร",
      "post_office": "20000"
    }
  ],

  // Mode การทำงาน
  action: "search",

  // Mode Search
  no_inventory: "",
  inventory_show_popup: [],
  inventory_show: [],

  // Mode Add
  no_inventory_add: "",
  full_name_add: "",
  short_name_add: "",
  status_add: "", //สถานการใช้งาน 1 = ใช้งาน , 2 = ไม่ใช้งาน
  station_add: "",
  address_add: "",
  district_add: "",
  zone_add: "",
  county_add: "",
  post_office_add: "",

  // แนบไฟล์
  files: [],
  clickable: false,
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
      console.log("mode", state.action)
      return {
        ...state,
        action: action.value,
        clickable: action.value === "add" || action.value === "edit" ? true : false
      }

    // Mode Search
    case "CLICK OPEN POPUP":
      return {
        ...state,
        inventory_show_popup: initialState.inventory_show_popup
      }
    case "ON CHANGE NO INVENTORY":
      return {
        ...state,
        no_inventory: action.value
      }
    case "CLICK POPUP NO INVENTORY":
      return {
        ...state,
        no_inventory: state.no_inventory
      }
    case "CLICK SEARCH POPUP NO INVENTORY":
      // console.log("Click Search in popup no inventory")
      return {
        ...state,
        inventory_show_popup: initialState.inventory.filter(function (inventory) {
          // console.log(inventory.no_inventory)
          const regex = new RegExp(`${state.no_inventory}`, 'i');
          var isMatch = regex.test(inventory.no_inventory);
          return (isMatch);
        }),
      }
    case "CLICK SELECT POPUP NO INVENTORY":
      // console.log("CLICK SELECT POPUP NO INVENTORY")
      // console.log(action.row_inventory_show_popup)
      // console.log(">>>", state.inventory_show_popup[action.row_inventory_show_popup])
      return {
        ...state,
        no_inventory: state.inventory_show_popup[action.row_inventory_show_popup].no_inventory,
        inventory_show: state.inventory_show_popup[action.row_inventory_show_popup]
      }

    // Mode Edit
    case "ON CHANGE FULL NAME":
      var clone_inventory_show = { ...state.inventory_show };
      clone_inventory_show.full_name = action.value;
      return {
        ...state,
        inventory_show: clone_inventory_show
      }
    case "ON CHANGE SHORT NAME":
      var clone_inventory_show = { ...state.inventory_show };
      clone_inventory_show.short_name = action.value;
      return {
        ...state,
        inventory_show: clone_inventory_show
      }
    case "ON CHANGE STATUS":
    // ยังใช่ไม่ได้
    // var clone_inventory_show = { ...state.inventory_show };
    // console.log(action.value)
    // function test() {
    //   if (action.value === 1) {
    //     return clone_inventory_show.status = 2;
    //   }
    //   else {
    //     return (clone_inventory_show.status = 1)
    //   }
    // }
    // test();
    // return {
    //   ...state,
    //   inventory_show: clone_inventory_show
    // }
    case "ON CHANGE STATION":
      var clone_inventory_show = { ...state.inventory_show };
      clone_inventory_show.station = action.value;
      return {
        ...state,
        inventory_show: clone_inventory_show
      }
    case "ON CHANGE ADDRESS":
      var clone_inventory_show = { ...state.inventory_show };
      clone_inventory_show.address = action.value;
      return {
        ...state,
        inventory_show: clone_inventory_show
      }
    case "ON CHANGE DISTRICT":
      var clone_inventory_show = { ...state.inventory_show };
      clone_inventory_show.district = action.value;
      return {
        ...state,
        inventory_show: clone_inventory_show
      }
    case "ON CHANGE ZONE":
      var clone_inventory_show = { ...state.inventory_show };
      clone_inventory_show.zone = action.value;
      return {
        ...state,
        inventory_show: clone_inventory_show
      }
    case "ON CHANGE COUNTY":
      var clone_inventory_show = { ...state.inventory_show };
      clone_inventory_show.county = action.value;
      return {
        ...state,
        inventory_show: clone_inventory_show
      }
    case "ON CHANGE POST OFFICE":
      var clone_inventory_show = { ...state.inventory_show };
      clone_inventory_show.post_office = action.value.length <= 5 ? action.value : clone_inventory_show.post_office
      console.log(clone_inventory_show.post_office)
      return {
        ...state,
        inventory_show: clone_inventory_show
      }

    // Mode Add
    case "ON CHANGE NO INVENTORY ADD":
      return {
        ...state,
        no_inventory_add: action.value
      }
    case "ON CHANGE FULL NAME ADD":
      return {
        ...state,
        full_name_add: action.value
      }
    case "ON CHANGE SHORT NAME ADD":
      return {
        ...state,
        short_name_add: action.value
      }
    case "ON CHANGE STATUS ADD":
    // ยังใช่ไม่ได้
    // var clone_inventory_show = { ...state.inventory_show };
    // console.log(action.value)
    // function test() {
    //   if (action.value === 1) {
    //     return clone_inventory_show.status = 2;
    //   }
    //   else {
    //     return (clone_inventory_show.status = 1)
    //   }
    // }
    // test();
    // return {
    //   ...state,
    //   inventory_show: clone_inventory_show
    // }
    case "ON CHANGE STATION ADD":
      return {
        ...state,
        station_add: action.value
      }
    case "ON CHANGE ADDRESS ADD":
      return {
        ...state,
        address_add: action.value
      }
    case "ON CHANGE DISTRICT ADD":
      return {
        ...state,
        district_add: action.value
      }
    case "ON CHANGE ZONE ADD":
      return {
        ...state,
        zone_add: action.value
      }
    case "ON CHANGE COUNTY ADD":
      return {
        ...state,
        county_add: action.value
      }
    case "ON CHANGE POST OFFICE ADD":
      return {
        ...state,
        post_office_add: action.value.length <= 5 ? action.value : state.post_office_add
      }

    // แนบไฟล์
    case "FILES":
      return {
        ...state,
        files: action.value
      }
    default:
      return state
  }
}