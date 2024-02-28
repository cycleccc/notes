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