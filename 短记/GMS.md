# 立项  
- 创建
	- {"desc":{"$regex":"create"}}
	- data.postBody.apply.projectCode
- 修改
	- {"desc":{"$regex":"postModifyNewProjectApply"}}
	- data.postBody.apply.projectCode
- 取消预算
	- {"desc":{"$regex":"cancelBudget"}}
	- data.postBody.projectCode
- 分发
	- {"desc":{"$regex":"mba-distribution"}}
	- data.postBody.apply.projectCode
- 金额调整
	- {"desc":{"$regex":"mba-distribution-amountchange"}}
	- data.postBody.apply.projectCode
# 结项
- 同步
	- {"desc":{"$regex":"postCreateFinishProjectApply"}}
	- data.postBody.apply.projectCode

~~~json
{
"params":{
"create":'{"$and":[{"desc":{"$regex":"create"}},{"data.postBody.apply.projectCode":"templateCode"}]}',
"modify":'{"$and":[{"desc":{"$regex":"postModifyNewProjectApply"}},{"data.postBody.apply.projectCode":"templateCode"}]}',
"cancelBudget":'{"$and":[{"desc":{"$regex":"cancelBudget"}},{"data.postBody.projectCode":"templateCode"}]}',
"distribution":'{"$and":[{"desc":{"$regex":"mba-distribution"}},{"data.postBody.apply.projectCode":"templateCode"}]}',
"amountChange":'{"$and":[{"desc":{"$regex":"mba-distribution-amountchange"}},{"data.postBody.apply.projectCode":"templateCode"}]}',
"finishProjectSync":'{"$and":[{"desc":{"$regex":"postCreateFinishProjectApply"}},{"data.postBody.apply.projectCode":"templateCode"}]}',
}
}
~~~

~~~json
{
"params":{
"create":{"$and":[{"desc":{"$regex":"create"}},{"data.postBody.apply.projectCode":"templateCode"}]},
"modify":{"$and":[{"desc":{"$regex":"postModifyNewProjectApply"}},{"data.postBody.apply.projectCode":"templateCode"}]},
"cancelBudget":{"$and":[{"desc":{"$regex":"cancelBudget"}},{"data.postBody.projectCode":"templateCode"}]},
"distribution":{"$and":[{"desc":{"$regex":"mba-distribution"}},{"data.postBody.apply.projectCode":"templateCode"}]},
"amountChange":{"$and":[{"desc":{"$regex":"mba-distribution-amountchange"}},{"data.postBody.apply.projectCode":"templateCode"}]},
"finishProjectSync":{"$and":[{"desc":{"$regex":"postCreateFinishProjectApply"}},{"data.postBody.apply.projectCode":"templateCode"}]}
}
}
~~~
参考：mba-detail
title：mba基础信息操作
button：反向查询

新增pr设计制作下费用使用人
结项数据调整
feat: 添加 meta/pre-project 模块
UI: 添加文案、调整样式
日志检测规则
pr,campaign的summary迁移优化
fix  /system/info 时间格式
定时任务优化
feat: 结项审批中、结项审批完成状态不显示变更按钮
历史版本 新增与上一版本对比 以及修改人
feat: campaign detail 功能
增加日志查询
feat: purpose 指标 完善
fix: 字段调整
refactor: 提取工具方法、添加过滤状态表
feat:  封装calcResourceAmount
pref: 添加interface
docs: 添加函数注释、删除多余代码、完善校验规则
feat: 兼容变更、结项
新增查询条件  RTX统计  数据倒序
fix: 修复pr新建编辑信息展示不全
pref: 判空、修改函数命名、使用公共util
refactor: 封装getCampaignProjectsByState
docs: 删除多余代码
feat: mi 添加 preproject config 相关接口
feat: 兼容新旧 目标数据、转换数组结构
feat: 添加history弹窗组件
feat: 完善校验规则、校验前置
feat: 修改sscm统计样式
feat: 添加reverse-config页面