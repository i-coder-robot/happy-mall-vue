import {AddUserApi, DeleteUserApi, EditUserApi, GetUserInfoApi, GetUserListApi} from "@/service/api";
import {
  AddProductApi,
  DeleteProductApi,
  EditProductApi,
  GetProductInfoApi,
  GetProductListApi
} from "@/service/productApi";
import {AddOrderApi, DeleteOrderApi, EditOrderApi, GetOrderInfoApi, GetOrderListApi} from "@/service/orderApi";
import {AddBannerApi, DeleteBannerApi, EditBannerApi, GetBannerInfoApi, GetBannerListApi} from "@/service/bannerApi";
import {
  AddCategoryApi,
  DeleteCategoryApi,
  EditCategoryApi,
  GetCategoryInfoApi,
  GetCategoryList4BackendApi
} from "@/service/categoryApi";

export default {

  async Get_User_List ({commit}, payload) {
    try {
      await GetUserListApi(payload["current_page"], payload["page_size"]).then(res => {
        if (res["entity"]["code"] === 200) {
          let entity = res["entity"]
          commit("Get_User_List_Mutation", entity)
        } else {
          console.log("00000000")
        }
      })
    } catch (e) {
      console.error(e)
    }
  },
  async Get_User_Info ({commit}, payload) {
    let res = await GetUserInfoApi(payload)
    let code = res["entity"]["code"]
    if (code === 200) {
      commit("Get_User_Info_Mutation", res["entity"])
    }
  },
  async Add_User ({commit}, payload) {
    try {
      let res = await AddUserApi(payload)
      let code = res["entity"]["code"]
      if (code === 200) {
        console.log("添加用户成功")
        let entity = res["entity"]
        commit('Add_User_Mutation', entity)
      }

      res = await GetUserListApi(this.CurrentPage, this.Limit)
      code = res["entity"]["code"]
      if (code === 200) {
        commit("Get_User_List_Mutation", res["entity"])
      }
    } catch (e) {
      console.error(e)
    }
  },
  async Edit_User ({commit}, payload) {
    let res = await EditUserApi(payload)
    let code = res["entity"]["code"]
    console.log(code)
    if (code === 200) {
      res = await GetUserListApi(this.CurrentPage, this.Limit)
      code = res["entity"]["code"]
      if (code === 200) {
        commit("Get_User_List_Mutation", res["entity"])
      }
    }
  },
  async Delete_User ({commit}, payload) {
    let res = await DeleteUserApi(payload)
    let code = res["entity"]["code"]
    if (code === 200) {
      res = await GetUserListApi(this.CurrentPage, this.Limit)
      code = res["entity"]["code"]
      if (code === 200) {
        commit("Get_User_List_Mutation", res["entity"])
      }
    }
  },
  async Change_Current_Page ({commit}, page) {
    await commit("Change_Current_Page_Mutation", page)
  },


  async Get_Product_List ({commit}, payload) {
    try {
      await GetProductListApi(payload["current_page"], payload["page_size"]).then(res => {
        if (res["entity"]["code"] === 200) {
          let entity = res["entity"]
          commit("Get_Product_List_Mutation", entity)
        } else {
          console.log("获取商品错误")
        }
      })
    } catch (e) {
      console.error(e)
    }
  },
  async Get_Product_Info ({commit}, payload) {
    let res = await GetProductInfoApi(payload)
    let code = res["entity"]["code"]
    if (code === 200) {
      commit("Get_Product_Info_Mutation", res["entity"])
    }
  },
  async Add_Product ({commit}, payload) {
    try {
      let res = await AddProductApi(payload)
      let code = res["entity"]["code"]
      if (code === 200) {
        res = await GetProductListApi(this.CurrentPage, this.Limit)
        code = res["entity"]["code"]
        if (code === 200) {
          commit("Get_Product_List_Mutation", res["entity"])
        }
      }
    } catch (e) {
      console.error(e)
    }
  },
  async Edit_Product ({commit}, payload) {
    let res = await EditProductApi(payload)
    let code = res["entity"]["code"]
    console.log(code)
    if (code === 200) {
      res = await GetProductListApi(this.CurrentPage, this.Limit)
      code = res["entity"]["code"]
      if (code === 200) {
        commit("Get_Product_List_Mutation", res["entity"])
      }
    }
  },
  async Delete_Product ({commit}, payload) {
    let res = await DeleteProductApi(payload)
    let code = res["entity"]["code"]
    if (code === 200) {
      res = await GetProductListApi(this.CurrentPage, this.Limit)
      code = res["entity"]["code"]
      if (code === 200) {
        commit("Get_Product_List_Mutation", res["entity"])
      }
    }
  },
  async Change_Product_Current_Page ({commit}, page) {
    await commit("Change_Product_Current_Page_Mutation", page)
  },
  async Edit_Order ({commit}, payload) {
    let res = await EditOrderApi(payload)
    let code = res["entity"]["code"]
    console.log(code)
    if (code === 200) {
      res = await GetOrderListApi(this.CurrentPage, this.Limit)
      code = res["entity"]["code"]
      if (code === 200) {
        commit("Get_Order_List_Mutation", res["entity"])
      }
    }
  },
  async Get_Order_List ({commit}, payload) {
    try {
      await GetOrderListApi(payload["current_page"], payload["page_size"]).then(res => {
        if (res["entity"]["code"] === 200) {
          let entity = res["entity"]
          commit("Get_Order_List_Mutation", entity)
        } else {
          console.log("获取订单列表失败")
        }
      })
    } catch (e) {
      console.error(e)
    }
  },
  async Get_Order_Info ({commit}, payload) {
    let res = await GetOrderInfoApi(payload)
    let code = res["entity"]["code"]
    if (code === 200) {
      commit("Get_Order_Info_Mutation", res["entity"])
    }
  },
  async Delete_Order ({commit}, payload) {
    let res = await DeleteOrderApi(payload)
    let code = res["entity"]["code"]
    if (code === 200) {
      res = await GetOrderListApi(this.CurrentPage, this.Limit)
      code = res["entity"]["code"]
      if (code === 200) {
        commit("Get_Order_List_Mutation", res["entity"])
      }
    }
  },
  async Change_Order_Current_Page ({commit}, page) {
    await commit("Change_Order_Current_Page_Mutation", page)
  },

  async Get_Banner_List ({commit}, payload) {
    try {
      await GetBannerListApi(payload["current_page"], payload["page_size"]).then(res => {
        if (res["entity"]["code"] === 200) {
          let entity = res["entity"]
          commit("Get_Banner_List_Mutation", entity)
        } else {
          console.log("获取录播列表失败")
        }
      })
    } catch (e) {
      console.error(e)
    }
  },
  async Get_Banner_Info ({commit}, payload) {
    let res = await GetBannerInfoApi(payload)
    let code = res["entity"]["code"]
    if (code === 200) {
      commit("Get_Banner_Info_Mutation", res["entity"])
    }
  },
  async Add_Banner ({commit}, payload) {
    try {
      let res = await AddBannerApi(payload)
      let code = res["entity"]["code"]
      if (code === 200) {
        res = await GetBannerListApi(this.CurrentPage, this.Limit)
        code = res["entity"]["code"]
        if (code === 200) {
          commit("Get_Banner_List_Mutation", res["entity"])
        }
      }
    } catch (e) {
      console.error(e)
    }
  },
  async Edit_Banner ({commit}, payload) {
    let res = await EditBannerApi(payload)
    let code = res["entity"]["code"]
    console.log(code)
    if (code === 200) {
      res = await GetBannerListApi(this.CurrentPage, this.Limit)
      code = res["entity"]["code"]
      if (code === 200) {
        commit("Get_Banner_List_Mutation", res["entity"])
      }
    }
  },
  async Delete_Banner ({commit}, payload) {
    let res = await DeleteBannerApi(payload)
    let code = res["entity"]["code"]
    if (code === 200) {
      res = await GetBannerListApi(this.CurrentPage, this.Limit)
      code = res["entity"]["code"]
      if (code === 200) {
        commit("Get_Banner_List_Mutation", res["entity"])
      }
    }
  },
  async Change_Banner_Current_Page ({commit}, page) {
    await commit("Change_Banner_Current_Page_Mutation", page)
  },

  async Get_Category_List ({commit}, payload) {
    try {
      await GetCategoryList4BackendApi(payload["current_page"], payload["page_size"]).then(res => {
        if (res["entity"]["code"] === 200) {
          let entity = res["entity"]
          commit("Get_Category_List_4_Backend_Mutation", entity)
        } else {
          console.log("获取分类列表失败")
        }
      })
    } catch (e) {
      console.error(e)
    }
  },
  async Get_Category_Info ({commit}, payload) {
    let res = await GetCategoryInfoApi(payload)
    let code = res["entity"]["code"]
    if (code === 200) {
      commit("Get_Category_Info_Mutation", res["entity"])
    }
  },
  async Add_Category ({commit}, payload) {
    try {
      let res = await AddCategoryApi(payload)
      let code = res["entity"]["code"]
      if (code === 200) {
        res = await GetCategoryList4BackendApi(this.CurrentPage, this.Limit)
        code = res["entity"]["code"]
        if (code === 200) {
          commit("Get_Category_List_4_Backend_Mutation", res["entity"])
        }
      }
    } catch (e) {
      console.error(e)
    }
  },
  async Edit_Category ({commit}, payload) {
    let res = await EditCategoryApi(payload)
    let code = res["entity"]["code"]
    console.log(code)
    if (code === 200) {
      res = await GetCategoryList4BackendApi(this.CurrentPage, this.Limit)
      code = res["entity"]["code"]
      if (code === 200) {
        commit("Get_Category_List_4_Backend_Mutation", res["entity"])
      }
    }
  },
  async Delete_Category ({commit}, payload) {
    let res = await DeleteCategoryApi(payload)
    let code = res["entity"]["code"]
    if (code === 200) {
      res = await GetCategoryList4BackendApi(this.CurrentPage, this.Limit)
      code = res["entity"]["code"]
      if (code === 200) {
        commit("Get_Category_List_4_Backend_Mutation", res["entity"])
      }
    }
  },
  async Change_Category_Current_Page ({commit}, page) {
    await commit("Change_Category_Current_Page_Mutation", page)
  },
}
