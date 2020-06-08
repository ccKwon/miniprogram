import { request } from "../../request/index.js";
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧菜单数据
    rightMenuList: [],
    currentIndex: 0,
    scrollTop:0
  },

  Cates: [],


  // 发送请求获取分类数据
  getCates() {
    request({ url: '/categories' })
      .then(result => {
        this.Cates = result.data.message;
        // 把数据存入本地存储中
        wx.setStorageSync("cates", { data: this.Cates });
        // 构造左侧的大菜单数据
        let leftMenuList = this.Cates.map(v => v.cat_name);
        // 构造右侧的商品数据
        let rightMenuList = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightMenuList
        })
      })


  },

  // 切换选项卡功能
  switchtab(e) {
    const { index } = e.currentTarget.dataset;
    let rightMenuList = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightMenuList,
      scrollTop:0
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取本地缓存
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      this.getCates()
    } else {
      this.Cates = Cates.data;
      // 构造左侧的大菜单数据
      let leftMenuList = this.Cates.map(v => v.cat_name);
      // 构造右侧的商品数据
      let rightMenuList = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightMenuList,
      })
    }
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