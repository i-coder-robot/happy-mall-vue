import {GetCategoryList4BackendApi} from "@/service/categoryApi";

export default {
  Change_Current_Page_Mutation (state, page) {
    state.current_page = page
  },
  Get_User_List_Mutation (state, entity) {
    state.user_list = entity["data"]
    state.user_total = entity["total"]
    state.user_total_page = entity["totalPage"]
  },
  Get_User_Info_Mutation (state, entity) {
    console.log("Get_User_Info_Mutation")
    let data = JSON.parse(JSON.stringify(entity["data"]))
    console.log(typeof data)
    console.log(data)
    state.user_info = data
    // state.user_info = JSON.parse(data)
    console.log("Get_User_Info_Mutation end.....")
  },

  Change_Product_Current_Page_Mutation (state, page) {
    state.product_current_page = page
  },
  Get_Product_List_Mutation (state, entity) {
    state.product_list = entity["data"]
    state.product_total = entity["total"]
    state.product_total_page = entity["totalPage"]
  },
  Get_Product_Info_Mutation (state, entity) {
    state.product_info = entity["data"]
  },

  Change_Order_Current_Page_Mutation (state, page) {
    state.order_current_page = page
  },
  Get_Order_List_Mutation (state, entity) {
    state.order_list = entity["data"]
    state.order_total = entity["total"]
    state.order_total_page = entity["totalPage"]
  },
  Get_Order_Info_Mutation (state, entity) {
    state.user_info = entity["data"]
  },

  Change_Category_Current_Page_Mutation (state, page) {
    state.category_current_page = page
  },
  Get_Category_List_4_Backend_Mutation (state, entity) {
    state.category_list_4_backend = entity["data"]
    state.category_total = entity["total"]
    state.category_total_page = entity["totalPage"]
  },
  Get_User_Category_Mutation (state, entity) {
    state.user_info = entity["data"]
  },

  Change_Banner_Current_Page_Mutation (state, page) {
    state.banner_current_page = page
  },
  Get_Banner_List_Mutation (state, entity) {
    state.banner_list = entity["data"]
    state.banner_total = entity["total"]
    state.banner_total_page = entity["totalPage"]
  },
  Get_Banner_Info_Mutation (state, entity) {
    state.banner_info = entity["data"]
  },
}
