/**
 * Created by WEB-UID-JAVA on 2017/9/18.
 */
/*功能 根据关键词获取数据库中符合条件的商品信息 */
//获取路径中的kw
//发送请求，返回数据到前端
(()=>{
    function loadProduct(pno){
        var kw=decodeURI(location.search).slice(4);
        var details="product_details.html?lid=";
        $.ajax({
            type:"POST",
            url:"data/02-product/01-products.php",
            data:{kw:kw,pno:pno},
            success:function(data){
                // console.log(data);
                var html="";
                for(var p of data.data){
                html+=`<li id="${p.lid}">
                <a href="${details+p.lid}">
                  <img src="${p.pic}" alt="">
                </a>
                <p>
                  <span class="price">&yen;${p.price}</span>
                  <a href="${details+p.lid}">${p.title}</a>
                </p>
                <div>
                  <span class="reduce">-</span>
                  <input type="text" value="1">
                  <span class="add">+</span>
                  <a href="javascript:;" class="addCart">加入购物车</a>
                </div>
                </li>`;
                }
                $("#show-list").html(html);
                //拼接下一页
                var html="";
                html+=`<a href="javascript:;" class="previous">上一页</a>`;
                for(var i=1;i<=data.pageCount;i++){
                    html+=`<a href="javascript:;">${i}</a>`
                }
                html+=`<a href="javascript:;" class="next">下一页</a>`;
                $("#pages").html(html).children(":eq("+pno+")").addClass("current");
                if(pno==1){
                    $("#pages").children().first().addClass("disabled")
                }
                if(pno==data.pageCount){
                    $("#pages").children().last().addClass("disabled")
                }
                if(pno!=1 && pno!=data.pageCount){
                    $("#pages").children().removeClass("disabled");
                }
            },
            error:function(){
               console.log("网络故障");
            }
        });
    }
    loadProduct(1);
    //添加点击事件 上下页的操作
    $("#pages").on("click","a:not(.disabled):not(.current)",function(e) {
    var a = $(e.target);
    var n = parseInt($("#pages>a.current").html());
    // console.log(n);
    if (a.is(":first-child")) {
        loadProduct(n - 1);
    }else if (a.is(":last-child")){
        loadProduct(n + 1);
    }else{
        loadProduct(a.html());
    }
    });
    var uid=sessionStorage.getItem("uid");
    loadCart();
    //添加事件，绑定添加购物车和添加数量操作
    $("#show-list").on("click"," .reduce ,.add ",(e)=>{
        var $e=$(e.target),
            $input=$e.siblings("input");
        var n=parseInt($input.val());
        if($e.hasClass("add")){
            n++;
        }else if(n>1){
            n--;
        }
        $input.val(n);
    }).on("click",".addCart",function(e){
        /*绑定事件 为添加进入购物车添加绑定事件*/
        var $e=$(e.target);
        if(uid){
            $.ajax({
                type:"POST",
                url:"data/03-shopcart/addPro.php",
                data:{uid:uid, lid:$e.parent().parent().attr("id"), count:$e.prev().prev().val()},
                success:function(data){
                    // console.log(data);
                    if(data.code>0){
                        loadCart();
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
//修改购物车内容操作
    function loadCart(){
            //根据用户id查询数据库中cart中该用户的商品信息，返回并且拼接到前端数据上
        $.get("data/03-shopcart/listPro.php",{uid:sessionStorage.getItem("uid")}).then((data)=>{
        // console.log(data);
            //拼接到页面上
            var html="";
            for(var item of data){
             html+=`
              <div id="${item.iid}">
                  <span>${item.title}</span>
                  <div>
                    <span class="reduce">-</span>
                    <input type="text" value="${item.count}"/>
                    <span class="add">+</span>
                  </div>
                  <span class="price">¥${(item.price*item.count).toFixed(2)}</span>
                </div>`;
            }
            $("#cart .cart_content").html(html);
            //计算总价：total
            var total=0;
            var subs=$("#cart>.cart_content>div>span:last-child");
            subs.each((i,elem)=>{
                total+=parseFloat($(elem).html().slice(1));
            });
            $("#total").html(total.toFixed(2));
        })
    }
    //为小购物车绑定事件，实现加减和去结算时跳转到订单详情页面
    $("#cart>.cart_content").on("click",".reduce,.add",function(e){
    var $e=$(e.target);
    var n=parseInt($e.siblings("input").val());
    if($e.html()=="+"){
        n++;
    }else{
        n--;
    }
    var iid=$e.parent().parent().attr("id");
    //当前数量大于0则进行更新操作，实现数据库信息同时更新操作
    if(n>0){
        $.post("data/03-shopcart/updatePro.php",{
            iid,count:n
        });
    }else{
        $.get("data/03-shopcart/deletePro.php",{iid});
    }
    loadCart();
})
    /*功能  实现点击清空，清除该购物出内容*/
    $("#cart>.cart-title").on("click","a.clearcart",function(e){
         e.preventDefault();
        $.ajax({
            type:"POST",
            url:"data/03-shopcart/deletePro.php",
            data:{uid:sessionStorage.getItem("uid")},
            success:function(data){
                // console.log(data);
                if(data.code>0){
                    location.reload();
                }
            },
            error:function(){
                console.log("网络故障");
            }
        })
    })
/*为小型购物车去结算添加*/
    $(".goCart").click((e)=>{
        e.preventDefault();
        location.href="cart.html";
    })
})();



