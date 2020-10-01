import Vue from 'vue'
import {_baseUrl, parseParam} from "@/service/api";

const BannerInfoUrl = `${_baseUrl}api/banner/info`
export const GetBannerInfoApi=(Banner_id)=>{
  let url = `${BannerInfoUrl}/${Banner_id}`
  console.log(url)
  return Vue.prototype.$fetch(`${url}`)
}
const BannerListUrl = `${_baseUrl}api/banner/list`
export const GetBannerListApi = (cur_page,page_size)=>{
  let Banner_payload = {
    "Page": cur_page === undefined ? 1 : cur_page,
    "Limit": page_size === undefined ? 5 : page_size,
    "Sort": "",
    "Where": ""
  }
  let p = parseParam(Banner_payload)
  let rand = parseInt(Math.random()*100000)
  let url = `${BannerListUrl}?${p}&rand=${rand}`
  console.log(url)
  return Vue.prototype.$fetch(url)
}
const BannerAddUrl = `${_baseUrl}api/banner/add`
export const AddBannerApi = (Banner)=>{
  return Vue.prototype.$post(`${BannerAddUrl}`,Banner)
}
const BannerEditUrl = `${_baseUrl}api/banner/edit`
export const EditBannerApi = (Banner)=>{
  return Vue.prototype.$post(`${BannerEditUrl}`,Banner)
}
const BannerDeleteUrl = `${_baseUrl}api/banner/delete`
export const DeleteBannerApi=(id)=>{
  return Vue.prototype.$post(`${BannerDeleteUrl}/${id}`)
}
