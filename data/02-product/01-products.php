<?php
//获取数据库的信息，根据关键词查询，数量限制9 接收页面参数
require("../init.php");
//实现数据库查询
//接收页数
@$pno=$_REQUEST["pno"];
$output=[
    "Count"=>0,
    "pageCount"=>0,
    "pno"=>1,
    "pageSize"=>9,
    "data"=>null
];
@$kw=$_REQUEST["kw"];
$cond="";
if($kw){
    $kws=explode(" ",$kw);
    for($i=0;$i<count($kws);$i++){
        $kws[$i]=" title like '%$kws[$i]%' ";
    }
    $cond=" WHERE ".join(" AND ",$kws)." ORDER BY sold_count DESC ";
}
$sql="SELECT count(*) FROM xz_laptop ".$cond;
$result=mysqli_query($conn,$sql);
$output["Count"]=mysqli_fetch_assoc($result)["count(*)"];
//计算页数
$output["pageCount"]=ceil($output["Count"]/$output["pageSize"]);
//查询数据库信息
$sql=
" SELECT lid,title,price,sold_count,is_onsale,(select md from xz_laptop_pic where laptop_id=lid limit 0,1) as pic FROM xz_laptop ".$cond;
if($pno){
    $pno=intval($pno);
    $output["pno"]=$pno;
    $start=$output["pageSize"]*($output["pno"]-1);
    $sql .= " LIMIT $start, ".$output["pageSize"];
}
$result=mysqli_query($conn,$sql);
$output["data"]=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($output);
?>