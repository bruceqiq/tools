const wxRequest = require('../../../utils/request')
const funct = require('../../../utils/function')
Page({
    data: {
        page: 0,
        size: 15,
        list: [],
        start_date: '2020-09-12',
        end_date: '2020-09-12',
        tagIndex: 0,
        selectTagIndex: -1,
        customIndex: [0, 0, 0],
        onlyArray: [
            [],
            [],
            []
        ],
        tagObject: {},
        customArray: [],
    },

    /**
     * @param {*} scene 1页面下拉刷新|2页面上拉刷新
     * @param {*} searchWhere 
     */
    getBill: function (scene = 1, tagIndex = -1) {
        let that = this;
        let searchWhere = {
            start_date: this.data.start_date,
            end_date: this.data.end_date,
            tag_id: (tagIndex == -1 && this.data.selectTagIndex == -1) ? 0 : this.data.tagObject[tagIndex].id,
        }
        let searchWhereObject = Object.assign(searchWhere, { page: this.data.page + 1, size: this.data.size })
        wxRequest.getRequest('v1/bill/list', searchWhereObject, function (data) {
            let list = that.data.list;
            if (scene == 1) {
                data.items.push(...list)
                list = data.items;
            } else {
                list.push(...data.items)
            }
            that.setData({
                list: list,
                page: data.page,
                size: data.size,
                income: data.income_money,
                expend: data.expend_money,
            })
        });
    },

    billCreate: function () {
        wx.navigateTo({
            url: '/pages/bill/bill/bill',
        })
    },

    selectEndDate: function (e) {
        this.setData({
            list: [],
            page: 0,
            size: 15,
            end_date: e.detail.value
        })
        this.getBill()
    },

    selectStartDate: function (e) {
        this.setData({
            list: [],
            page: 0,
            size: 15,
            start_date: e.detail.value
        })
        this.getBill()
    },

    selectTag(e) {
        let index = e.detail.value;
        this.setData({
            list: [],
            page: 0,
            size: 15,
            tagIndex: index,
            selectTagIndex: index
        })
        this.getBill(1, index)
    },

    billType: function () {
        let that = this;
        wxRequest.getRequest('v1/bill/tag/list', {}, function (data) {
            data.item.unshift("全部账户")
            data.list.unshift({"id":0, "name":"全部账户"})
            that.setData({
                tags: data.item,
                tagObject: data.list
            })
        });
        wxRequest.getRequest('v1/bill/category/list', {}, function (callData) {
            that.setData({
                customArray: callData
            })
            var data = {
                customArray: callData,
                customIndex: that.data.customIndex,
                onlyArray: that.data.onlyArray,
            };
            for (var i = 0; i < data.customArray.length; i++) {
                data.onlyArray[0].push(data.customArray[i].name);
            }
            for (var j = 0; j < data.customArray[data.customIndex[0]].dept.length; j++) {
                data.onlyArray[1].push(data.customArray[data.customIndex[0]].dept[j].name);
            }
            for (var k = 0; k < data.customArray[data.customIndex[0]].dept[data.customIndex[1]].product.length; k++) {
                data.onlyArray[2].push(data.customArray[data.customIndex[0]].dept[data.customIndex[1]].product[k].name);
            }
            that.setData(data);
        })
    },

    /**
     * @param {any} e
     */
    detail: function (e) {
        wx.navigateTo({
            url: '/pages/bill/detail/detail?id=' + e.currentTarget.dataset.id,
            fail: function () {
                wx.showToast({
                    title: '跳转失败',
                });
            },
        })
    },

    onLoad: function () {
    },

    onShow: function () {
      let date = funct.getStartEndPerMonth()
      console.log(date)
        this.setData({
          start_date: date['start'],
          end_date: date['end'],
        })
        this.getBill(2)
        this.billType();
    },

    onPullDownRefresh: function () {
        this.getBill();
    },

    onReachBottom: function () {
        this.getBill(2);
    },

    onShareAppMessage: function () {

    }
})