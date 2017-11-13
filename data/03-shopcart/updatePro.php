<?php
require_once("../init.php");
@$iid=$_REQUEST["iid"];
@$count=$_REQUEST["count"];
$sql="update xz_shoppingcart_item set count=$count where iid=$iid";
$result=mysqli_query($conn,$sql);
if($result==true){
	echo '{"code":1,"msg":"更新成功"}';
}else{
	echo '{"code":-1,"msg":"更新失败"}';
}
?>