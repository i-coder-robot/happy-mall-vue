<template>
  <div>
    <div class="addBtn">
      <el-button type="primary" @click="dialogCategoryVisible = true">新增分类</el-button>
    </div>
    <el-table
        :data="CategoryList"
        style="width: 90%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="一级分类ID">
              <span>{{ props.row.C1CategoryID }}</span>
            </el-form-item>
            <el-form-item label="一级名称">
              <span>{{ props.row.C1Name }}</span>
            </el-form-item>
            <el-form-item label="一级描述">
              <span>{{ props.row.C1Desc }}</span>
            </el-form-item>
            <el-form-item label="二级分类ID">
              <span>{{ props.row.C2CategoryID }}</span>
            </el-form-item>
            <el-form-item label="二级名称">
              <span>{{ props.row.C2Name }}</span>
            </el-form-item>
            <el-form-item label="三级分类ID">
              <span>{{ props.row.C3CategoryID }}</span>
            </el-form-item>
            <el-form-item label="三级名称">
              <span>{{ props.row.C3Name }}</span>
            </el-form-item>
            <el-form-item label="是否删除">
              <span>{{ props.row.isDeleted ? "已删除" : "未删除" }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
          label="一级分类名称"
          prop="C1Name">
      </el-table-column>
      <el-table-column
          label="二级分类名称"
          prop="C2Name">
      </el-table-column>
      <el-table-column
          label="三级分类名称"
          prop="C3Name">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEditCategory(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDeleteCategory(scope.$index, scope.row)">{{ scope.row.C3IsDeleted ? "复活" : "删除" }}
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
        title="新增分类"
        :visible.sync="dialogCategoryVisible"
        width="30%">
      <div class="addUser">
        <span v-show="unShow">{{ this.CategoryInfo.userId }}</span>

        <el-form ref="form" :model="category_form" label-width="80px">
          <el-form-item label="一级名称">
            <el-input v-model="category_form.C1Name"></el-input>
          </el-form-item>
          <el-form-item label="一级描述">
            <el-input v-model="category_form.C1Desc"></el-input>
          </el-form-item>
          <el-form-item label="一级排序">
            <el-input v-model="category_form.C1Order"></el-input>
          </el-form-item>
          <el-form-item label="二级名称">
            <el-input v-model="category_form.C2Name"></el-input>
          </el-form-item>
          <el-form-item label="二级排序">
            <el-input v-model="category_form.C2Order"></el-input>
          </el-form-item>
          <el-form-item v-if="is_category_edit" label="二级父ID">
            <el-input v-model="category_form.C2ParentId"></el-input>
          </el-form-item>
          <el-form-item label="三级名称">
            <el-input v-model="category_form.C3Name"></el-input>
          </el-form-item>
          <el-form-item label="三级排序">
            <el-input v-model="category_form.C3Order"></el-input>
          </el-form-item>
          <el-form-item v-if="is_category_edit" label="三级父ID">
            <el-input v-model="category_form.C3ParentId"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="CancelCategoryHandler">取 消</el-button>
    <el-button type="primary" @click="SubmitCategoryHandler">确 定</el-button>
  </span>
    </el-dialog>


  </div>
</template>

<script>
export default {
  name: "User",
  computed: {
    CategoryInfo () {
      let categoryInfo = this.$store.state.category_info
      this.category_form.nickName = categoryInfo.nickName
      this.category_form.mobile = categoryInfo.mobile
      this.category_form.address = categoryInfo.address
      return categoryInfo
    },
    CategoryList () {
      return this.$store.state.category_list_4_backend
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
      return this.$store.state.category_total_page
    }
  },
  mounted () {
    this.GetCategoryList()
  },
  methods: {
    NextClick: function (page) {
      console.log(page)
    },
    PrevClick: function (page) {
      console.log(page)
    },
    CurrentChange: function (page) {
      this.CurrentPage = page
      this.GetCategoryList()
    },
    CancelCategoryHandler: function () {
      console.log("取消弹窗。。。")
      this.dialogCategoryVisible = false
    },
    SubmitCategoryHandler: function () {
      this.dialogCategoryVisible = false
      if (this.is_category_edit) {
        this.handleUpdateCategory()
      } else {
        this.handleAddCategory()
      }
      this.handleClearCategoryData()
    },
    handleAddCategory: function () {
      let payload = this.GetCategoryFormParam()
      this.$store.dispatch("Add_Category", payload)

    },
    GetCategoryList: function () {
      this.$store.dispatch("Get_Category_List", {
        "page_size": this.Limit === undefined ? 5 : this.Limit,
        "current_page": this.CurrentPage === undefined ? 1 : this.CurrentPage
      })

    },
    handleUpdateCategory () {
      let payload = this.GetCategoryFormParam()
      this.$store.dispatch("Edit_User", payload)
    },
    handleEditCategory (index, row) {
      let categoryId = row["c3CategoryId"]
      this.category_id = categoryId
      this.$store.dispatch("Get_Category_Info", categoryId)
      this.dialogCategoryVisible = true
      this.is_category_edit = true
    },
    handleDeleteCategory (index, row) {
      let categoryId = row["C3CategoryID"]
      this.$store.dispatch("Delete_Category", categoryId)
    },
    handleClearCategoryData () {
      this.C1CategoryID = ""
      this.C1Name = ""
      this.C1Desc = ""
      this.C1Order = 0
      this.C1ParentId = 0
      this.C2CategoryID = ""
      this.C2Name = ""
      this.C2Order = 0
      this.C2ParentId = ""
      this.C3CategoryID = ""
      this.C3Name = ""
      this.C3Order = 0
      this.C3ParentId = ""
      this.category_id = ''
      this.is_category_edit = false
    },
    GetCategoryFormParam () {
      return {
        C1CategoryID: this.category_form.C1CategoryID,
        C1Name: this.category_form.C1Name,
        C1Desc: this.category_form.C1Desc,
        C1Order: parseInt(this.category_form.C1Order),
        C1ParentId: "0",
        C2CategoryID: this.category_form.C2CategoryID,
        C2Name: this.category_form.C2Name,
        C2Order: parseInt(this.category_form.C2Order),
        C2ParentId: this.category_form.C2ParentId,
        C3CategoryID: this.category_form.C3CategoryID,
        C3Name: this.category_form.C3Name,
        C3Order: parseInt(this.category_form.C3Order),
        C3ParentId: this.category_form.C3ParentId
      }
    }
  },
  data () {
    return {
      dialogCategoryVisible: false,
      unShow: false,
      is_category_edit: false,
      category_id: '',
      category_form: {
        C1CategoryID: "",
        C1Name: "",
        C1Desc: "",
        C1Order: 0,
        C1ParentId: 0,
        C2CategoryID: "",
        C2Name: "",
        C2Order: 0,
        C2ParentId: "",
        C3CategoryID: "",
        C3Name: "",
        C3Order: 0,
        C3ParentId: ""
      }
    }
  }
}
</script>

<style scoped>

.addBtn {
  text-align: left;
  margin-left: 30px;
  margin-bottom: 30px;
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
</style>
