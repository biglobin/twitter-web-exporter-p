twitter-web-exporter-p: 一种结合 [twitter-web-exporter](https://github.com/prinsss/twitter-web-exporter) 实现自动采集的解决方案。


## 一. 自动采集用户、书签、搜索结果推文:
1. 安装[twitter-web-exporter](https://github.com/prinsss/twitter-web-exporter) 

2. 下载zumarobot：[zumarobot.zip](https://github.com/biglobin/twitter-web-exporter-p/blob/main/dist/zumarobot.zip)

3. 打开zumarobot.exe, 在用户、书签、搜索结果等页面的自动滚动，在滚动过程中，页面上的推文即可由twitter-web-exporter自动下载。


![06_patch2](https://github.com/user-attachments/assets/a26967cc-c97f-4e4d-b9ef-8e773c33c577)


![06_patch2](https://github.com/user-attachments/assets/d66c3931-917f-4c59-ab0c-cb4a516574a5)

详细视频:
https://youtu.be/dwlXvOzRkFo

## 二. 自动采集推文详情:

**步骤1：**
下载安装:[twitter web exporter P](https://github.com/biglobin/twitter-web-exporter-p/blob/main/dist/twitter-web-exporter.user.js)

安装后效果图：twitter web exporter P作为补丁插件，显示在twitter web exporter 下边

![05_patch1.png](https://github.com/biglobin/twitter-web-exporter-p/blob/main/docs/05_patch1.png)

**步骤2：**
点击上图红圈处，打开补丁插件主面板：

![06_patch2.png](https://github.com/biglobin/twitter-web-exporter-p/blob/main/docs/06_patch2.png)

**步骤3: **
打开zumarobot.exe 配置好采集目标后，点击启动。
(原理： 点击插件面板上的推广链接，打开推文详情页面时，twitter-web-exporter即可自动下载推文详情。
持续自动和重复点击，即可下载所有推文详情。)

参考视频：
