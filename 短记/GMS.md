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

redis， kafka，nodejs的子线程

1. **数据治理与流程升级**
    - 实施数据清理与优化策略，删除冗余信息，提升系统数据质量。
    - 优化结项审批流程，新增状态展示和操作按钮，全面提高审批效率。
2. **模块引入与功能深化**
    - 引入新的meta/pre-project模块，加强对项目信息的管理与展示。
    - 对campaign detail功能进行深度优化，改善指标展示和用户体验。
3. **代码质量提升与工具方法精炼**
    - 进行全面代码质量提升，包括判空机制、命名规范，增加公共util的使用。
    - 工具方法的重构，涵盖过滤状态表和calcResourceAmount的封装。
4. **项目数据处理与系统日志加强**
    - 实现根据code或id获取project功能，保障项目信息完整性。
    - 引入outer-record-log模块，强化系统操作追踪与日志记录。
5. **用户界面调整与配置优化**
    - 通过UI样式调整和按钮样式的精心设计，提升系统整体用户体验。
    - 引入品牌知名度配置，通过配置组件优化系统可扩展性。
6. **文件维护与功能拓展**
    - 删除多余代码，进行文件命名规范化和位置迁移，提高代码清晰度。
    - 新增diff对比数据UI，完善diff-history模块，丰富用户功能体验。