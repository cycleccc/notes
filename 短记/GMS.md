diff-history
- [x] 搜索功能完善
- [x] Pagination总数据量
- [x] 差异数据process状态切换，默认false
- [x] listview重复请求解决
- [x] 详细数据展示重复数据，差异数据不展示重复数据
- [x] 差异数据按日期展示
- [x] type合并为一行
- [x] modified状态差异name展示 
- [x] 滑动展示



2023年12月25日
- [ ] 审批状态没有relativeItem
![[Pasted image 20231225112634.png]]
- [x] 草稿状态没有relativeItem
![[Pasted image 20231225114334.png]]

- [x] DRAFT拼写错误
![[Pasted image 20231225153215.png]]

- [x] 无法保存 验收人和立项金额信息 为草稿
- [x] 提交成功但是刷新并没有进入审批状态


2023年12月26日

- [ ] 通过审批接口 只返回 ret:0 ，没有额外信息
- [ ] 走完推广总监流程后还没有审批结束，还在 审批中
![[Pasted image 20231226190411.png]]
![[Pasted image 20231226190431.png]]

- [ ] 变更差值绝对值已超过3万美金，没看到二部部门GM
http://localhost:8000/project-revise?_id=64ec90112ffb705d1ca00a41


2023年12月27日
![[Pasted image 20231227115604.png]]

2023年12月28日
 - [x] campaign编号可复制
 - [x] 折叠面板组件替换
 - [x] 表单校验
 - [x] 提交、审批通过、驳回 操作，加上 loading 状态
 - [x] 搜索匹配
 - [x] 删除问号icon