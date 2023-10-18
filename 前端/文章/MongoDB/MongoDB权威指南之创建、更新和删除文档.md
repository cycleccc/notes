# 插入文档

使用集合的 insertOne 方法插入单个文档
insertOne 会为文档自动添加一个 "_id" 键（如果你没有提供的话），并将其保存到 MongoDB 中。
> db.movies.insertOne({"title" : "Stand by Me"})

## insertMany
如果要向一个集合中插入多个文档，那么可以使用 insertMany。

使用 insertMany 执行批量插入时，如果中途某个文档发生了某种类型的错误，那么接下来会发生什么取决于所选择的是有序操作还是无序操作。可以指定一个选项文档作为 insertMany 的第二个参数。将选项文档中的 "**ordered**" 键指定为true，可以确保文档按提供的顺序插入。指定为 false 则允许 MongoDB 重新排列插入的顺序以提高性能。如果未特别指定，则默认为有序插入。对于有序插入，插入顺序由传递给 insertMany 的数组进行定义。如果一个文档产生了插入错误，则数组中`在此之后的文档均不会被插入集合中`。对于无序插入，MongoDB `将尝试插入所有文档，而不管某些插入是否产生了错误`。

## 插入校验

MongoDB 会对要插入的数据进行最基本的检查：
- 检查文档的基本结构，如果不存在 "\_id" 字段，则自动添加一个。
- 所有文档都必须小于 16MB。
由于仅做最基本的检查，这意味着可以很`容易地插入无效数据`

## 插入

- 在 MongoDB 3.0 之前，**insert** 是在 MongoDB 中插入文档的主要方法。
- 从MongoDB 3.2 开始，mongo shell 也支持这种 API，它包括 **insertOne** 和**insertMany** 以及其他一些方法。

虽然 insert 等方法仍然支持向后兼容，但今后`不应该在应用程序中继续使用`。应该使用 insertOne 和 insertMany 来创建文档。

# 删除文档

现在要删除数据库中的一些数据。CRUD API 为此提供了 **deleteOne** 和 **deleteMany** 两种方法。

这两种方法都将`筛选文档`（filter document）作为`第一个参数`。筛选文档指定了在删除文档时要与之匹配的一组条件。

可以使用 deleteMany 来删除满足筛选条件的所有文档。