import {request} from "../../request/index.js"
//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList:[],
    // 分类数组
    catesList:[],
    floorList:[]
  },


  getswiperList() {
    request({url: '/home/swiperdata'})
    .then(result => {
      this.setData({
        swiperList: result.data.message
      })
    })
  },


  getcateList() {
    request({url: '/home/catitems'})
    .then(result => {
      this.setData({
        catesList:result.data.message
      })
    })
  },

  getfloorList() {
    request({url: '/home/floordata'})
    .then(result => {
      this.setData({
        floorList:result.data.message
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getswiperList(),
    this.getcateList(),
    this.getfloorList()
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
