const db = wx.cloud.database()
const getBanner = db.collection("Shop")
const getmsg = db.collection("Shop");
Page({

  /**
   * 页面的初始数据
   */

  data: {
    homemsg:[],
    shop:[],
    list_type: 1,
    list_data: ["精选", "最新", "女士", "男士", "鞋履", "包袋", "美妆", "服饰", "钟表", "数码", "营养", "个护", "母婴", "家居",]
    
  },

  goxiangqing(e) {
    let dat = JSON.stringify(this.data.shop[e.target.dataset.type])
    wx.navigateTo({    
      url: '../xiangqing/xiangqing?id='+dat
    })
  },

  getBanner() {
    getBanner.get({
      success: res => {
        this.setData({
          shop: res.data
        })
        console.log(this.data.shop)
      }
    })
  },

  // 底部js

  changes(e) {
    this.setData({
      msg: [],
      list_type: e.target.dataset.type
    })
    this.getmsgs()
  },

  getmsgs() {
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
          msg: res.data
        })
      })
  },

  getmsg() {
    wx.showLoading({
      title: '加载中',
    })
    getmsg.get()
      .then(res => {
        if (res) {
          wx.hideLoading()
        }
        this.setData({
          homemsg: this.data.homemsg.concat(res.data)
        })
        console.log(this.data.homemsg)
      })
  },





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getBanner()
    this.getmsg()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getmsg()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})