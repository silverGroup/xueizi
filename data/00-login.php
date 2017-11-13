<?php
//连接数据库，查询语句
require("init.php");
@$u=$_REQUEST["uname"];
@$p=$_REQUEST["upwd"];
$sql="select uid,uname from xz_user where uname='$u'and upwd='$p'";
$result=mysqli_query($conn,$sql);
if($result==true){
$row=mysqli_fetch_assoc($result);
if($row){
    echo '{"code":1,"msg":"信息正确","uid":'.$row["uid"].'}';
}else{
    echo '{"code":-1,"msg":"信息错误"}';
}
}else{
    echo $sql;
}
?>