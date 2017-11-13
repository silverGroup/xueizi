<?php
require("init.php");
//接收客户端请求来的数据
@$n=$_REQUEST['uname'];
@$p=$_REQUEST['upwd']; 
@$e=$_REQUEST['email'];
@$h=$_REQUEST['phone'];
$sql="insert into xz_user(uname,upwd,email,phone) values('$n','$p','$e',$h)";
$result=mysqli_query($conn,$sql);
if($result===true){
	echo '{"code":1,"msg":"注册成功"}';
}else{
	echo '{"code":-1,"msg":"注册失败"}';
}
?>