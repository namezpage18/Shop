const db = wx.cloud.database()
const Shop = db.collection("Shop")
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    shoplist:[]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getShop() {
      Shop.get()
      .then(res => {
        this.setData({
          shoplist:res.data
        })
        console.log(this.data.shoplist)
      })
    }
  },

  created() {
    this.getShop()
    console.log(1)
  }

})
