import {request} from "../../request/index.js";
// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Queryparams: {
      query:"",
      cid:"",
      pagenum:1,
      pagesize:10
    },

    goodList:[]
  },

  totalPage:1,

  // 获取商品列表
  getGoodList() {
    request({url:'/goods/search', data:this.data.Queryparams})
    .then(result => {
      // 获取数据总条数
      const total = result.data.message.total;
      // 计算总页数
      this.totalPage = Math.ceil(total / this.data.Queryparams.pagesize);
      this.setData({
        // 拼接数组
        goodList:[...this.data.goodList,...result.data.message.goods]
      })
    })

    wx.stopPullDownRefresh()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.Queryparams.cid = options.cid;
    this.getGoodList()
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
    this.setData({
      goodList:[]
    });
    this.data.Queryparams.pagenum = 1;
    this.getGoodList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.Queryparams.pagenum >= this.totalPage) {
      return
    }else {
      this.data.Queryparams.pagenum++;
      this.getGoodList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})