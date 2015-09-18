Jnav是一款简洁的chrome导航插件。

![Alt text](https://raw.githubusercontent.com/JeremyFan/Jnav/master/doc-matter/jnav.png "Jnav截图")

### 特点
- 不需要打开新页面
- 支持键盘快捷键
- 可导入导出配置

### 使用

#### 安装扩展
`chrome设置` → `扩展程序` → 勾选`开发者模式` → `加载已解压的扩展程序` → 选择`dist`文件夹

> 因为没有国外信用卡，无法使用Google Wallet支付费用，暂时没有上架到chrome商店。所以只能以开发者的形式使用。

#### 配置
- `右键` → `选项` 打开选项页配置常用网址和分类
- 选项页可以导入导出配置
#### 快捷键
- 两个数字键组合快速打开网页。例如：打开导航后输入`12`，即可打开第一个分类下的第二个网址。
- `ctrl + 左键` 打开网页但不离开当前页
### 开发
#### 安装依赖
```
npm install
```
#### 修改源码
```
/src
	/images            # 图片
	/scripts           # 脚本
	/styles            # 样式
	manifest.json      # 插件配置
	option.html        # 插件选项
	popup.html         # 插件本身
```
#### 打包发布
```
gulp pub
```