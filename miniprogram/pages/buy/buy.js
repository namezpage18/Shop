const db = wx.cloud.database();
const getmsg = db.collection("Shop");
const addshop = db.collection('User')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: [],
    loading: true,
    list_type: 1,
    list_data: ["精选", "最新", "女士", "男士", "鞋履", "包袋", "美妆", "服饰", "钟表", "数码", "营养", "个护", "母婴", "家居",]
  },

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
        if(res) {
          wx.hideLoading()
        }
      this.setData({
        msg:this.data.msg.concat(res.data)
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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

  },
})