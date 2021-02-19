### 问题修改

1. 使用Echarts报表，函数错误情况。

找到vendor目录下面的该文件:

```php
vendor/cyd622/laravel-admin-ext-echarts/src/Echarts.php
```

修改为如下内容:
```php
if (!$this->showToolbox) {
    Arr::set($this->toolbox, 'show', false);
    //array_set($this->toolbox, 'show', false);
}
```

2. MySQL使用groupBy函数查询问题。

首先，修改MySQL查询模式，在my配置文件的mysqld配置下添加如下内容:
```mysql
sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,
NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,
NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'
```
重启服务，可以直接登录MySQL服务，使用如下命令进行修改:
```mysql
mysql> show VARIABLES like '%sql_mode%';
+---------------+-------------------------------------------------------------------------------------------------------------------------------------------+
| Variable_name | Value                                                                                                                                     |
+---------------+-------------------------------------------------------------------------------------------------------------------------------------------+
| sql_mode      | ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION |
+---------------+-------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.01 sec)

mysql> set @@sql_mode="STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION";
Query OK, 0 rows affected (0.00 sec)

mysql> show VARIABLES like '%sql_mode%';
+---------------+------------------------------------------------------------------------------------------------------------------------+
| Variable_name | Value                                                                                                                  |
+---------------+------------------------------------------------------------------------------------------------------------------------+
| sql_mode      | STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION |
+---------------+------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)
```
> 如果你是在修改配置之前创建的数据库，需要到对应的数据库下面执行。

配置完之后，重启MySQL服务。由于Laravel内置了一套严格模式，需要将Laravel中的database配置的严格模式进行关闭。
```php
config/database.php
'mysql' => [
    'strict' => false,
],
```
