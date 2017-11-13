/**
 * Created by WEB-UID-JAVA on 2017/9/17.
 */
(()=>{
    $("#footer").load("data/01-index/01-footer.php");
    /*功能：提示用户登录信息验证 通过提交跳转到主页面 并且设置名字*/
    var uname=document.getElementById("uname");
    var upwd=document.getElementById("upwd");
//验证信息函数vali
    function vali(txt,reg){
        if(reg.test(txt.value)){
            //修改span的class为成功
            txt.nextElementSibling.className="login_success";
            return true;
        }else{
            txt.nextElementSibling.className="login_fail";
            return false;
        }
    }
    uname.onblur=function(){
        vali(this,/^\w{1,10}$/);
    }
    upwd.onblur=function(){
        vali(this,/^\w{6,12}$/);
    }
    //获取焦点时，提示信息
    var t_msg=document.getElementById("t_msg");
    uname.onfocus=function(){
        t_msg.innerHTML="请输入1-10位的字母或数字下划线组合";
    }
    upwd.onfocus=function(){
        t_msg.innerHTML="请输入6-12位密码";
    }
    //如果自动登录选择上了，也实现自动跳转
    /*验证如果不可以则不让提交*/

    $(".loginCheck,.loginButton").on("click",function(e){
        if($(".loginCheck:checked")) {
            var rName = vali(uname, /^\w{1,10}$/);
            var rPwd = vali(upwd,/^\w{6,12}$/);
            if (!(rName && rPwd)) {
                //阻止默认行为
                e.preventDefault();
            } else {
                //否则，获取表单上的的value,传输到后端验证
                /*点击登录发送ajax请求 验证成功则跳转页面*/
                $.ajax({
                    type: "POST",
                    url: "data/00-login.php",
                    data: {uname: uname.value, upwd: upwd.value},
                    success: function (data) {
                        //console.log(data);
                        if (data.code > 0) {
                            //存储用户名到sessionstorage
                            sessionStorage.setItem("uname", uname.value);
                            sessionStorage.setItem("uid", data.uid);
                            //验证成功，则进行跳转页面
                            window.open("index.html", "_self");
                        } else {
                            confirm("用户名或密码输入错误！请重新输入");
                        }
                    },
                    error: function () {
                        alert("网络故障");
                    }
                });
            }
        }
    })
})();
