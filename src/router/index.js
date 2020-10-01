import Vue from 'vue'
import VueRouter from 'vue-router'
import Category from "@/components/Category";
import User from "@/components/User";
import Product from "@/components/Product"
import Order from "@/components/Order"
import Banner from "@/components/Banner"
import Layout from "@/components/Layout"
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children:[
      {
        path: '/',
        name: 'User',
        component: User
      },
      {
        path: '/user',
        name: 'User',
        component: User
      },
      {
        path: '/product',
        name: 'Product',
        component: Product
      },
      {
        path: '/order',
        name: 'Order',
        component: Order
      }, {
        path: '/banner',
        name: 'Banner',
        component: Banner
      },{
        path: '/category',
        name: 'Category',
        component: Category
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
