const initialState = {
  // ค่าคงที่ต่างๆ
  document: [
    {
      "id": 1,
      "no_document": "12345",
      "name": "นายศุภากร ศิริมาลีวัฒนนา",
      "status": "เปิดสำหรับแก้ไข",
      "date": "2014-02-09",
      "my_inventory": "คลังบางซื่อ",
      "no_po": "67890",
      "total": "2,000",
      "note": "",
      "list": [
        {
          "id": 1,
          "no_part": "SIG 003",
          "name_part": "SIG ขนาด 5V.",
          "quility": "10",
          "unit": "ชิ้น",
          "unit_per_bath": "100",
          "total": "1,000"
        },
        {
          "id": 2,
          "no_part": "SIG 004",
          "name_part": "SIG ขนาด 5V.",
          "quility": "10",
          "unit": "ชิ้น",
          "unit_per_bath": "100",
          "total": "1,000"
        }
      ]
    },
    {
      "id": 2,
      "no_document": "6789",
      "name": "นายสรวิศ ศิริมาลีวัฒนนา",
      "status": "ปิดสำหรับแก้ไข",
      "date": "2014-02-09",
      "my_inventory": "คลังบางซื่อ",
      "no_po": "67890",
      "total": "2,000",
      "note": "",
      "list": [
        {
          "id": 1,
          "no_part": "SIG 003",
          "name_part": "SIG ขนาด 5V.",
          "quility": "10",
          "unit": "ชิ้น",
          "unit_per_bath": "100",
          "total": "1,000"
        },
        {
          "id": 2,
          "no_part": "SIG 004",
          "name_part": "SIG ขนาด 5V.",
          "quility": "10",
          "unit": "ชิ้น",
          "unit_per_bath": "100",
          "total": "1,000"
        }
      ]
    }
  ],


  // Mode การทำงาน
  action: "search",

  // Mode Search 
  no_document: "",
  document_show_popup: [],
  document_show: [],
  list_show: [], //เอาไว้ clone list ที่อยู่ใน document_show ออกมาแสดงผล

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
    case "ON CHANGE NO DOCUMENT":
      return {
        ...state,
        no_document: action.value
      }
    case "CLICK SEARCH POPUP NO DOCUMENT":
      return {
        ...state,
        document_show_popup: initialState.document.filter(function (document) {
          // console.log(inventory.no_inventory)
          const regex = new RegExp(`${state.no_document}`, 'i');
          var isMatch = regex.test(document.no_document);
          return (isMatch);
        }),
      }
    case "CLICK SELECT POPUP NO DOCUMENT":
      return {
        ...state,
        no_document: state.document_show_popup[action.row_document_show_popup].no_document,
        document_show: state.document_show_popup[action.row_document_show_popup],
        list_show: state.document_show_popup[action.row_document_show_popup].list
      }

    // Mode Edit
    case "ON CHANGE STATUS":
      var clone_document_show = { ...state.document_show };
      clone_document_show.status = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "ON CHANGE NAME":
      var clone_document_show = { ...state.document_show };
      clone_document_show.name = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "ON CHANGE DATE":
      var clone_document_show = { ...state.document_show };
      clone_document_show.date = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "ON CHANGE MY INVENTORY":
      var clone_document_show = { ...state.document_show };
      clone_document_show.my_inventory = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "ON CHANGE NO PO":
      var clone_document_show = { ...state.document_show };
      clone_document_show.no_po = action.value;
      return {
        ...state,
        document_show: clone_document_show
      }
    case "ON CHANGE NO PART":
      var clone_list_show = { ...state.list_show };
      // console.log(clone_list_show.action.rowIndex)
      // clone_list_show.no_part = action.value;
      // return {
      //   ...state,
      //   list_show: [clone_list_show]
      // }
    // case "CLICK SEARCH POPUP NO PART":


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