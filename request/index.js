let ajaxTimes = 0;
export const request = (params) => {
    ajaxTimes++;
    wx.showLoading({
        title: "加载中",
        mask: true,
    });
    return new Promise((resolve, rejected) => {

        const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
        wx.request({
            ...params,
            url: baseURL + params.url,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                rejected(err)
            },
            complete: () => {
                ajaxTimes--;
                if (ajaxTimes === 0) {
                    wx.hideLoading();

                }
            }
        });
    })
}