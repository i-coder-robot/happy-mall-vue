<template>
  <div>
    <div class="addBtn">
      <el-button type="primary" @click="dialogBannerVisible = true">新增轮播</el-button>
    </div>
    <el-table
        :data="BannerList"
        style="width: 90%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="轮播图ID">
              <span>{{ props.row.bannerID }}</span>
            </el-form-item>
            <el-form-item label="Url">
              <span>{{ props.row.url }}</span>
            </el-form-item>
            <el-form-item label="跳转Url">
              <span>{{ props.row.redirectUrl }}</span>
            </el-form-item>
            <el-form-item label="排序">
              <span>{{ props.row.order }}</span>
            </el-form-item>
            <el-form-item label="是否删除">
              <span>{{ props.row.isDeleted ? "已删除" : "未删除" }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
          label="轮播图ID"
          prop="bannerID">
      </el-table-column>
      <el-table-column
          label="排序"
          prop="order">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEditBanner(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDeleteBanner(scope.$index, scope.row)">{{ scope.row.isDeleted ? "复活" : "删除" }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
          background
          layout="prev, pager, next"
          @current-change="CurrentBannerChange"
          @prev-click="PrevClick"
          @next-click="NextClick"
          :page-count="TotalPage">
      </el-pagination>
    </div>
    <el-dialog
        title="新增轮播图"
        :visible.sync="dialogBannerVisible"
        width="30%">
      <div class="addBanner">
        <span v-show="unShow">{{ this.BannerInfo.bannerID }}</span>
        <el-form ref="form" :model="banner_form" label-width="80px">
          <el-form-item label="Url">
            <el-input v-model="banner_form.url"></el-input>
          </el-form-item>
          <el-form-item label="跳转URL">
            <el-input v-model="banner_form.redirectUrl"></el-input>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="banner_form.order"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="CancelBannerHandler">取 消</el-button>
    <el-button type="primary" @click="SubmitBannerHandler">确 定</el-button>
  </span>
    </el-dialog>


  </div>
</template>

<script>
export default {
  name: "Banner",
  computed: {
    BannerInfo () {
      let bannerInfo = this.$store.state.banner_info
      this.banner_form.url = bannerInfo.url
      this.banner_form.redirectUrl = bannerInfo.redirectUrl
      this.banner_form.order = bannerInfo.order
      return bannerInfo
    },
    BannerList () {
      return this.$store.state.banner_list
    },
    Limit () {
      return this.$store.state.limit
    },
    CurrentPage: {
      get () {
        return this.$store.state.banner_current_page
      },
      set (val) {
        this.$store.dispatch("Change_Banner_Current_Page", val)
      }
    },
    TotalPage () {
      return this.$store.state.banner_total_page
    }
  },
  mounted () {
    this.GetBannerList()
  },
  methods: {
    NextClick: function (page) {
      console.log(page)
    },
    PrevClick: function (page) {
      console.log(page)
    },
    CurrentBannerChange: function (page) {
      this.CurrentPage = page
      this.GetBannerList()
    },
    CancelBannerHandler: function () {
      console.log("取消弹窗。。。")
      this.dialogBannerVisible = false
    },
    SubmitBannerHandler: function () {
      this.dialogBannerVisible = false
      if (this.is_banner_edit) {
        this.handleUpdateBanner()
      } else {
        this.handleAddBanner()
      }
      this.handleClearBannerData()
    },
    handleAddBanner: function () {
      let payload = this.GetBannerFormParameter()
      this.$store.dispatch("Add_Banner", payload)
    },
    GetBannerList: function () {
      this.$store.dispatch("Get_Banner_List", {
        "page_size": this.Limit === undefined ? 5 : this.Limit,
        "current_page": this.CurrentPage === undefined ? 1 : this.CurrentPage
      })

    },
    GetBannerFormParameter(){
      return {
        BannerId: this.banner_id,
        url: this.banner_form.url,
        redirectUrl: this.banner_form.redirectUrl,
        order: parseInt(this.banner_form.order),
      }
    },
    handleUpdateBanner () {
      let payload = this.GetBannerFormParameter()
      this.$store.dispatch("Edit_Banner", payload)
    },
    handleEditBanner (index, row) {
      let BannerId = row["bannerID"]
      this.banner_id = BannerId
      this.$store.dispatch("Get_Banner_Info", BannerId)
      this.dialogBannerVisible = true
      this.is_banner_edit = true
    },
    handleDeleteBanner (index, row) {
      let BannerId = row["bannerID"]
      this.$store.dispatch("Delete_Banner", BannerId)
    },
    handleClearBannerData(){
      this.banner_form.url=""
      this.banner_form.redirectUrl=""
      this.banner_form.order=""
      this.banner_id=''
      this.is_banner_edit=false
    }
  },
  data () {
    return {
      dialogBannerVisible: false,
      unShow: false,
      is_banner_edit: false,
      banner_id: '',
      banner_form: {
        url: "",
        redirectUrl: "",
        order: ""
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

.addBanner {
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
