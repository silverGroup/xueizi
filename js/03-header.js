/**
 * Created by WEB-UID-JAVA on 2017/9/17.
 */
//设置页面搜索框信息，输入关键词出现提示
/*jQuery方式导入*/
$("#footer").load("data/01-index/01-footer.php");
(()=>{
    $("#header").load("data/01-index/00-header.php",function(){
        /*功能1：修改头部内容，把uname放在页面上 弹窗退出*/
        var uname = sessionStorage.getItem("uname");
        var uid = sessionStorage.getItem("uid");
        if (uname) {
            $("#list").children().last().html(`<a href="uc_basic.html">用户中心</a>`);
            $("#list").children().last().prev().html(
                `欢迎${uname}<a href="javascript:;" id="exit">退出</a>`);
            $("#exit").click(function (e) {
                e.preventDefault();
                //跳出弹窗并且绑定事件
                $("#shadowDiv").css("display", "block");
                $("#alertMsg").css("display", "block");
                sessionStorage.clear();
                //为确定键绑定事件，点击了则跳转到页面
                $("#alertMsg_btn1").click(function () {
                    //清除sessionstorage
                    location.href = "../login.html";
                })
            })
        }
    /*功能2：获取搜索框:，并且提示信息*/
    var txtSearch=document.getElementById("txtSearch");
    var shelper=document.getElementById("shelper");
    window.onclick=function(e){
    if(e.target.id!="shelper"&&e.target.id!="txtSearch")
      shelper.style.display="none";
    }
    txtSearch.onfocus=
    txtSearch.onkeyup=function(e){
        var txt=this;
        var  keynum = window.event ? e.keyCode : e.which;
        if( keynum!=38 &&  keynum!=40 &&  keynum!=13){
            var kw= txt.value;
            if(kw != ""){
                shelper.style.display="block";
                $.ajax({
                    type:"GET",
                    url:"data/02-product/00-header.php",
                    data:{kw:kw},
                    success:function(data){
                        var html = "";
                        for (var t of data) {
                            html += `<li title="${t.title}">
                                    <div class="search-item">${t.title.slice(0, 45)}...</div>
                                     </li>`;
                        }
                        shelper.innerHTML = html;
                    }
                })
            }else{
                 shelper.innerHTML="未找到匹配商品";
            }
         }else{
             shelper.style.display="none";
        }
    }
    //点击下拉框中的值 实现跳转到页面products.html+kw
    $(".search-item").click(function(e){
        txtSearch.value= $(e.target).parent().attr("title");
        setTimeout(function(){
            location.href="products.html?kw="+txtSearch.value;
        },500);
    })
    //点击search按钮查找数据按钮，查找数据
    $("[data-trigger=search]").click((e)=>{
        e.preventDefault();
        if(txtSearch.value){
            location.href="products.html?kw="+txtSearch.value;
        }
    })
    /*实现键盘按上下键时进行切换*/
    txtSearch.onkeydown=function(e){
        var txt=this;
    var $shelper=$("#shelper");
     var  keynum = window.event ? e.keyCode : e.which;
    //判断值是否为空，不为则判断是否按下键盘上的上下键，按下了则添加focus类
    if($shelper.css("display")=="block" && $shelper.children().length !=0){
        // $shelper.children().first().addClass(".focus");
        if(keynum==38 ||keynum==40){
            //查找元素中是否存在带focus类的元素
            var focus=$shelper.children(".focus");
            //没有则进行给第一个元素附上focus类
            if(focus.length==0){
                $shelper.children().first().addClass("focus");
                focus=$shelper.children(".focus");
            }else{
                //否则 ，按下38上键， 按40下键进行切换focus类
                switch(keynum){
                    case 38:
                        if(focus==$shelper.children().first()){
                            focus.removeClass("focus");
                            $shelper.children().prev().addClass("focus");
                        }else{
                            focus.removeClass("focus");
                            focus.prev().addClass("focus");
                        }
                        break;
                    case 40:
                        if(focus==$shelper.children().last()){
                            focus.removeClass("focus");
                            $shelper.children().first().addClass("focus")
                        }else{
                            focus.removeClass("focus");
                            focus.next().addClass("focus");
                        }
                        break;
                }
            }
            txt.value=$shelper.children(".focus").attr("title");
        }
        else if(e.keyCode == 13){
            location="products.html?kw="+txt.value;
        }
    }
    }
    //页面滚动到一定距离时进行fixed固定定位操作
    $(window).scroll(()=>{
        if($("body").scrollTop()>=60){
            $("#header-top").addClass("fixed_nav");
        }else{
            $("#header-top").removeClass("fixed_nav");
        }
    })
    //点击购物车，如果未登录则不能进行跳转 否则跳转进购物车
    $("#cart1").click(function () {
        //var uid=sessionStorage.getItem("uid");
        if(uid){
            location.href="cart.html";
        }else{
            alert("请先登录");
        }
    })
    });
})();


