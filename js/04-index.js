/**
 * Created by WEB-UID-JAVA on 2017/9/17.
 */

(()=>{
  /*功能1：导入banner操作*/
    //发送ajax请求获取图片信息后再传入页面中
    var bannerImgs=$("[data-load=bannerImgs]"),
        bannerInds=$("[data-load=bannerInds]"),
        LIWIDTH=960,n=0,TRAINS=300,MINT=2000;
    $.ajax({
        type:"POST",
        url:"data/01-index/03-banners.php",
        success:function(data){
            //console.log(data);
            //反映回前端数据库
            var html="";
            data.push(data[0]);
            for(var b of data){
                html+=`
            <li>
              <a href="${b.href}">
                <img src="${b.img}">
              </a>
            </li>`;
            }
            bannerImgs.html(html).css("width",LIWIDTH*data.length);
            /*拼接小圆点 并且设置第一个小圆点为hover*/
            bannerInds.append(`<li></li>`.repeat(data.length-1))
                      .children().first().addClass("hover");
            return new Promise(resolve=>resolve);
        },
        error:function(){
            console.log("网络故障");
        }
    })
        /*设置banner区域的功能*/
     .then(()=>{
        //设置banner进行移动,先设置一次移动
        function moveOnce(){
            n++;
            bannerImgs.css("left",-n*LIWIDTH);
            //清除前一个hover 设置下一个为hover
            bannerInds.children(":eq("+(n-1)+")").removeClass("hover");
            if(n==bannerImgs.children().length-1){
                //第一个小圆点设置为hover
                bannerInds.children().last().removeClass("hover");
                bannerInds.children().first().addClass("hover");
                setTimeout(function(){
                    bannerImgs.css("transition","");
                    bannerImgs.css("left",0);
                    n=0;
                    setTimeout(function(){
                        bannerImgs.css("transition","all "+TRAINS/1000+"s linear");
                    },100);
                },TRAINS);
            }else{
                bannerInds.children(":eq("+(n)+")").addClass("hover");
            }
        }
        var timer=setInterval(moveOnce,TRAINS+MINT);
        /*鼠标移进 清除定时器 移除，添加上*/
        $("#banner").mouseover(function(){
            clearInterval(timer);
            timer=null;
        }).mouseleave(function(){
            timer=setInterval(moveOnce,TRAINS+MINT);
        })
        /*点击圆点，实现到达那一页*/
           bannerInds.children().click(function(e){
               e.preventDefault();
               var i=$(e.target).index();
               bannerInds.children(".hover").removeClass("hover");
               bannerInds.children(":eq("+(i)+")").addClass("hover");
               bannerImgs.css("left",-LIWIDTH*i);
           })
        /*点击左移 实现左滑动*/
        $("[data-move=left]").click(function(e){
            e.preventDefault();
            if(n>0){
               n--;
               bannerInds.children(".hover").removeClass("hover");
               bannerInds.children(":eq("+(n)+")").addClass("hover");
               bannerImgs.css("left",-LIWIDTH*n);
            }else{
                bannerImgs.css("transition","");
                n=bannerImgs.children().length-2;
                bannerImgs.css("left",-LIWIDTH*n);
                bannerInds.children(".hover").removeClass("hover");
                bannerInds.children(":eq("+(n)+")").addClass("hover");
                setTimeout(function(){
                    bannerImgs.css("transition","all "+TRAINS/1000+"s linear");
                },100)
            }
        })
        /*点击右移 实现右滑动*/
        $("[data-move=right]").click(function(e){
            e.preventDefault();
            console.log(1);
            if(n<bannerImgs.children().length-2){
                n++;
                bannerInds.children(".hover").removeClass("hover");
                bannerInds.children(":eq("+(n)+")").addClass("hover");
                bannerImgs.css("left",-LIWIDTH*n);
            }else{
                bannerImgs.css("transition","");
                bannerInds.children().first().addClass("hover");
                    n=0;
                    bannerInds.children(".hover").removeClass("hover");
                    bannerInds.children(":eq("+(n)+")").addClass("hover");
                    bannerImgs.css("left",-LIWIDTH*n);
                    setTimeout(function(){
                        bannerImgs.css("transition","all "+TRAINS/1000+"s linear");
                    },100)
            }
        })
    })
        /*设置产品区功能*/
     .then(()=>{
       /*三层楼层的信息，导入到页面中*/
       $.ajax({
                type:"GET",
                url:"data/01-index/04-products.php",
                success:function(data) {
                    //console.log(data);
                    var {recommended:rec,new_arrival:nea,top_sale:tsl}=data;
                    for(var i=0,html="";i<rec.length;i++){
                        var p=rec[i];
                        html+=i<2?
                            `<div>
                        <div class="desc">
                        <p class="name">${p.title}</p>
                        <p class="details">${p.details}</p>
                        <p class="price">¥${p.price}</p>
                        <a href="${p.href}" class="view">查看详情</a>
                        </div>
                        <img src="${p.pic}">
                        </div>`
                        :i<3?
                        `<div>
                            <div class="desc">
                              <p class="name">${p.title}</p>
                              <p class="price">¥${p.price}</p>
                              <a href="${p.href}" class="view">查看详情</a>
                            </div>
                            <img src="${p.pic}">
                          </div>`: `<div class="product">
                            <img src="${p.pic}">
                            <p class="name">${p.title}</p>
                            <p class="price">¥${p.price}</p>
                            <a href="${p.href}">查看详情</a>
                          </div>`;
                    }
                    $("#f1 .floor-content").html(html);
                    for(var i=0,html="";i<nea.length;i++){
                        var p=nea[i];
                        html+=i<2?
                            `<div>
                        <div class="desc">
                        <p class="name">${p.title}</p>
                        <p class="details">${p.details}</p>
                        <p class="price">¥${p.price}</p>
                        <a href="${p.href}" class="view">查看详情</a>
                        </div>
                        <img src="${p.pic}">
                        </div>`
                            :i<3?
                            `<div>
                            <div class="desc">
                              <p class="name">${p.title}</p>
                              <p class="price">¥${p.price}</p>
                              <a href="${p.href}" class="view">查看详情</a>
                            </div>
                            <img src="${p.pic}">
                          </div>`: `<div class="product">
                            <img src="${p.pic}">
                            <p class="name">${p.title}</p>
                            <p class="price">¥${p.price}</p>
                            <a href="${p.href}">查看详情</a>
                          </div>`;
                    }
                    $("#f2 .floor-content").html(html);
                    for(var i=0,html="";i<tsl.length;i++){
                        var p=tsl[i];
                        html+=i<2?
                            `<div>
                        <div class="desc">
                        <p class="name">${p.title}</p>
                        <p class="details">${p.details}</p>
                        <p class="price">¥${p.price}</p>
                        <a href="${p.href}" class="view">查看详情</a>
                        </div>
                        <img src="${p.pic}">
                        </div>`
                            :i<3?
                            `<div>
                            <div class="desc">
                              <p class="name">${p.title}</p>
                              <p class="price">¥${p.price}</p>
                              <a href="${p.href}" class="view">查看详情</a>
                            </div>
                            <img src="${p.pic}">
                          </div>`: `<div class="product">
                            <img src="${p.pic}">
                            <p class="name">${p.title}</p>
                            <p class="price">¥${p.price}</p>
                            <a href="${p.href}">查看详情</a>
                          </div>`;
                    }
                    $("#f3 .floor-content").html(html);
                },
                error:function(){
                    console.log("网络故障");
                }
            })
     })
     .then(()=>{
        /*页面导航条*/
       //当页面滚动到一定距离出现
       	//获取楼层数
	  var fTops=$(".floor>.floor-top");
		//根据楼层数，拼接出楼层导航条几个
	  var html="";
	  for(fTop of fTops){
		  html+=`<li class="lift_item">
			  <a href="javascript:;" class="lift_btn">
			  <span class="lift_btn_txt">
			  ${fTop.lastChild.nodeValue.trim().slice(0,4)}</span>
		      </a>
		  </li>`;
	  }
	  var ulLift=$("[data-list='elevator']");
	  ulLift.html(html);
	  ulLift.children().first().addClass("lift_item_on");
	  var top1=fTops[0].offsetTop;
	  var floors=[...$(".floor")];
	  //判断何时导航条hover到那块亮着
	  function checkOn(){
		  var scrollTop=document.body.scrollTop;
          var FHEIGHT=parseFloat(getComputedStyle(floors[0]).height);
		  for(var i=0;i<floors.length;i++){
			if(scrollTop>=floors[i].offsetTop-(innerHeight/2)&&
             scrollTop<floors[i].offsetTop+FHEIGHT-(innerHeight/2)){
                ulLift.children(":eq("+i+")").addClass("lift_item_on")
                .siblings().removeClass("lift_item_on");
            }	
		  }
	  }
	  //导航条滚动到一定距离显示
	  $(window).scroll(()=>{
		  if(top1<=document.body.scrollTop+innerHeight/2){
             $("#lift").css("display","block");
          }else{
             $("#lift").css("display","none");
          }
        //   滑动到一定距离，该模块添加样式
		  checkOn();
            for(let i=0;i<ulLift.children().length;i++){
                ulLift.children(":eq("+i+")").click(()=>{
                        moveTo(i);
                })
            }
        })
	//参数：DIST移动距离,DURA移动时间,移动步数STEPS,
	//interval时间间隔,step每步要走的距离，需要移动的距离,计数器timer
    var DIST=0,DURA=500,STEPS=100,
        interval=DURA/STEPS,step=0,
        moved=0,timer=null;
    function moveTo(i){
	  //避免计数器的叠加，每次移动之前先将之前的动画效果清除
	  if(timer!=null){
        clearInterval(timer);
        timer=null;
        moved=0;
      }
	  //计算移动距离  该元素距离屏幕顶部距离-减去滚动的距离，就是该元素需要走动的距离
      DIST=floors[i].offsetTop-document.body.scrollTop;
      step=DIST/STEPS;
      timer=setInterval(()=>{
        window.scrollBy(0,step);
        moved++;
        if(moved==STEPS){
          clearInterval(timer);
          timer=null;
          moved=0;
          checkOn();
        }
      },interval)
    }
     })
})();
