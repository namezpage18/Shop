const db = wx.cloud.database();
const addshop = db.collection('User')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:[],
    shoucang:true
  },
  //跳转至购物车
  cart() {
    

    wx.getStorage({
      key: 'userid',
      success: function(res) {
        wx.navigateTo({
          url: '../cart/cart',
        })
      },
      fail: function() {
        wx.switchTab({
          url: '../mine/mine',
        })
        wx.showToast({
          title: '请先登陆',
          duration: 2000
        })
      }
    })
  },
  //点击收藏
  shoucang() {
    const that = this;
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        that.setData({
          shoucang: !that.data.shoucang
        })
        if (that.data.shoucang === true) {
          wx.showToast({
            title: '取消成功',
          })
        } else {
          wx.showToast({
            title: '收藏成功',
          })
        }
      },
      fail: function () {
        wx.switchTab({
          url: '../mine/mine',
        })
        wx.showToast({
          title: '请先登陆',
          duration: 2000
        })
      }
    })

    
  },
  //插入一条购物车信息
  addcart() {
    const that = this;
    //获取用户id
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        addshop.add({
          data: {
            user: res.data,
            msg: that.data.id
          }
        }).then(res => {
          //弹出添加成功的信息
          wx.showToast({
            title: '成功添加',
            icon: 'success',
            duration: 2000
          })
        })
      },

      fail:function () {
        wx.switchTab({
          url: '../mine/mine',
        })
        wx.showToast({
          title: '请先登陆',
          duration: 2000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:JSON.parse(options.id)
    })
    console.log(JSON.parse(options.id))
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})