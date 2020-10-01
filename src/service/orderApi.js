import Vue from 'vue'
import {_baseUrl, parseParam} from "@/service/api";

const OrderInfoUrl = `${_baseUrl}api/order/info`
export const GetOrderInfoApi=(Order_id)=>{
  let url = `${OrderInfoUrl}/${Order_id}`
  console.log(url)
  return Vue.prototype.$fetch(`${url}`)
}
const OrderListUrl = `${_baseUrl}api/order/list`
export const GetOrderListApi = (cur_page,page_size)=>{
  let Order_payload = {
    "Page": cur_page === undefined ? 1 : cur_page,
    "Limit": page_size === undefined ? 5 : page_size,
    "Sort": "",
    "Where": ""
  }
  let p = parseParam(Order_payload)
  let rand = parseInt(Math.random()*100000)
  let url = `${OrderListUrl}?${p}&rand=${rand}`
  console.log(url)
  return Vue.prototype.$fetch(url)
}

const OrderAddUrl = `${_baseUrl}api/order/add`
export const AddOrderApi = (Order)=>{
  return Vue.prototype.$post(`${OrderAddUrl}`,Order)
}

const OrderEditUrl = `${_baseUrl}api/order/edit`
export const EditOrderApi = (Order)=>{
  return Vue.prototype.$post(`${OrderEditUrl}`,Order)
}

const OrderDeleteUrl = `${_baseUrl}api/order/delete`
export const DeleteOrderApi=(id)=>{
  return Vue.prototype.$post(`${OrderDeleteUrl}/${id}`)
}
