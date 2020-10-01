<template>
  <div>
    <div class="addBtn">
      <el-button type="primary" @click="dialogProductVisible = true">新增商品</el-button>
    </div>
    <el-table
        :data="ProductList"
        style="width: 90%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="商品ID">
              <span>{{ props.row.productId }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.productName }}</span>
            </el-form-item>
            <el-form-item label="商品简介">
              <span>{{ props.row.productIntro }}</span>
            </el-form-item>
            <el-form-item label="封面">
              <span>{{ props.row.productCoverImg }}</span>
            </el-form-item>
            <el-form-item label="轮播封面">
              <span>{{ props.row.productBanner }}</span>
            </el-form-item>
            <el-form-item label="原始价格">
              <span>{{ props.row.originalPrice }}</span>
            </el-form-item>
            <el-form-item label="销售价格">
              <span>{{ props.row.sellingPrice }}</span>
            </el-form-item>
            <el-form-item label="库存">
              <span>{{ props.row.stockNum }}</span>
            </el-form-item>
            <el-form-item label="库存">
              <span>{{ props.row.tag }}</span>
            </el-form-item>
            <el-form-item label="详细介绍">
              <span>{{ props.row.productDetailContent }}</span>
            </el-form-item>
            <el-form-item label="是否删除">
              <span>{{ props.row.isDeleted ? "已删除" : "未删除" }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
          label="产品ID"
          prop="productId">
      </el-table-column>
      <el-table-column
          label="产品名称"
          prop="productName">
      </el-table-column>
      <el-table-column
          label="原始价格"
          prop="originalPrice">
      </el-table-column>
      <el-table-column
          label="销售价格"
          prop="sellingPrice">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEditProduct(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDeleteProduct(scope.$index, scope.row)">{{ scope.row.isDeleted ? "复活" : "删除" }}
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
        title="新增商品"
        :visible.sync="dialogProductVisible"
        width="30%">
      <div class="addProduct">
        <span v-show="unShow">{{ this.ProductInfo.productId }}</span>
        <el-form ref="form" :model="product_form" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="product_form.productName"></el-input>
          </el-form-item>
          <el-form-item label="商品简介">
            <el-input v-model="product_form.productIntro"></el-input>
          </el-form-item>
          <el-form-item label="一级分类">
            <el-select v-model="c1_name" placeholder="请选择">
              <el-option
                  v-for="item in Category1List"
                  :key="item.c1_category_id"
                  :label="item.c1_category_name"
                  :value="item.c1_category_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级分类">
            <el-select v-model="c2_name" placeholder="请选择">
              <el-option
                  v-for="item in Category2List"
                  :key="item.c2_category_id"
                  :label="item.c2_category_name"
                  :value="item.c2_category_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="三级分类">
            <el-select v-model="c3_name" @change="c3Change" placeholder="请选择">
              <el-option
                  v-for="item in Category3List"
                  :key="item.c3_category_id"
                  :label="item.c3_category_name"
                  :value="item.c3_category_id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="封面">
            <el-input v-model="product_form.productCoverImg"></el-input>
          </el-form-item>
          <el-form-item label="轮播图">
            <el-input v-model="product_form.productBanner"></el-input>
          </el-form-item>
          <el-form-item label="原始价格">
            <el-input v-model="product_form.originalPrice"></el-input>
          </el-form-item>
          <el-form-item label="销售价格">
            <el-input v-model="product_form.sellingPrice"></el-input>
          </el-form-item>
          <el-form-item label="库存数">
            <el-input v-model="product_form.stockNum"></el-input>
          </el-form-item>
          <el-form-item label="Tag">
            <el-input v-model="product_form.tag"></el-input>
          </el-form-item>
          <el-form-item label="销售状态">
            <el-radio v-model="product_form.sellStatus" @change="SellStatusChange" label="0">销售中</el-radio>
            <el-radio v-model="product_form.sellStatus" @change="SellStatusChange" label="1">停止销售</el-radio>
          </el-form-item>
          <el-form-item label="商品详情">
            <el-input v-model="product_form.productDetailContent"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="CancelProductHandler">取 消</el-button>
    <el-button type="primary" @click="SubmitHandler">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import Category from '@/components/Category'
export default {
  name: "Product",
  computed: {
    ProductInfo () {
      let productInfo = this.$store.state.product_info
      this.product_form.productName = productInfo.productName
      this.product_form.productIntro = productInfo.productIntro
      this.product_form.categoryId = productInfo.categoryId
      if (this.dialogProductVisible) {
        for (let c3_item of this.Category3List) {
          if (c3_item.c3_category_id === productInfo.categoryId) {
            this.c3_name = c3_item.c3_category_name
            this.c3ParentId = c3_item.c3_parent_id
          }
        }
        for (let c2_item of this.Category2List){
          if(c2_item.c2_category_id === this.c3ParentId){
            this.c2_name = c2_item.c2_category_name
            this.c2ParentId = c2_item.c2_parent_id
          }
        }
        for (let c1_item of this.Category1List){
          if(c1_item.c1_category_id === this.c2ParentId){
            this.c1_name = c1_item.c1_category_name
          }
        }
      }
      this.product_form.productCoverImg = productInfo.productCoverImg
      this.product_form.productBanner = productInfo.productBanner
      this.product_form.originalPrice = productInfo.originalPrice
      this.product_form.sellingPrice = productInfo.sellingPrice
      this.product_form.stockNum = productInfo.stockNum
      this.product_form.tag = productInfo.tag
      this.product_form.sellStatus = productInfo.sellStatus === undefined ? "0" : productInfo.sellStatus.toString()
      this.product_form.productDetailContent = productInfo.productDetailContent
      return productInfo
    },
    ProductList () {
      return this.$store.state.product_list
    },
    Category1List () {
      let items = this.$store.state.category_list_4_backend
      let c1_items = []
      let c1_names = []
      for (let item of items) {
        let o = {
          "c1_category_id": item.C1CategoryID,
          "c1_category_name": item.C1Name
        }
        if (c1_names.includes(item.C1Name)) {
          continue
        }
        c1_names.push(item.C1Name)
        c1_items.push(o)
      }
      return c1_items
    },
    Category2List () {
      let items = this.$store.state.category_list_4_backend
      let c2_items = []
      let c2_names = []
      for (let item of items) {
        let o = {
          "c2_category_id": item.C2CategoryID,
          "c2_category_name": item.C2Name,
          "c2_parent_id":item.C2ParentId
        }
        if (c2_names.includes(item.C2Name)) {
          continue
        }
        c2_names.push(item.C2Name)
        c2_items.push(o)
      }
      return c2_items
    },
    Category3List () {
      let items = this.$store.state.category_list_4_backend
      let c3_items = []
      let c3_names = []
      for (let item of items) {
        let o = {
          "c3_category_id": item.C3CategoryID,
          "c3_category_name": item.C3Name,
          "c3_parent_id":item.C3ParentId
        }
        if (c3_names.includes(item.C3Name)) {
          continue
        }
        c3_names.push(item.C2Name)
        c3_items.push(o)
      }
      return c3_items
    },
    Limit () {
      return this.$store.state.limit
    },
    CurrentProductPage: {
      get () {
        return this.$store.state.product_current_page
      },
      set (val) {
        this.$store.dispatch("Change_Product_Current_Page", val)
      }
    },
    TotalPage () {
      return this.$store.state.product_total_page
    }
  },
  mounted () {
    this.GetProductList()
    Category.mounted()//actions更好
  },
  methods: {
    c3Change: function (val) {
      this.selectedC3CategoryId = val
    },
    SellStatusChange: function (val) {
      this.selectedSellStatus = val
    },
    CurrentChange: function (page) {
      this.CurrentProductPage = page
      this.GetProductList()
    },
    CancelProductHandler: function () {
      this.dialogProductVisible = false
    },
    SubmitHandler: function () {
      this.dialogProductVisible = false
      if (this.is_product_edit) {
        this.handleUpdateProduct()
      } else {
        this.handleAddProduct()
      }
      this.handleClearProductData()
    },
    handleAddProduct: function () {
      this.GetProductFormPrams()
      console.log(this.productFormParam)
      this.$store.dispatch("Add_Product", this.productFormParam)
      this.GetProductList()
    },
    GetProductList: function () {
      this.$store.dispatch("Get_Product_List", {
        "page_size": this.Limit === undefined ? 5 : this.Limit,
        "current_page": this.CurrentProductPage === undefined ? 1 : this.CurrentProductPage
      })

    },
    handleUpdateProduct () {
      this.GetProductFormPrams()
      this.$store.dispatch("Edit_Product", this.productFormParam)
    },
    handleEditProduct (index, row) {
      let ProductId = row["productId"]
      this.product_id = ProductId
      this.product_form.productId=ProductId
      this.$store.dispatch("Get_Product_Info", ProductId)
      this.dialogProductVisible = true
      this.is_product_edit = true
    },
    handleDeleteProduct (index, row) {
      let ProductId = row["productId"]
      this.$store.dispatch("Delete_Product", ProductId)
    },
    GetProductFormPrams () {
      this.productFormParam = {
        productId: this.product_form.productId,
        productName: this.product_form.productName,
        productIntro: this.product_form.productIntro,
        categoryId: this.selectedC3CategoryId,
        productCoverImg: this.product_form.productCoverImg,
        productBanner: this.product_form.productBanner,
        originalPrice: parseInt(this.product_form.originalPrice),
        sellingPrice: parseInt(this.product_form.sellingPrice),
        stockNum: parseInt(this.product_form.stockNum),
        tag: this.product_form.tag,
        sellStatus: parseInt(this.selectedSellStatus),
        productDetailContent: this.product_form.productDetailContent,
      }
    },
    handleClearProductData () {
      this.is_product_edit = false
      this.product_id = "",
          this.product_form.productName = "",
          this.product_form.productIntro = "",
          this.product_form.categoryId = "",
          this.product_form.productCoverImg = "",
          this.product_form.productBanner = "",
          this.product_form.originalPrice = 0,
          this.product_form.sellingPrice = 0,
          this.product_form.sellStatus = "0",
          this.product_form.stockNum = 0,
          this.product_form.tag = "",
          this.product_form.productDetailContent = ""
    }
  },
  data () {
    return {
      dialogProductVisible: false,
      unShow: false,
      c1_name: "",
      c2_name: "",
      c3_name: "",
      selectedC1CategoryId: "",
      selectedC2CategoryId: "",
      selectedC3CategoryId: "",
      c3ParentId:"",
      c2ParentId:"",
      selectedSellStatus: "0",
      is_product_edit: false,
      product_id: '',
      productFormParam: {},
      product_form: {
        productId: "",
        productName: "",
        productIntro: "",
        categoryId: "",
        productCoverImg: "",
        productBanner: "",
        originalPrice: 0,
        sellingPrice: 0,
        stockNum: 0,
        sellStatus: "0",
        radio: "0",
        tag: "",
        productDetailContent: "",
      }
    }
  }
}
</script>

<style>

.addBtn {
  text-align: left;
  margin-left: 30px;
  margin-bottom: 30px;
}

.addProduct {
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



