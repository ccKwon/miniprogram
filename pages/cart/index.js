// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    // 记录全选
    allchecked: false,
    totalPrice: 0,
    totalNum: 0
  },


  // 获取地址
  getAddress() {
    // 获取权限状态
    wx.getSetting({
      success: (result) => {
        // 获取用户授权
        const scopeAddress = result.authSetting["scope.address"];
        // 判断用户是否授权获取地址权限
        if (scopeAddress === false) {
          // 没授权 则打开授权页面
          wx.openSetting({
            success: (result1) => {
              console.log(result1);
            },
          });
        }
      },
    });
    wx.chooseAddress({
      success: (result2) => {
        const address = result2;
        wx.setStorageSync("address", address);
        
      },
    });


  },


  // 改变商品中的checked属性
  changeChecked(e) {
    // 获取点击商品的id
    const goods_id = e.currentTarget.dataset.id;
    // 结构赋值cart
    let { cart } = this.data;
    // 找到与购物车数组中相同id的商品下标
    let index = cart.findIndex(v => v.goods_id === goods_id);
    // 改变商品checked
    cart[index].checked = !cart[index].checked;
    this.setCart(cart);
  },


  setCart(cart) {
    // 判断并设置全选的取值
    const allchecked = cart.length ? cart.every(v => v.checked) : false;
    let totalPrice = 0;
    let totalNum = 0;
    // 计算商品数量和总价
    cart.forEach(v => {
      // 如果商品checked属性为true
      if (v.checked) {
        totalPrice += v.goods_price * v.num;
        totalNum += v.num;
      }
    })

    this.setData({
      cart,
      allchecked,
      totalPrice,
      totalNum
    })
    // 更新缓存中的购物车数组
    wx.setStorageSync("cart", cart);

  },

  // 全选--反选
  itemAllchecked() {
    // 解构赋值获取data中的数据
    let { cart, allchecked } = this.data;
    // 修改全选属性
    allchecked = !allchecked;
    cart.forEach(v => {
      v.checked = allchecked;

    })

    this.setCart(cart);

  },

  // 数量加减事件
  ItemNumEdit(e) {
    let { cart } = this.data;
    let index = cart.findIndex(v => v.goods_id === e.currentTarget.dataset.id);
    if (cart[index].num === 1 && e.currentTarget.dataset.edit === -1) {

      wx.showModal({
        title: '提示',
        content: '您是否要删除',
        success: (result) => {
          if (result.confirm) {
            cart.splice(index, 1);
            this.setCart(cart)
          }
        },
      });
    } else {
      cart[index].num += e.currentTarget.dataset.edit;
      this.setCart(cart)
    }
  },

  pay(e) {
    const { address, totalNum } = this.data;
    if (!address.userName) {
      wx.showToast({
        title: '您还没有选择收获地址',
        mask: true,
      });
    }else if (totalNum === 0) {
      wx.showToast({
        title: '还没有选购商品',
        mask: true,
      });
    }else {
      wx.navigateTo({
        url: '/pages/pay/index',

      });
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    const address = wx.getStorageSync("address");

    const cart = wx.getStorageSync("cart") || [];

    this.setCart(cart)
    this.setData({
      address
    })
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