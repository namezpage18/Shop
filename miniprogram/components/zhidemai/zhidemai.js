const db = wx.cloud.database();
const getmsg = db.collection("Shop")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    msg: {
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list_type: 1,
    list_data: ["精选", "最新", "女士", "男士", "鞋履", "包袋", "美妆", "服饰", "钟表", "数码", "营养", "个护", "母婴", "家居",],
    msg:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goxiangqing(e) {
      let dat = JSON.stringify(this.data.msg[e.target.dataset.type]);
      wx.navigateTo({
        url: '../../pages/xiangqing/xiangqing?id='+dat
      })
      console.log(dat)
    },
    changes(e) {
      this.setData({
        msg:[],
        list_type: e.target.dataset.type
      })
      this.getmsg()
    },

    getmsg() {
      let that = this;
      wx.showLoading({
        title: '加载中',
      })
      getmsg.get()
      .then(res => {
        if (res) {
          wx.hideLoading()
        }
        console.log(res)
        that.setData({
          msg:res.data
        })
      })
    },
  },

  created() {
    
  },

  onPageScroll(e) { // 获取滚动条当前位置
    console.log(e)
    console.log(e.scrollTop)//获取滚动条当前位置的值
  },
  
})