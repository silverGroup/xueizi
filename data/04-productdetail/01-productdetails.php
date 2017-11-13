<?php
//设置响应消息头连接数据库，根据id查找用户信息
require("../init.php");
@$lid=$_REQUEST["lid"];
//查找数据库信息，xz_laptop xz_laptop_pic 打包拼接回数据库
/**
* 根据产品编号lid查询商品的所有信息
* 参数： lid
* 返回：{
*   "details":{...,
      "picList":[
        {pid:图片1,sm:xxx,md:xxx,lg:xxx},
        {pid:图片2,sm:xxx,md:xxx,lg:xxx},
        ...]
    },
*   "family":{
      "fid":..,
      "fname":..,
      "laptopList":[
        {"lid":..,"spec":..},
        {"lid":..,"spec":..},
        ...
      ]
    }
* }
*/
$output=[
  "details"=>[],
  "family"=>[]
];
//查询语句
function sql_execute($sql){
  global $conn;
  $result = mysqli_query($conn, $sql);
  if(!$result){
    return  "查询执行失败！请检查SQL语法：$sql";
  }else {
    if(stripos($sql,"select")===0){
      return $rowList = mysqli_fetch_all($result,MYSQLI_ASSOC);
    }else{
      return $result;
    }
  }
}
//查询数据库中商品lid的所有信息
$sql="select * from xz_laptop where lid=$lid";
$output["details"]=sql_execute($sql)[0];
//查询所有的图片存放在数组picList中
$sql="select * from xz_laptop_pic where laptop_id=$lid order by pid";
$output["details"]["picList"]=sql_execute($sql);
//查询商品的名称
$fid=$output["details"]["family_id"];
$sql="select * from xz_laptop_family where fid=$fid";
$output["family"]=sql_execute($sql)[0];
//查询商品的lid spec 放在商品规格中
$sql="select lid,spec from xz_laptop where family_id=$fid";
$output["family"]["laptopList"]=sql_execute($sql);
echo json_encode($output);
?>