<?php
/*查询数据库表xz_index_product*/
require("../init.php");
$output=[];
$sql="select pid,title,details,pic,price,href from xz_index_product where seq_recommended>0 order by seq_recommended limit 6";
$result=mysqli_query($conn,$sql);
if($result==true){
    $rowList=mysqli_fetch_All($result,MYSQLI_ASSOC);
    if($rowList){
        $output["recommended"]=$rowList;
    }
}
$sql="select pid,title,details,pic,price,href from xz_index_product where seq_new_arrival>0 order by seq_new_arrival limit 6";
$result=mysqli_query($conn,$sql);
if($result==true){
    $row=mysqli_fetch_All($result,MYSQLI_ASSOC);
    if($row){
        $output["new_arrival"]=$row;
    }
}
$sql="select pid,title,details,pic,price,href from xz_index_product where seq_top_sale>0 order by seq_top_sale limit 6";
$result=mysqli_query($conn,$sql);
if($result==true){
    $row1=mysqli_fetch_All($result,MYSQLI_ASSOC);
    if($row1){
        $output["top_sale"]=$row1;
    }
}
echo json_encode($output);
?>