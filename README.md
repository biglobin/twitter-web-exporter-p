twitter-web-exporter-p: 一种结合 [twitter-web-exporter](https://github.com/prinsss/twitter-web-exporter) 实现自动采集的解决方案。


## 一. 自动采集用户、书签、搜索结果推文:
1. 安装[twitter-web-exporter](https://github.com/prinsss/twitter-web-exporter) 

2. 下载zumarobot：

外网下载:
[https://github.com/biglobin/twitter-web-exporter-p/releases](https://github.com/biglobin/twitter-web-exporter-p/releases)

国内下载:
[https://gitee.com/biglobin/zumarobot/releases](https://gitee.com/biglobin/zumarobot/releases)

3. 打开zumarobot.exe, 在用户、书签、搜索结果等页面的自动滚动，在滚动过程中，页面上的推文即可由twitter-web-exporter自动下载。


![04_patch1.png](https://github.com/user-attachments/assets/a26967cc-c97f-4e4d-b9ef-8e773c33c577)


![05_patch2.png](https://github.com/user-attachments/assets/d66c3931-917f-4c59-ab0c-cb4a516574a5)

详细视频:
https://youtu.be/dwlXvOzRkFo

## 二. 自动采集推文详情:

**步骤1：**
下载安装:[twitter web exporter P](https://github.com/biglobin/twitter-web-exporter-p/blob/main/dist/twitter-web-exporter.user.js)
安装后篡改猴界面效果图：
![07_patch3](https://github.com/user-attachments/assets/6bce559a-5f7a-4a55-877b-84d70234dc6d)

安装后前端显示效果图：twitter web exporter P作为补丁插件，显示在twitter web exporter 下边
![05_patch1](https://github.com/user-attachments/assets/ed9d398e-132c-4c0f-b395-90bcc3769f93)

**步骤2：**
点击上图红圈处，打开补丁插件主面板：

![06_patch2](https://github.com/user-attachments/assets/17acd826-2f0c-4684-8d0a-60b1f6a1df0d)

**步骤3：**
打开zumarobot.exe， 选择采集推文详情。配置好采集目标(用户|标签|搜索结果)后，点击启动。

(原理： 打开推文页面时，twitter-web-exporter可自动下载推文详情。根据这一特性，从目标列表(用户|标签|搜索结果)中提取推文链接放在插件面板上，使用zumarobot自动模拟点击面板上的推文链接，将所有推文链接分别打开一次之后，即可完成下载所有推文详情。)

参考视频：制作中

**如有问题，请提交ISSUE.**
