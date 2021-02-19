const wxRequest = require('../../../utils/request')
const funct = require('../../../utils/function')
Page({
    data: {
        // 收支标签
        tags: [],
        tagVal: '收支标签',
        tagIndex: 0,
        //当前选中数组的下标值
        customIndex: [0, 0, 0],
        //当前选中数组
        onlyArray: [
            [],
            [],
            []
        ],
        //customArray假设为我们从后台获取到的json数据
        customArray: [],
        currentDate: '2020-09-12',
        billId: 0,
        title: '账单创建',
    },
    onLoad: function (options) {
        let that = this
        this.getBillTag(1)
        this.getBillCategory(1)
        if (options.hasOwnProperty("billId")) {// 修改操作
            let billId = options.billId;
            wxRequest.getRequest('v1/bill/detail', { id: billId }, function (data) {
                // 处理收支类型和收支账户bill_category_uuid,bill_tag_uuid
                that.setData({
                    billInfo: data,
                    billId: billId,
                    currentDate: data.transaction_date,
                })
                that.getBillTag(2, data.bill_tag_uuid)
                that.getBillCategory(2, data.bill_category_uuid, data.type)
            });
        }

        wx.setNavigationBarTitle({
            title: options.hasOwnProperty("billId") ? '账单修改' : this.data.title,
        })
    },

    /**
     * 获取账单账户
     * @param {*} scene 2修改|1创建
     */
    getBillTag(scene = 1, billTagId = 0) {
        let that = this
        if (scene == 1) {
            wxRequest.getRequest('v1/bill/tag/list', {}, function (data) {
                that.setData({
                    tags: data.item,
                    tagObject: data.list
                })
            });
        } else {
            wxRequest.getRequest('v1/bill/tag/list', {}, function (data) {
                let tagIndex = 0
                for (let i = 0; i < data.list.length; i++) {
                    if (billTagId == data.list[i].id) {
                        tagIndex = i;
                        break;
                    }
                }
                that.setData({
                    tags: data.item,
                    tagObject: data.list,
                    tagIndex: tagIndex,
                })
            });
        }
    },

    /**
     * 获取账单类型
     * @param {*} scene 2修改|1创建
     */
    getBillCategory(scene = 1, billCategoryId, type) {
        let that = this
        if (scene == 1) {
            wxRequest.getRequest('v1/bill/category/list', {}, function (callData) {
                that.setData({
                    customArray: callData,
                    category: callData,
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
                console.log(data.onlyArray)
                that.setData(data);
            })
        } else {
            wxRequest.getRequest('v1/bill/category/list', {}, function (callData) {
                that.setData({
                    customArray: [],
                    category: [],
                })
                that.setData({
                    customArray: callData,
                    category: callData,
                })
                let customIndex = [type == 1 ? 1 : 0, 0, 0];
                let forearchData = [];
                if (type == 1) {// 循环收入类型
                    forearchData = callData[1]
                } else if (type == 2) {// 循环支出类型
                    forearchData = callData[0]
                }
                let loop = true;// true继续循环|false结束循环
                for (let index = 0; index < forearchData.dept.length; index++) {
                    if (loop) {
                        for (let k = 0; k < forearchData.dept[index].product.length; k++) {
                            if (billCategoryId == forearchData.dept[index].product[k].uuid) {
                                console.log(index, k, forearchData.dept[index].product[k], k, billCategoryId)
                                loop = false;
                                customIndex[1] = index
                                customIndex[2] = k
                                break;
                            }
                        }
                    }
                }
                console.log(customIndex)
                var data = {
                    customArray: callData,
                    customIndex: customIndex,
                    onlyArray: that.data.onlyArray,
                };
                // for (var i = 0; i < data.customArray.length; i++) {
                //     data.onlyArray[0].push(data.customArray[i].name);
                // }
                // for (var j = 0; j < data.customArray[data.customIndex[0]].dept.length; j++) {
                //     data.onlyArray[1].push(data.customArray[data.customIndex[0]].dept[j].name);
                // }
                // for (var k = 0; k < data.customArray[data.customIndex[0]].dept[data.customIndex[1]].product.length; k++) {
                //     data.onlyArray[2].push(data.customArray[data.customIndex[0]].dept[data.customIndex[1]].product[k].name);
                // }
                data.onlyArray[1] = []
                let secondData = callData[customIndex[0]].dept
                for (var j = 0; j < secondData.length; j++) {
                    data.onlyArray[1].push(secondData[j].name);
                }
                data.onlyArray[2] = []
                let thirdData = callData[customIndex[0]].dept[customIndex[1]].product
                for (var k = 0; k < thirdData.length; k++) {
                    data.onlyArray[2].push(thirdData[k].name);
                }
                console.log(data.onlyArray)
                that.setData(data);
            })
        }
    },
    onShow() {
        let dateArray = funct.getYearMoneyDate()
        this.setData({
            currentDate: dateArray['full']
        })
    },
    //多列自定义选择器改变value的方法
    bindCustomPickerChange: function (e) {
        var customArray = this.data.customArray,
            customIndex = this.data.customIndex,
            onlyArray = this.data.onlyArray;
        //此处e.detail.value为当前选择的列的下标值数组，如[0,1,0]
        console.log('picker最终选择值为：', onlyArray[0][customIndex[0]], onlyArray[1][customIndex[1]], onlyArray[2][customIndex[2]]);
        this.setData({
            customIndex: e.detail.value
        })
    },
    //多列自创选择器换列方法
    bindCustomPickerColumnChange: function (e) {
        var customArray = this.data.customArray,
            customIndex = this.data.customIndex,
            onlyArray = this.data.onlyArray;
        customIndex[e.detail.column] = e.detail.value;

        var searchColumn = () => {
            for (var i = 0; i < customArray.length; i++) {
                var arr1 = [];
                var arr2 = [];
                if (i == customIndex[0]) {
                    for (var j = 0; j < customArray[i].dept.length; j++) {
                        arr1.push(customArray[i].dept[j].name);
                        if (j == customIndex[1]) {
                            for (var k = 0; k < customArray[i].dept[j].product.length; k++) {
                                arr2.push(customArray[i].dept[j].product[k].name);
                            }
                            onlyArray[2] = arr2;
                        }
                    }
                    onlyArray[1] = arr1;
                }
            }
        }
        switch (e.detail.column) {
            case 0:
                customIndex[1] = 0;
                customIndex[2] = 0;
                searchColumn();
                break;
            case 1:
                customIndex[2] = 0;
                searchColumn();
                break;
        }
        this.setData({
            onlyArray: onlyArray,
            customIndex: customIndex
        });
    },
    selectDate: function (e) {
        this.setData({
            currentDate: e.detail.value
        })
    },
    formSubmit(e) {
        let that = this
        let customIndex = this.data.customIndex;
        let firstIndex = customIndex[0], secondIndex = customIndex[1], thirdIndex = customIndex[2];
        let formData = {
            firstTypeId: this.data.customArray[firstIndex].id,
            secondTypeId: this.data.customArray[firstIndex].dept[secondIndex].uuid,
            thirdTypeId: this.data.customArray[firstIndex].dept[secondIndex].product[thirdIndex].uuid,
            money: e.detail.value.money,
            remark: e.detail.value.remark,
            currentDate: this.data.currentDate,
            tagId: this.data.tagObject[this.data.tagIndex].id,
            billId: this.data.billId,
        };
        if (formData.secondTypeId == 0 || formData.thirdTypeId == 0) {
            wx.showToast({
                title: '支出类型不能为空',
                icon: 'none'
            })
            return;
        }
        if (!formData.tagId) {
            wx.showToast({
                title: '支出账户不能为空',
                icon: 'none'
            })
        }
        if (!/(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{1,2}$)/.test(formData.money)) {
            wx.showToast({
                title: '收支金额格式不合法',
                icon: 'none'
            })
            return;
        }
        funct.showLoadding(2000, '账单提交中')
        wxRequest.postRequest('v1/bill/create', formData, function (result) {
            if (result.code == 1000 && that.data.billId == 0) {
                wx.showToast({ title: '账单提交成功', icon: 'none' })
                wx.reLaunch({ url: '/pages/bill/list/list' })
            } else if (result.code == 1000 && that.data.billId != 0) {
                wx.showToast({ title: '账单提交成功', icon: 'none' })
                wx.reLaunch({ url: '/pages/bill/detail/detail?id='+that.data.billId })
            } else {
                wx.showToast({ title: '账单提交失败', icon: 'none' })
            }
        });
    },
    selectTag(e) {
        let index = e.detail.value;
        console.log(e.detail.value);
        this.setData({
            tagIndex: index,
        })
    },
})