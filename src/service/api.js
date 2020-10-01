import Vue from 'vue'
import { post, fetch, patch, put, del } from './index'

Vue.prototype.$post = post
Vue.prototype.$fetch = fetch
Vue.prototype.$patch = patch
Vue.prototype.$put = put
Vue.prototype.$del = del

export const _baseUrl = 'http://localhost:9090/'


const userInfoUrl = `${_baseUrl}api/user/info`
export const GetUserInfoApi=(user_id)=>{
  let url = `${userInfoUrl}/${user_id}`
  console.log(url)
  return Vue.prototype.$fetch(`${url}`)
}
const userListUrl = `${_baseUrl}api/user/list`
export const GetUserListApi = (cur_page,page_size)=>{
  let user_payload = {
    "Page": cur_page === undefined ? 1 : cur_page,
    "Limit": page_size === undefined ? 5 : page_size,
    "Sort": "",
    "Where": ""
  }
  let p = parseParam(user_payload)
  let rand = parseInt(Math.random()*100000)
  let url = `${userListUrl}?${p}&rand=${rand}`
  console.log(url)
  return Vue.prototype.$fetch(url)
}
const userAddUrl = `${_baseUrl}api/user/add`
export const AddUserApi = (user)=>{
  return Vue.prototype.$post(`${userAddUrl}`,user)
}
const userEditUrl = `${_baseUrl}api/user/edit`
export const EditUserApi = (user)=>{
  return Vue.prototype.$post(`${userEditUrl}`,user)
}
const userDeleteUrl = `${_baseUrl}api/user/delete`
export const DeleteUserApi=(id)=>{
  return Vue.prototype.$post(`${userDeleteUrl}/${id}`)
}

export function parseParam(data) {
  try {
    let tempArr = [];
    for (let i in data) {
      let key = encodeURIComponent(i);
      let value = encodeURIComponent(data[i]);
      tempArr.push(key + '=' + value);
    }
    let urlParamsStr = tempArr.join('&');
    return urlParamsStr;
  } catch (err) {
    return '';
  }
};
