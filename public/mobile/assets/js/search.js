$(function () {
    $("button").on("tap",function () { 
        var txt = $("input").val();
        if(!$.trim(txt)) {
            return;
        }
        var ls = localStorage;
        var arr = (ls.getItem("history")&&JSON.parse(ls.getItem("history")))||[];
        for (var i = 0; i < arr.length; i++) {
            var element = arr[i];
            if(element==txt) {
                arr.splice(i,1)
            }
        }
        arr.unshift(txt);
        ls.setItem("history", JSON.stringify(arr));
     })

     $(".lt_his_up a").on("tap",function () {
         localStorage.clear();
     })

    $(".lt_his_ul").on("tap","span",function (e) { 
        var index = $(e.target).data('index');
        var ls = localStorage;
        var arr = (ls.getItem("history") && JSON.parse(ls.getItem("history"))) || [];
        arr.splice(index,1);
        var html = "";
        for (var i = 0; i < arr.length; i++) {
            var element = arr[i];
            html += "<li>" + element + '<span class="mui-icon mui-icon-closeempty" data-index=' + i + '></span></li>';
        }
        $(".lt_his_ul").html(html);
        ls.setItem("history",JSON.stringify(arr));
     })

    getUl();
    function getUl() { 
        var ls = localStorage;
        var arr = (ls.getItem("history") && JSON.parse(ls.getItem("history"))) || [];
        var html = "";
        for (var i = 0; i < arr.length; i++) {
            var element = arr[i];
            html += "<li>" + element + '<span class="mui-icon mui-icon-closeempty" data-index='+ i +'></span></li>';
        }
        $(".lt_his_ul").html(html);

        if(arr.length >0 ) {
            $(".lt_not_his").hide();
        }else {
            $(".lt_on_his").hide();
        }
    }
})