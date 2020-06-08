import {request} from "../../request/index.js"

// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id:"",
    goodsObj:{}
  },

  Cart1:{},
  addCart() {
    // 获取缓存中的购物车数据
    let Cart = wx.getStorageSync("cart")||[];
    // 判断商品对象是否存在于购物车数组中
    let index = Cart.findIndex(v => v.goods_id === this.Cart1.goods_id);
    if (index == -1) {
      // 如果不存在则添加
      this.Cart1.num = 1;
      this.Cart1.checked = true;
      Cart.push(this.Cart1);
    }else {
      // 存在则数量加1
      Cart[index].num++;
    }
    wx.setStorageSync("cart", Cart);
    wx.showToast({
      title: '加入成功',
      mask: true,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },


  // 点击图片预览
  previewImage(e) {
    console.log(e);
    // 构造图片数组
    const urls = this.data.goodsObj.pics.map(v => v.pics_mid);
    // 接受绑定的图片url
    const url = e.currentTarget.dataset.url;
    wx.previewImage({
      current: url,
      urls: urls,
    });
  },


  // 获取商品详情数据
  getgoodDeatil(goods_id) {
    request({url:'/goods/detail',data:{goods_id}})
    .then(result => {
      this.Cart1 = result.data.message;
      this.setData({
        goodsObj: {
          goods_id:result.data.message.goods_id,
          goods_name:result.data.message.goods_name,
          goods_price:result.data.message.goods_price,
          // iphone部分手机不识别 webp格式图片
          goods_introduce:result.data.message.goods_introduce.replace(/\.webp/g, '.jpg'),
          pics:result.data.message.pics
        }
      })
    })
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   goods_id:options.goods_id
    // }),

    this.getgoodDeatil(options.goods_id)
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