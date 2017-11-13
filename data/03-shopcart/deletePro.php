<?php
require("../init.php");
@$iid=$_REQUEST["iid"];
@$uid=$_REQUEST["uid"];
if($uid&&$iid){

	 $sql="delete from xz_shoppingcart_item where iid=$iid AND user_id=$uid";
}else{
	 $sql="delete from xz_shoppingcart_item where user_id=$uid";
} 
$result=mysqli_query($conn,$sql);
 if($result==true){
    echo '{"code":1,"msg":"删除成功"}';
    }else{
		 echo '{"code":-1,"msg":"数据故障"}';
	}
?>