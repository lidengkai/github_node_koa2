## 项目部署

---

### 生产环境、测试环境、开发环境部署

- npm run prod

- npm run test

- npm run dev

### 本地环境部署

- 数据库安装

```bash
## 下载
brew install mysql@5.7
## 启动
/usr/local/Cellar/mysql@5.7/5.7.23/support-files/mysql.server start
## 设置root密码
mysql_secure_installation
## 查看密码强度
show variables like 'validate_password%'
## 设置密码强度
set global validate_password_policy = 0/1/2
```

- mysql配置

```sql
-- 创建数据库
create database db_name;
-- 分配用户
grant all privileges on db_name.* to 'db_name'@'localhost' identified by 'db_password';

-- 查看存储过程
SELECT * FROM information_schema.routines WHERE routine_name like 'db_p_%'\G;

-- 查看事件计划(value)
SHOW VARIABLES LIKE '%event_sche%';
-- 开启事件计划
SET GLOBAL event_scheduler = 1;
-- 关闭事件计划
SET GLOBAL event_scheduler = 0;

-- 查看定时任务(status)
SELECT * from information_schema.events WHERE event_name like 'db_e_%'\G;
-- 执行定时任务
ALTER EVENT db_event_name ON COMPLETION PRESERVE ENABLE;
-- 关闭定时任务
ALTER EVENT db_event_name ON COMPLETION PRESERVE DISABLE;
```

- 启动服务

```bash
npm start
```

- 前端请求接口

```js
URL: 'http://localhost:port'
```

- 生成建表语句

```js
URL: 'http://localhost:port/routes/table'
```

## webhook

```js
GET: 'http://localhost:port/routes/webhook'
```

## 压测

## 代码

- model定义

```Javascript
module.exports = {
  key: 'tableName',// 驼峰命名，首字母小写，对应数据库表table_name
  name: '表名',// 数据库表表名
  // 数据库表列类型定义
  columns: {
    ['colName']: {
      type,
      primaryKey,
      autoIncrement,
      unique,
      allowNull,
      defaultValue
      ...
    }
  },
  // 关联表 ... FROM This t JOIN Other o ON t.id=o.test_id
  associations(models) {
    const { Other } = models
    this.belongsTo(Other, {
      as: 'o',
      foreignKey: 'id',
      targetKey: 'test_id'
    })
  }
}
```

## 其他