# wechat-analysis

微信聊天记录分析 dashboard

## 环境

node 6.x+

## How to use

### 导出数据库

首先需要导出微信的 sqlite 数据库

先将 iPhone 连接电脑，然后备份到本地

TODO 补图。。。。。

IOS 使用 [iPhone Backup Extractor](https://www.iphonebackupextractor.com/)

Export mode

Application Domains - com.tencent.xin - Documents - [MD5] - DB - MM.sqlite, WCDB_Contact.sqlite

TODO 补图。。。。。。。。

### 运行

`npm install`

`npm start`

然后打开 `pages/index.html` 即可看到效果

## TODO list

- 用户名 MD5 解析
- 关键词文字云
- 信息类型 chart
- 表情 chart
- @次数统计
- user tags
- es?
- 。。。
