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
## css

~~~
// 背景色
// 绿色
#02B875

// 灰色
#EAECF1

// 褐色
#FEF7E2

// 红色
#EA6A6A
#D54941

// 白色
#FFFFFF

// 文字颜色

// 蓝色
#5086F3

// 黑色
#000000

// 深黑（蓝）
#202A41

// 深灰
#525A6D
#888E9B
#909194

// 绿色
#10B751
#02B875

// 黄色
#D07D00

// 红色
#F24F50

// 褐色
#D07D00
~~~
# 母项目
- [ ] 验收单
    - [ ] 详情页 点击 立项报错
    - [ ] pr 金额汇总
    - [ ] pr 下载
    - [ ] 表头颜色
    - [ ] 审批 驳回 展示错误
    - [ ] 草稿 自动保存
    - [ ] 草稿 提交/保存草稿 按钮
    - [ ] 保存草稿 > 跳转位置不对
    - [ ] 保存草稿/提交 按钮 loading 效果
    - [ ] 列表页 导出功能 异常
    - [ ] 详情页 转交 功能去掉
    - [ ] 列表页 操作 权限校验
    - [ ] 详情页 操作按钮 权限校验


## 立项
    - 列表页图标
    - 草稿页 图标样式
    - 草稿
        - 输入框 placeholder
        - 无法关联母项目
        - 推广目的 其他（自定义） 主要kpi textarea 默认设为一行
        - 产品选了没用
        - 现金拆分 头部 金额
    - 详情页
        - 审批节点 人员太多，没用折叠
        - 现金拆分 头部 金额
        - 操作 创建pr
        - 当前审批节点
        - 完成节点
        - pr 导出 pr 立项金额错误
    - 结项
        - 结项审批节点

    - 变更
        - 保存草稿/提交 loading 交互
        - 
            .ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
                background: inherit !important;
            }





## pr
    - 草稿
        - 编辑/新建 跳到新页面
        - 立项金额 标题 样式
        
    - 详情页
        - 标题，状态错误（审批中）
        - 底部金额展示
        - 订单/验收样式 保持 和 campain 一样
        - 结项 资源金额 头部样式
            - 资源类型、推广周期的对其
            - table 表头的对其
            - pr 立项详情要删掉
            - 底部剩余金额展示
    - 列表页
        - 提交结项按钮报错
    - 结项提交
        - 标题（执行中）是否需要修改？

## TODO
    - campaign/pr 多种测试
        - 多资源
        - 多渠道
    - campaign/pr 多流程
        - 各种审批节点
        - 驳回
        - 成功
        - mba 后续审批节点
    - campaign/pr 订单/验收单 测试数据

