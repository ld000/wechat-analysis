# wechat-analysis

微信聊天记录分析 dashboard

## 环境

node 6.x+

## How to use

首先需要导出微信的 sqlite 数据库

先将 iPhone 连接电脑，然后备份到本地

TODO 补图。。。。。

IOS 使用 [iPhone Backup Extractor](https://www.iphonebackupextractor.com/)

Export mode

Application Domains - com.tencent.xin - Documents - [MD5] - DB - MM.sqlite, WCDB_Contact.sqlite

TODO 补图。。。。。。。。



## TODO list

- 代码优化
- 数据发送方式：express 服务器 或者 替换到 js 文件里？
- pages webpack
- 用户名 MD5 解析
- 关键词文字云
- 信息类型 chart
- 表情 chart
- @次数统计
- user tags
- es?
- 。。。
