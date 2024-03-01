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
1. **数据管理与审批流程优化**
    
    - 新增pr设计制作下费用使用人，完善结项数据调整。
    - 引入meta/pre-project模块，增强项目管理功能。
    - UI调整，添加文案并调整样式，提升用户体验。
    - 增加日志检测规则，强化系统日志监控与安全性。
2. **功能模块优化与修复**
    
    - 进行pr、campaign的summary迁移优化，修复系统时间格式问题。
    - 完善结项审批流程，状态不显示变更按钮的问题得到解决。
    - 深化campaign detail功能，增加指标完善和历史版本比对功能。
3. **工具方法封装与代码重构**
    
    - 提取工具方法、添加过滤状态表，增强代码可维护性。
    - 封装calcResourceAmount、getCampaignProjectsByState等功能，提高代码复用率。
4. **日志查询与定时任务优化**
    
    - 增加日志查询功能，方便用户追踪操作记录。
    - 进行定时任务优化，提升系统性能和稳定性。
5. **数据查询条件增加与兼容性更新**
    
    - 新增查询条件RTX统计和数据倒序，增强数据查询灵活性。
    - 兼容新旧目标数据，转换数组结构，确保系统数据兼容性。