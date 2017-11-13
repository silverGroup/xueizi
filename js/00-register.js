/**
 * Created by WEB-UID-JAVA on 2017/10/12.
 */
(()=>{
    $("#footer").load("data/01-index/01-footer.php");
    //接收用户输入的信息，1判断是否同名， 2判断格式正误，3 提示错误信息
    var uname=$("#uname"),upwd=$("#upwd"),upwdconfirm=$("#upwdconfirm"),email=$("#email"),phone=$("#phone")
    uname.blur(function(e){
        //console.log(uname.val();
        uname.next().removeClass("msg-error msg-default");
        if(uname.val()&&uname.val().length>=6) {
            $.ajax({
                type: "POST",
                url: "data/checkuname.php",
                data: {uname: uname.val()},
                success: function (data) {
                    console.log(data);
                    if (data.code > 0) {
                        uname.next().addClass("msg-error");
                    } else {
                        uname.next().addClass("msg-success");
                    }
                    uname.next().html(data.msg);
                },
                error: function () {
                    alert("网络故障");
                }
            })
        }else if(uname.val().length<6&&uname.val().length!=0){
            uname.next().html("用户名长度在6-9位之间").addClass("msg-default")
        }else{
            uname.next().html("用户名不能为空").addClass("msg-error")
        }
    })
    function vail($this,msg){
        $this.next().removeClass("msg-error msg-success");
        $this.next().html(msg).addClass("msg-default")
    }
    uname.focus(function(){
        vail($(this),"用户名长度在6-9位之间");
    })
    upwd.focus(function(){
        vail($(this),"密码长度在6-12位之间");
    })
    upwdconfirm.focus(function(){
        vail($(this),"密码长度在6-12位之间");
    })
    email.focus(function(){
        vail($(this),"请输入合法的邮箱地址");
    })
    phone.focus(function(){
        vail($(this),"请输入合法的手机号");
    })
    upwd.blur(function(){
        upwd.next().removeClass("msg-error msg-default");
        if(upwd.val()&&upwd.val().length>=6){
            upwd.next().html("密码格式正确").addClass("msg-success");
        }else if(upwd.val().length<6 &&upwd.val().length!=0){
            upwd.next().html("密码长度在6-12位之间").addClass("msg-default")
        }else{
            upwd.next().html("密码不能为空").addClass("msg-error")
        }
    })
    upwdconfirm.blur(function(){
        upwdconfirm.next().removeClass("msg-error msg-default");
        if(upwdconfirm.val()&&upwdconfirm.val()==upwd.val()){
            upwdconfirm.next().html("两次输入的密码一致").addClass("msg-success");
        }else if(upwdconfirm.val()&&upwdconfirm.val()!=upwd.val()){
            upwdconfirm.next().html("两次输入的密码不一致").addClass("msg-error");
        }else{
            upwdconfirm.next().html("确认密码不能为空").addClass("msg-error")
        }
    })
    email.blur(function () {
        email.next().removeClass("msg-error msg-default");
        if(email.val()&&email.val().indexOf("@")!=-1){
          email.next().html("该邮箱可使用").addClass("msg-success");
        } else if(email.val()&&email.val().indexOf("@")==-1) {
           email.next().html("请输入正确的邮箱格式").addClass("msg-error");
        } else{
            email.next().html("邮箱不能为空").addClass("msg-error")
        }
    })
    phone.blur(function(){
        var reg=/^\d{11}$/;
       phone.next().removeClass("msg-error msg-default");
        if(phone.val()&& reg.test(phone.val())){
            phone.next().html("该手机号可使用").addClass("msg-success");
        }else if(phone.val() && reg.test(phone.val())==false){
            phone.next().html("请输入正确的电话格式").addClass("msg-error");
        } else{
            phone.next().html("手机号不能为空").addClass("msg-error")
        }
    })
    //确保正确，发送请求，插入数据库中
    $('#bt-register').click(function (e) {
        e.preventDefault();
        var count = 0;
        $('.form-group').each(function () {
            if ($(this).find('span').hasClass('msg-success')) {
                count++;
            }
        })
        if(count==5){
            $.ajax({
                type:"POST",
                url:"data/register.php",
                data: {uname: uname.val(),upwd:upwd.val(),email:email.val(),phone:phone.val()},
                success: function (data) {
                    //console.log(data);
                    if(data.code>0){
                        $("#alertMsg,#shadowDiv").css("display","block");
                        $("#alertMsg_btn1").click(function () {
                            location.replace("login.html");
                        })
                    }
                },
                error:function(){
                    alert("网络故障");
                }
            })
        }
    })
})();