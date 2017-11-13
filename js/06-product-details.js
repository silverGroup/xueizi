/**
 * Created by Administrator on 2017/9/21.
 */
//实现商品详情页信息的加载
//1确定查询数据，左侧，图片大中小三种图，右侧信息
//获取lid传递到数据库中
(()=>{
var lid=location.search.slice(5);
const LIWIDTH=62, SIZE=parseFloat($("#mask").css("width"))
    MAX=parseFloat($("#superMask").css("width"))-SIZE;
var licount= 0,moved=0;
    var uid=sessionStorage.getItem("uid");

$.ajax({
    type:"POST",
    url:"data/04-productdetail/01-productdetails.php",
    data:{lid:lid},
    success:function(data){
        var details=data.details,family=data.family;
        console.log(details,family);
        //填充中间图案  和大盒子内图案
        $("#mImg").attr("src",details.picList[0].md);
        $("#largeDiv").css("backgroundImage","url("+details.picList[0].lg+")");
        var html="";
        //加载小图片
        for(var pic of details.picList){
            html+=`<li class="i1"><img src="${pic.sm}" data-md="${pic.md}" data-lg="${pic.lg}"></li>`;
        }
        var ulList=$("#icon_list");
        ulList.html(html);
        licount=details.picList.length;
        //设置小图标的长度
        $("#icon_list").css("width",licount*LIWIDTH);
        if(licount<=5){
            $("#preview>h1>a").addClass("disabled");
        }else{
            $("#preview>h1>a").off("click").click(function(e){
                e.preventDefault();
                var $a=$(e.target);
                if(!$a.is(".disabled")){
                    if($a.hasClass("forward")){
                        moved++;
                    }else{
                        moved--;
                    }
                }
                $("#icon_list").css("left",-moved*LIWIDTH+20);
                if(moved==0){
                    $("#preview>h1>a.backward").addClass("disabled");
                }else if(licount-moved==5){
                    $("#preview>h1>a.forward").addClass("disabled");
                }else{
                    $("#preview>h1>a").removeClass("disabled");
                }
            })
        }
        //加载页面右边，标题，承诺 规格
        $("#show-details>h1").html(details.title);
        $("#show-details>h3>a").html(details.subtitle);
        $("#show-details .stu-price>span")
            .html("¥"+details.price);
        $("#show-details .promise")
            .append(details.promise);
        var html="";
        //拼接规格，不同规格不同的电脑id,
        for(var f of family.laptopList){
            html+=
                `<a href="product_details.html?lid=${f.lid}"
                 class=${f.lid===details.lid?"active":""}>${f.spec}
                </a>`;
        }
        //加减绑定事件
        $(".account").on("click","button",function(e){
            var $e=$(e.target)
            var n=$e.siblings("input").val();
            if($e.hasClass("number-add")){
                n++;
            }else if(n>1){
                n--;
            }
            $e.siblings("input").val(n);
        });
        var count=$(".account input").val();
        //点击加入购物车，先将商品加入数据库中，再进行跳转页面 1获取用户id 商品lid count
        $(".shops").on("click",".cart",function(e){
            if(uid){
                $.ajax({
                    type:"POST",
                    url:"data/03-shopcart/addPro.php",
                    data:{uid:uid, lid:lid, count:count},
                    success:function(data){
                        if(data.code>0){
                            if(confirm("添加成功，确定跳转到购物车页面")){
                                location.href="cart.html";
                            }
                        }
                    },
                    error:function(){
                        console.log("网络故障");
                    }
                })
            }else{
                alert("请先登录");
            }
        })
        //立即购买按钮，点击，先将数值传递到数据库中添加，再跳转到订单详情页面
        $(".shops").on("click",".buy",function(e){
            if(uid){
                $.ajax({
                    type:"POST",
                    url:"data/03-shopcart/addPro.php",
                    data:{uid:uid, lid:lid, count:count},
                    success:function(data){
                        if(data.code>0){
                            if(confirm("确定立即购买吗")){
                            location.href="08-order-detail.html";
                            }
                        }
                    },
                    error:function(){
                        console.log("网络故障");
                    }
                })
            }else{
                alert("请先登录");
            }
        })
        //设置放大镜效果
        var $mask=$("#mask");
        var $largeDiv=$("#largeDiv");
        $("#superMask").hover(function(e){
            $mask.toggle();
            $largeDiv.toggle();
        }).mousemove(e=>{
            var top=e.offsetY-SIZE/2;
            var left=e.offsetX-SIZE/2;
            if(top<0){top=0;}
            else if(top>MAX){
                top=MAX;
            }
            if(left<0){left=0;}
            else if(left>MAX){
                left=MAX;
            }
            $mask.css({top,left});
            $largeDiv.css("backgroundPosition",`-${left*16/7}px -${top*16/7}px`)
        })
        //悬停在小图片上显示中图大图的切换
        $("#icon_list").children().mouseenter(function(){
            var $li=$(this);
            console.log($li);
            var src=$li.children().first().attr("src").replace("/sm/","/md/");
            $("#mImg").attr({src});
            $largeDiv.css("backgroundImage","url("+src.replace("/md/","/lg/")+")");
        })
        //为你推荐  实现来回滚动
        var speed = 20;
        var tab = document.getElementById("demo");
        var tab1 = document.getElementById("demo1");
        var tab2 = document.getElementById("demo2");
        tab2.innerHTML = tab1.innerHTML;
        console.log(tab2.offsetWidth);
        function Marquee() {
            if (tab2.offsetWidth - tab.scrollLeft <= 0){
                tab.scrollLeft -= tab1.offsetWidth
            }else {
                tab.scrollLeft++;
            }
        }
        var MyMar = setInterval(Marquee, speed);
        tab.onmouseover = function () {
            clearInterval(MyMar)
        };
        tab.onmouseout = function () {
            MyMar = setInterval(Marquee, speed)
        };
        //设置样式



        //实现点击跳转到哪个模块，则哪个模块添加样式蓝色
       $("#addCart>li:gt(0)").click(function(e){
           var $e=$(e.target);
           if(!$e.parent().is(".has")){
               $e.parent().addClass("has").siblings().removeClass("has");
           }
           $("#addCart>li:gt(0)").children().css("color","#828282");
           if($("#addCart>li:gt(0)").is(".has")){
               $e.css("color","#fff");
           }
       })

        //拼接下方规格参数
        $("#show-details>.spec>div").html(html);
        $("#param>ul").html(`
        <li><a href="#">商品名称：${details.lname}</a></li>
        <li><a href="#">系统：${details.os}</a></li>
        <li><a href="#">内存容量：${details.memory}</a></li>
        <li><a href="#">分辨率：${details.resolution}</a>
        </li>
        <li><a href="#">显卡型号：${details.video_card}</a>
        </li>
        <li><a href="#">处理器：${details.cpu}</a></li>
        <li><a href="#">显存容量${details.video_memory}</a>
        </li>
        <li><a href="#">分类：${details.category}</a></li>
        <li><a href="#">硬盘容量：${details.disk}</a></li>`
        );
        $("#product-intro").html(details.details);
    },
    error:function(){
        console.log("网络故障");
    }
})
})();