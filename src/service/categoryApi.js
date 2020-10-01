import Vue from 'vue'
import {_baseUrl, parseParam} from "@/service/api";

const CategoryInfoUrl = `${_baseUrl}api/category/info`
export const GetCategoryInfoApi=(Category_id)=>{
  let url = `${CategoryInfoUrl}/${Category_id}`
  console.log(url)
  return Vue.prototype.$fetch(`${url}`)
}

const CategoryList4BackendUrl = `${_baseUrl}api/category/list4backend`
export const GetCategoryList4BackendApi = (cur_page, page_size)=>{
  let Category_payload = {
    "Page": cur_page === undefined ? 1 : cur_page,
    "Limit": page_size === undefined ? 5 : page_size,
    "Sort": "",
    "Where": ""
  }
  let p = parseParam(Category_payload)
  let rand = parseInt(Math.random()*100000)
  let url = `${CategoryList4BackendUrl}?${p}&rand=${rand}`
  console.log(url)
  return Vue.prototype.$fetch(url)
}
const CategoryAddUrl = `${_baseUrl}api/category/add`
export const AddCategoryApi = (Category)=>{
  return Vue.prototype.$post(`${CategoryAddUrl}`,Category)
}
const CategoryEditUrl = `${_baseUrl}api/category/edit`
export const EditCategoryApi = (Category)=>{
  return Vue.prototype.$post(`${CategoryEditUrl}`,Category)
}
const CategoryDeleteUrl = `${_baseUrl}api/category/delete`
export const DeleteCategoryApi=(id)=>{
  return Vue.prototype.$post(`${CategoryDeleteUrl}/${id}`)
}
