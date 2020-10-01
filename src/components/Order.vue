<template>
  <div>
    <div class="addBtn">

    </div>
    <el-table
        :data="OrderList"
        style="width: 90%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="订单ID">
              <span>{{ props.row.orderId }}</span>
            </el-form-item>
            <el-form-item label="用户名称">
              <span>{{ props.row.nickName }}</span>
            </el-form-item>
            <el-form-item label="手机号">
              <span>{{ props.row.mobile }}</span>
            </el-form-item>
            <el-form-item label="商品总价">
              <span>{{ props.row.totalPrice }}</span>
            </el-form-item>
            <el-form-item label="支付状态">
              <span>{{ props.row.payStatus == 0 ? "未支付":"已支付" }}</span>
            </el-form-item>
            <el-form-item label="支付类型">
              <span>{{ props.row.payType == 0 ? "银行卡" : props.row.payType== 1 ? "微信":"支付宝"}}</span>
            </el-form-item>
            <el-form-item label="支付时间">
              <span>{{ props.row.payTime }}</span>
            </el-form-item>
            <el-form-item label="销售状态">
              <span>{{ props.row.orderStatus==0?"销售中":"停止销售" }}</span>
            </el-form-item>
            <el-form-item label="扩展信息">
              <span>{{ props.row.extraInfo }}</span>
            </el-form-item>
            <el-form-item label="收货地址">
              <span>{{ props.row.userAddress }}</span>
            </el-form-item>
            <el-form-item label="是否删除">
              <span>{{ props.row.isDeleted == 1 ? "已删除" : "未删除" }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
          label="订单ID"
          prop="orderId">
      </el-table-column>
      <el-table-column
          label="订单总价"
          prop="totalPrice">
      </el-table-column>
      <el-table-column
          label="支付时间"
          prop="payTime">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEditOrder(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDeleteOrder(scope.$index, scope.row)">{{ scope.row.isDeleted ? "复活" : "删除" }}
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
        title="新增用户"
        :visible.sync="dialogOrderVisible"
        width="30%">
      <div class="addUser">
        <span v-show="unShow">{{ this.OrderInfo.orderId }}</span>
        <el-form ref="form" :model="order_form" label-width="80px">
          <el-form-item label="用户昵称">
            <el-input v-model="order_form.nickName"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="order_form.mobile"></el-input>
          </el-form-item>
          <el-form-item label="订单总价">
            <el-input v-model="order_form.totalPrice"></el-input>
          </el-form-item>
          <el-form-item label="支付状态">
            <el-radio v-model="order_form.payStatus" @change="PayStatusChange" label="0">未支付</el-radio>
            <el-radio v-model="order_form.payStatus" @change="PayStatusChange" label="1">已支付</el-radio>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-radio v-model="order_form.orderStatus" @change="OrderStatusChange" label="0">未完成</el-radio>
            <el-radio v-model="order_form.orderStatus" @change="OrderStatusChange" label="1">已完成</el-radio>
          </el-form-item>
          <el-form-item label="收货地址">
            <el-input v-model="order_form.userAddress"></el-input>
          </el-form-item>
          <el-form-item label="留言">
            <el-input v-model="order_form.extraInfo"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="CancelHandler">取 消</el-button>
    <el-button type="primary" @click="SubmitOrderHandler">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "order",
  computed: {
    OrderInfo () {
      let orderInfo = this.$store.getters.order_info
      this.order_form.nickName = orderInfo.nickName
      this.order_form.mobile = orderInfo.mobile
      this.order_form.totalPrice = orderInfo.totalPrice
      this.order_form.payStatus = orderInfo.payStatus+''
      this.order_form.orderStatus = orderInfo.orderStatus+''
      this.order_form.extraInfo = orderInfo.extraInfo
      this.order_form.userAddress = orderInfo.userAddress

      return orderInfo
    },
    OrderList () {
      return this.$store.state.order_list
    },
    Limit () {
      return this.$store.state.limit
    },
    CurrentPage: {
      get () {
        return this.$store.state.order_current_page
      },
      set (val) {
        this.$store.dispatch("Change_Order_Current_Page", val)
      }
    },
    TotalPage () {
      return this.$store.state.order_total_page
    }
  },
  mounted () {
    this.GetOrderList()
  },
  methods: {
    NextClick: function (page) {
      console.log(page)
    },
    PrevClick: function (page) {
      console.log(page)
    },
    PayStatusChange(val){
      this.selectedPayStatus = val
    },
    OrderStatusChange(val){
      this.selectedOrderStatus = val
    },
    CurrentChange: function (page) {
      this.CurrentPage = page
      this.GetOrderList()
    },
    CancelHandler: function () {
      console.log("取消弹窗。。。")
      this.dialogOrderVisible = false
    },
    SubmitOrderHandler: function () {
      this.dialogOrderVisible = false
      if (this.is_order_edit) {
        this.handleUpdateOrder()
      } else {
        this.handleAddOrder()
      }
      this.handleClearOrderData()
    },
    handleAddOrder: function () {
      let order = this.GetOrderFormParam()
      this.$store.dispatch("Add_order", order)
      this.GetOrderList()
    },
    GetOrderList: function () {
      this.$store.dispatch("Get_Order_List", {
        "page_size": this.Limit === undefined ? 5 : this.Limit,
        "current_page": this.CurrentPage === undefined ? 1 : this.CurrentPage
      })
    },
    handleUpdateOrder () {
      let payload = this.GetOrderFormParam()
      console.log("order Update....")
      console.log(payload)
      this.$store.dispatch("Edit_Order", payload)
    },
    handleEditOrder (index, row) {
      let orderId = row["orderId"]
      this.order_id = orderId
      this.$store.dispatch("Get_Order_Info", orderId)
      this.dialogOrderVisible = true
      this.is_order_edit = true
    },
    handleDeleteOrder (index, row) {
      let orderId = row["orderId"]
      this.$store.dispatch("Delete_Order", orderId)
    },
    GetOrderFormParam () {
      return {
        "OrderId":this.order_id,
        "NickName": this.order_form.nickName,
        "Mobile": this.order_form.mobile,
        "TotalPrice": this.order_form.totalPrice,
        "PayStatus": parseInt(this.order_form.payStatus),
        "PayTime": this.order_form.payTime,
        "OrderStatus": parseInt(this.order_form.orderStatus),
        "ExtraInfo": this.order_form.extraInfo,
        "UserAddress": this.order_form.userAddress
      }
    },
    handleClearOrderData () {
      this.order_form.nickName = "",
      this.order_form.mobile = "",
      this.order_form.totalPrice = 0,
      this.order_form.payStatus = 0,
      this.order_form.orderStatus = "",
      this.order_form.extraInfo = "",
      this.order_form.userAddress = "",
      this.order_id = "",
      this.is_order_edit = false
    }
  },
  data () {
    return {
      dialogOrderVisible: false,
      selectedPayStatus:0,
      selectedOrderStatus:0,
      orderFormParam: {},
      unShow: false,
      is_order_edit: false,
      order_id: '',
      order_form: {
        nickName: "",
        mobile: "",
        totalPrice:0,
        payStatus:0,
        orderStatus:0,
        extraInfo:"",
        userAddress:""
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

.addorder {
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


