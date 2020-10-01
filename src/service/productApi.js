import Vue from 'vue'
import {_baseUrl, parseParam} from "@/service/api";

const ProductInfoUrl = `${_baseUrl}api/product/info`
export const GetProductInfoApi=(Product_id)=>{
  let url = `${ProductInfoUrl}/${Product_id}`
  console.log(url)
  return Vue.prototype.$fetch(`${url}`)
}
const ProductListUrl = `${_baseUrl}api/product/list`
export const GetProductListApi = (cur_page,page_size)=>{
  let Product_payload = {
    "Page": cur_page === undefined ? 1 : cur_page,
    "Limit": page_size === undefined ? 5 : page_size,
    "Sort": "",
    "Where": ""
  }
  let p = parseParam(Product_payload)
  let rand = parseInt(Math.random()*100000)
  let url = `${ProductListUrl}?${p}&rand=${rand}`
  return Vue.prototype.$fetch(url)
}

const ProductAddUrl = `${_baseUrl}api/product/add`
export const AddProductApi = (Product)=>{
  return Vue.prototype.$post(`${ProductAddUrl}`,Product)
}

const ProductEditUrl = `${_baseUrl}api/product/edit`
export const EditProductApi = (Product)=>{
  return Vue.prototype.$post(`${ProductEditUrl}`,Product)
}

const ProductDeleteUrl = `${_baseUrl}api/product/delete`
export const DeleteProductApi=(id)=>{
  return Vue.prototype.$post(`${ProductDeleteUrl}/${id}`)
}
