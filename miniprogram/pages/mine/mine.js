Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:false,
    userheadimg:""
  },

  gocart() {
    wx.navigateTo({
      url: '../cart/cart',
    })
  },

  // 用户授权 读取用户信息
  onGotUserInfo() {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo.avatarUrl)
              wx.setStorageSync("userhead", res.userInfo.avatarUrl)
              that.getuserhead()
            }
          })
          that.getStorage()
        }
      }
    })
  },
  //获取用户的头
  getuserhead() {
    const that = this
    wx.getStorage({
      key: 'userhead',
      success: function(res) {
        that.setData({
          userheadimg:res.data
        })
      },
    })
  },
  //通过云函数获取用户的唯一id
  getStorage() {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        wx.setStorageSync("userid", res.result.openid)
        this.getStorageid()
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)

      }
    })
  },
  //读取登陆状态
  getStorageid() {
    const that = this
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        console.log(res.data)
        that.setData({
          userid:true
        })
        wx.showToast({
          title: '登陆成功！',
          icon: 'success',
          duration: 2000
        })
      },
    })
  },
  // 登陆成功修改状态渲染页面组件
  loginstate() {
    let that = this;
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        if(res.data == null) {
          
        }else {
          that.setData({
            userid:true
          })
        }
      },
    })
  },

  //退出登陆
  unlogin() {
    wx.clearStorage()
    this.setData({
      userid:false
    })
    wx.showToast({
      title: '登出成功！',
      icon: 'success',
      duration: 2000
    })
  },


  
   

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loginstate()
    console.log(this.data.userid)
    this.getuserhead()
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