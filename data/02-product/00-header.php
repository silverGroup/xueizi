<?php
//功能：获取数据库中的title进行提示信息
require("../init.php");
@$kw=$_REQUEST["kw"];
$kws=explode(' ',$kw);
$cond="";
for($i=0;$i<count($kws);$i++){
   $kws[$i]="title LIKE '%".$kws[$i]."%' ";
}
$sql="select title from xz_laptop where ".join(" and ",$kws)." order by sold_count DESC LIMIT 15";
$result=mysqli_query($conn,$sql);
if($result==true){
    $rowList=mysqli_fetch_All($result,MYSQLI_ASSOC);
    if($rowList){
       echo json_encode($rowList);
    }
}else{
    echo $sql;
}

?>