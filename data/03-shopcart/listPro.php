<?php
require("../init.php");
//获取用户的id,商品数量，商品的id 和商品的数量
@$uid=$_REQUEST["uid"];
if($uid){
//	$sql="SELECT x.iid,x.product_id,x.count,l.lid,l.title,l.spec,l.price,p.sm ";
//	$sql  .= " FROM xz_shoppingcart_item x, xz_laptop l, xz_laptop_pic p";
//	$sql .=" WHERE x.product_id=l.lid AND x.user_id=$uid AND l.lid=p.laptop_id";

$sql="SELECT iid,product_id,lid,title,spec,price,count FROM  xz_shoppingcart_item inner join xz_laptop on product_id=lid where user_id=$uid";
}
 $result=mysqli_query($conn,$sql);
 if($result==true){
 $row=mysqli_fetch_all($result,MYSQLI_ASSOC);
 if($row){
	echo json_encode($row);
 }else{
	 echo '{"code":-1,"msg":"查询为空"}';
 }
 }else{
	 echo $sql;
 }
?>