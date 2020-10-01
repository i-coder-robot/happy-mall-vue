<template>
  <div>
    <div class="addBtn">
      <el-button type="primary" @click="dialogVisible = true">新增用户</el-button>
    </div>
    <el-table
        :data="UserList"
        stripe
        style="width: 90%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="用户ID">
              <span>{{ props.row.userId }}</span>
            </el-form-item>
            <el-form-item label="昵称">
              <span>{{ props.row.nickName }}</span>
            </el-form-item>
            <el-form-item label="手机号">
              <span>{{ props.row.mobile }}</span>
            </el-form-item>
            <el-form-item label="地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="是否锁定">
              <span>{{ props.row.isLocked ? "锁定" : "未锁定" }}</span>
            </el-form-item>
            <el-form-item label="是否删除">
              <span>{{ props.row.isDeleted ? "已删除" : "未删除" }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
          label="用户ID"
          prop="userId">
      </el-table-column>
      <el-table-column
          label="昵称"
          prop="nickName">
      </el-table-column>
      <el-table-column
          label="手机号"
          prop="mobile">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEditUser(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDeleteUser(scope.$index, scope.row)">{{ scope.row.isDeleted ? "复活" : "删除" }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
          background
          layout="prev, pager, next"
          @current-change="CurrentChange"
          @prev-click="PrevClick"
          @next-click="NextClick"
          :page-count="TotalPage">
      </el-pagination>
    </div>
    <el-dialog
        :visible.sync="dialogVisible"
        @close="beforeUserClosed"
        width="30%">
      <div slot="title" class="header-title">
        <span>{{is_edit?"编辑用户":"新增用户"}}</span>
      </div>
      <div class="addUser">
        <span v-show="unShow">{{ this.UserInfo.userId }}</span>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户昵称">
            <el-input v-model="form.nickName"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="CancelHandler">取 消</el-button>
    <el-button type="primary" @click="SubmitHandler">确 定</el-button>
  </span>
    </el-dialog>


  </div>
</template>

<script>
export default {
  name: "User",
  computed: {
    UserInfo () {
      let userInfo = this.$store.getters.xxx_user_info
      this.form.nickName = userInfo.nickName
      this.form.mobile = userInfo.mobile
      this.form.address = userInfo.address
      return userInfo
    },
    UserList () {
      return this.$store.state.user_list
    },
    Limit () {
      return this.$store.state.limit
    },
    CurrentPage: {
      get () {
        return this.$store.state.current_page
      },
      set (val) {
        this.$store.dispatch("Change_Current_Page", val)
      }
    },
    TotalPage () {
      return this.$store.state.user_total_page
    }
  },
  mounted () {
    this.GetUserList()
  },
  methods: {
    NextClick: function (page) {
      console.log(page)
    },
    PrevClick: function (page) {
      console.log(page)
    },
    beforeUserClosed:function (){
      this.is_edit=false
    },
    CurrentChange: function (page) {
      this.CurrentPage = page
      this.GetUserList()
    },
    CancelHandler: function () {
      this.dialogVisible = false
      this.is_edit=false
    },
    SubmitHandler: function () {
      this.dialogVisible = false
      if (this.is_edit) {
        this.handleUpdateUser()
      } else {
        this.handleAddUser()
      }
      this.handleClearData()
    },
    handleAddUser: function () {
      let user = {
        nickName: this.form.nickName,
        mobile: this.form.mobile,
        address: this.form.address,
        password: '',
      }
      this.$store.dispatch("Add_User", user)
      this.GetUserList()
    },
    GetUserList: function () {
      this.$store.dispatch("Get_User_List", {
        "page_size": this.Limit === undefined ? 5 : this.Limit,
        "current_page": this.CurrentPage === undefined ? 1 : this.CurrentPage
      })

    },
    handleUpdateUser () {
      let payload = {
        userId: this.user_id,
        nickName: this.form.nickName,
        mobile: this.form.mobile,
        address: this.form.address,
      }
      this.$store.dispatch("Edit_User", payload)
    },
    handleEditUser (index, row) {
      let userId = row["userId"]
      this.user_id = userId
      this.$store.dispatch("Get_User_Info", userId)
      this.dialogVisible = true
      this.is_edit = true
    },
    handleDeleteUser (index, row) {
      let userId = row["userId"]
      this.$store.dispatch("Delete_User", userId)
    },
    handleClearData(){
      this.form.nickName=""
      this.form.mobile=""
      this.form.address=""
      this.user_id=''
      this.is_edit=false
    }
  },
  data () {
    return {
      dialogVisible: false,
      unShow: false,
      is_edit: false,
      user_id: '',
      form: {
        nickName: "",
        mobile: "",
        address: ""
      }
    }
  }
}
</script>

<style>

.el-form--inline .el-form-item{

}

.addBtn {
  text-align: right;
  padding-right: 123px;
  line-height: 75px;
  padding-top: 30px;
}

.addUser {
  width: 90%;
}

.page {
  margin-top: 40px;
  margin-right: 188px;
  text-align: right;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.el-table__header tr,
.el-table__header th {
  padding: 0;
  line-height: 40px;
}
</style>

