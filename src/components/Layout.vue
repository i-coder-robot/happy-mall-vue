<template>
  <el-container>
<!--    <el-header>Header</el-header>-->
    <el-container>
      <el-aside width="200px">
<!--        <el-row>商城</el-row>-->
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                router
                @open="handleOpen"
                @close="handleClose">
<!--              <el-submenu index="1">-->
<!--                <template slot="title">-->
<!--                  <i class="el-icon-location"></i>-->
<!--                  <span>导航一</span>-->
<!--                </template>-->
<!--                <el-menu-item-group>-->
<!--                  <template slot="title">分组一</template>-->
<!--                  <el-menu-item index="1-1">选项1</el-menu-item>-->
<!--                  <el-menu-item index="1-2">选项2</el-menu-item>-->
<!--                </el-menu-item-group>-->
<!--                <el-menu-item-group title="分组2">-->
<!--                  <el-menu-item index="1-3">选项3</el-menu-item>-->
<!--                </el-menu-item-group>-->
<!--                <el-submenu index="1-4">-->
<!--                  <template slot="title">选项4</template>-->
<!--                  <el-menu-item index="1-4-1">选项1</el-menu-item>-->
<!--                </el-submenu>-->
<!--              </el-submenu>-->
              <el-menu-item index="/user">
                <i class="el-icon-user"></i>
                <span slot="title">用户列表</span>
              </el-menu-item>
              <el-menu-item index="/product">
                <i class="el-icon-cherry"></i>
                <span slot="title">商品列表</span>
              </el-menu-item>
              <el-menu-item index="/order">
                <i class="el-icon-document"></i>
                <span slot="title">订单列表</span>
              </el-menu-item>
              <el-menu-item index="/banner">
                <i class="el-icon-help"></i>
                <span slot="title">轮播图</span>
              </el-menu-item>
              <el-menu-item index="/category">
                <i class="el-icon-ice-tea"></i>
                <span slot="title">分类列表</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main><router-view/></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Layout",
  data () {
    return {}
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
.el-container{
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0px;
  bottom:0px;
}
.el-header {
  /*background-color: #B3c001;*/
  /*color: #333;*/
  /*text-align: center;*/
  /*line-height: 60px;*/
  padding: 0px;
  z-index: 1000;
}
.el-header .fr{
  float:right;
}

.el-header .el-menu{
  border-bottom: none;
}

.el-aside, .el-main{
  padding-top: 60px;
}
.el-aside{
  background-color: #545c64;
}

.el-aside .el-menu{
  border-right: none;
}


.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  /*line-height: 160px;*/
}
</style>
