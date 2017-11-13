<?php
require_once("init.php");
@$uname=$_REQUEST["uname"];
if($uname){
  $sql="select * from xz_user where uname='$uname'";
  $result=mysqli_query($conn,$sql);
	if($result==true){
	$row=mysqli_fetch_assoc($result);
	if($row){
    echo '{"code":1,"msg":"用户名已被占用"}';
	}else{
    echo '{"code":-1,"msg":"用户名可以使用"}';
	}
	}
}