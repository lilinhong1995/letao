$(function () {
    //根据提供的搜索产品的接口数据来 创建参数对象
    var queryObj = {
        proName = $.getQueryString("key"),
        brandId = "",
        price = "",
        num = "",
        page = 1,
        pagesize = 4
    }

    //总页数
    var dataPage = 1;
    
    //下拉与上拉
    init();

    function init() {
        mui.init({
            pullRefresh: {
                container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                down: {
                    height: 50, //可选,默认50.触发下拉刷新拖动距离,
                    auto: true, //可选,默认false.首次加载自动下拉刷新一次
                    contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    callback: function () {
                        queryObj.page = 1;//重置为第一页
                        //发送请求
                        getProduct(function (res) {
                            var html = template("goodsTpl", res);
                            $(".lt_goods_ul").html(html);
                        })

                    }
                },
                up: {
                    height: 50, //可选,默认50.触发下拉刷新拖动距离,
                    auto: true, //可选,默认false.首次加载自动下拉刷新一次
                    contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                    //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    callback: function () {

                    }

                }
            }
        });
    }
    //通过搜索产品的端口数据来创建 发送请求 的封装
    function getProduct(callback) { 
        $.get("/product/queryProduct", queryObj,function (res) { 
            callback && callback(res);
            dataPage = Math.ceil(res.count / queryObj.pagesize)
         })
    }


})