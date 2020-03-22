const db = wx.cloud.database();
const addshop = db.collection('User');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:[],
    message:[],
    thismsg:[],
    upck:""
  },

  jian(e) {
    const that = this;
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        console.log(e.target.dataset.type)
        addshop.doc(e.target.dataset.type).remove({
          success(res) {
            console.log(res)
            that.getUserShop()
          }
        })
      },
    })
    console.log(e)
  },

  jia(e) {
    const that = this
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        addshop.add({
          data: {
            user: res.data,
            msg: e.target.dataset.type
          }
        }).then(res => {
          console.log(res)
          that.getUserShop()
        })
      },
    })
    console.log(e)
    
  },

  getUserShop() {
    const that = this;
    let arr1 = [];
    let arr2 = [];
    let arr3 = [];
    let arr4 = [];
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        addshop.where({
          _openid: res.data
        }).get().then(res => {
          console.log(res)
          for(let i=0;i<res.data.length;i++){
            if (arr2.indexOf(res.data[i].msg._id) < 0) {
              arr1.push(1);
              arr2.push(res.data[i].msg._id);
              arr3.push(res.data[i].msg);
              arr4.push(res.data[i])
            }else {
              arr1[arr2.indexOf(res.data[i].msg._id)] = arr1[arr2.indexOf(res.data[i].msg._id)] + 1
              console.log(arr2.indexOf(res.data[i].msg._id))
            }
          }
          that.setData({
            num:arr1,
            message:arr4,
            thismsg:arr3,
            upck:"购物车中暂无商品"
          })
          console.log(that.data.message)
          console.log(that.data.thismsg)

        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getUserShop()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})