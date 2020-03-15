const db = wx.cloud.database()
const getBanner = db.collection('banner')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    bannerimg: ""
  },

  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getBanner() {
      getBanner.get({
        success: res => {
          if (res.data.length === 0) {
          }
          this.setData({
            banner: res.data
          })
        }
      })
    }
  },

  created() {
    this.getBanner()
  }
})
