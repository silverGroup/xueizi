<?php
/*功能：添加商品到个人的商品购物车中*/
require("../init.php");
//获取用户的id,商品数量，商品的id 和商品的数量
@$uid=$_REQUEST["uid"];
@$lid=$_REQUEST["lid"];
@$count=$_REQUEST["count"];
if($uid){
    $sql="SELECT count(*) FROM xz_shoppingcart_item WHERE user_id=$uid and product_id=$lid";
    $result=mysqli_query($conn,$sql);
    if(mysqli_fetch_assoc($result)["count(*)"]==1){
    $sql="UPDATE xz_shoppingcart_item SET count=count+$count WHERE user_id=$uid and product_id=$lid";
    }else{
    $sql="INSERT INTO xz_shoppingcart_item VALUES(null,$uid,$lid,$count,false)";
    }
    $result=mysqli_query($conn,$sql);
    if($result==true){
    echo '{"code":1,"msg":"添加成功"}';
    }
}
?>