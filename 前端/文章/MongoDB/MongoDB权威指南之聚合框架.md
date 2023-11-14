# 前言
许多应用程序需要进行某一类的数据分析。MongoDB 为使用聚合框架原生地进行分析提供了强大的支持。本章介绍这个框架和它提供的一些基本工具。

聚合框架基于管道的概念。使用聚合管道可以从MongoDB 集合获取输入，并将该集合中的文档传递到一个或多个阶段，每个阶段对其输入执行不同的操作。

在聚合管道中，一个阶段就是一个数据处理单元。它一次接收一个输入文档流，一次处理一个文档，并且一次产生一个输出文档流。

# 阶段入门：常见操作

使用**$match**进行过滤

```JavaScript
db.companies.aggregate([
    {$match: {founded_year: 2004}},
])
```

这相当于使用了 find API

```JavaScript
db.companies.find({founded_year: 2004})
```

使用**$project**添加一个投射阶段来将每个文档的输出减少到几个字段。

```JavaScript
db.companies.aggregate([
  {$match: {founded_year: 2004}},
  {$project: {
    _id: 0,
    name: 1,
    founded_year: 1
  }}
])
```

使用**$limit**把结果集限制为5。

```JavaScript
db.companies.aggregate([
  {$match: {founded_year: 2004}},
  {$limit: 5},
  {$project: {
    _id: 0,
    name: 1}}
])
```

无论 MongoDB 查询规划器在给定版本中进行何种类型的优化，都应该始终注意聚合管道的效率。确保在构建管道时限制从一个阶段传递到另一个阶段的文档数量。

使用$sort对文档进行升序排序

```JavaScript
db.companies.aggregate([
    { $match: { founded_year: 2004 } },
    { $sort: { name: 1} },
    { $limit: 5 },
    { $project: {
        _id: 0,
        name: 1 } }
])
```

使用**$skip**跳过10个文档。

```JavaScript
db.companies.aggregate([
  {$match: {founded_year: 2004}},
  {$sort: {name: 1}},
  {$skip: 10},
  {$limit: 5},
  {$project: {
    _id: 0,
    name: 1}},
])
```

# 表达式

- **布尔**表达式允许使用 AND、OR 和 NOT。
- **集合**表达式允许将数组作为集合来处理。特别地，可以取两个或多个集合的交集或并集，也可以取两个集合的差值并执行一些其他的集合运算。
- **比较**表达式能够表达许多不同类型的范围过滤器。
- **算术**表达式能够计算上限（ceiling）、下限（floor）、自然对数和对数，以及执行简单的算术运算
- **数组**表达式为操作数组提供了强大的功能，包括过滤数组元素、对数组进行分割或从特定数组中获取某一个范围的值。
- **变量**表达式允许处理文字、解析日期值及条件表达式。
- **累加器**提供了计算总和、描述性统计和许多其他类型值的能力。

# $project

在投射阶段中，用于指定 ipo、valuation 和 funders 值的 `$字符`表示这些值应被解释为`字段路径`，并分别用于为每个字段选择应投射的值。

```JavaScript
db.companies.aggregate([
  {$match: {"funding_rounds.investments.financial_org.permalink": "greylock" }},
  {$project: {
    _id: 0,
    name: 1,
    ipo: "$ipo.pub_year",
    valuation: "$ipo.valuation_amount",
    funders: "$funding_rounds.investments.financial_org.permalink"
  }}
]).pretty()
```

# $unwind

$unwind 会从输入文档中获取一个数组，并为该数组中的每个元素创建一个输出文档

![[Pasted image 20231109174515.png]]

# 累加器

聚合框架提供的累加器可以执行对特定字段中的所有值进行求和（`$sum`）、计算平均值（`$avg`）等操作。`$first` 和 `$last` 也被视为累加器，因为在它们所在的阶段中所有经过的文档的值都会被检查。`$max` 和 `$min` 是另外两个累加器的例子，它们会查看文档流并只保存看到的其中一个值。可以使用$mergeObjects 将多个文档合并为单个文档。

还有用于数组的累加器。当文档通过管道传递时，可以将值`$push` 到数组中。`$addToSet` 与 `$push` 非常相似，只是它可以确保结果数组中不包含重复的值。

# 分组简介

分组阶段执行的功能类似于 SQL 中的 GROUP BY 命令。

在分组阶段，可以将多个文档的值聚合在一起并对它们执行某种类型的聚合操作，比如计算平均值。

## 分组阶段中的_id字段

