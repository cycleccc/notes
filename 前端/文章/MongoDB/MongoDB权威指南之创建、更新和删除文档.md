# 插入文档

使用集合的 insertOne 方法插入单个文档
insertOne 会为文档自动添加一个 "_id" 键（如果你没有提供的话），并将其保存到 MongoDB 中。
```
db.movies.insertOne({"title" : "Stand by Me"})
```

## insertMany
如果要向一个集合中插入多个文档，那么可以使用 insertMany。

使用 insertMany 执行批量插入时，如果中途某个文档发生了某种类型的错误，那么接下来会发生什么取决于所选择的是有序操作还是无序操作。可以指定一个选项文档作为 insertMany 的第二个参数。将选项文档中的 "**ordered**" 键指定为true，可以确保文档按提供的顺序插入。指定为 false 则允许 MongoDB 重新排列插入的顺序以提高性能。如果未特别指定，则默认为有序插入。对于有序插入，插入顺序由传递给 insertMany 的数组进行定义。如果一个文档产生了插入错误，则数组中`在此之后的文档均不会被插入集合中`。对于无序插入，MongoDB `将尝试插入所有文档，而不管某些插入是否产生了错误`。

```bash
> db.movies.drop()
true
> db.movies.insertMany([{"title" : "Ghostbusters"},
...                       {"title" : "E.T."},
...                       {"title" : "Blade Runner"}]);
{
    "acknowledged" : true,
    "insertedIds" : [
        ObjectId("572630ba11722fac4b6b4996"),
        ObjectId("572630ba11722fac4b6b4997"),
        ObjectId("572630ba11722fac4b6b4998")
    ]
}
> db.movies.find()
{ "_id" : ObjectId("572630ba11722fac4b6b4996"), "title" : "Ghostbusters" }
{ "_id" : ObjectId("572630ba11722fac4b6b4997"), "title" : "E.T." }
{ "_id" : ObjectId("572630ba11722fac4b6b4998"), "title" : "Blade Runner" }
```

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

```bash
> db.movies.find()
{ "_id" : 0, "title" : "Top Gun"}
{ "_id" : 1, "title" : "Back to the Future"}
{ "_id" : 3, "title" : "Sixteen Candles"}
{ "_id" : 4, "title" : "The Terminator"}
{ "_id" : 5, "title" : "Scarface"}
> db.movies.deleteOne({"_id" : 4})
{ "acknowledged" : true, "deletedCount" : 1 }
> db.movies.find()
{ "_id" : 0, "title" : "Top Gun"}
{ "_id" : 1, "title" : "Back to the Future"}
{ "_id" : 3, "title" : "Sixteen Candles"}
{ "_id" : 5, "title" : "Scarface"}
```

可以使用 deleteMany 来删除满足筛选条件的所有文档。

```bash
> db.movies.find()
{ "_id" : 0, "title" : "Top Gun", "year" : 1986 }
{ "_id" : 1, "title" : "Back to the Future", "year" : 1985 }
{ "_id" : 3, "title" : "Sixteen Candles", "year" : 1984 }
{ "_id" : 4, "title" : "The Terminator", "year" : 1984 }
{ "_id" : 5, "title" : "Scarface", "year" : 1983 }
> db.movies.deleteMany({"year" : 1984})
{ "acknowledged" : true, "deletedCount" : 2 }
> db.movies.find()
{ "_id" : 0, "title" : "Top Gun", "year" : 1986 }
{ "_id" : 1, "title" : "Back to the Future", "year" : 1985 }
{ "_id" : 5, "title" : "Scarface", "year" : 1983 }
```

- 在 MongoDB 3.0 之前，remove 是删除文档的主要方法。
- 在 MongoDB 3.0 之前，remove 是删除文档的主要方法。

尽管 remove 仍然支持向后兼容，但你应该在应用程序中使用 deleteOne 和 deleteMany。*当前的 CRUD API 提供了更整洁的语义，尤其在多文档操作中，可以帮助应用程序开发人员避开之前API 中存在的很多常见陷阱。*

## 删除集合

可以使用 **deleteMany** 来删除一个集合中的所有文档

```bash
> db.movies.find()
{ "_id" : 0, "title" : "Top Gun", "year" : 1986 }
{ "_id" : 1, "title" : "Back to the Future", "year" : 1985 }
{ "_id" : 3, "title" : "Sixteen Candles", "year" : 1984 }
{ "_id" : 4, "title" : "The Terminator", "year" : 1984 }
{ "_id" : 5, "title" : "Scarface", "year" : 1983 }
> db.movies.deleteMany({})
{ "acknowledged" : true, "deletedCount" : 5 }
> db.movies.find()
```

删除文档的操作通常会比较快。不过，如果想清空整个集合，那么使用 **drop** 直接删除集合，然后在这个空集合中重建各项索引会更快

# 更新文档

将文档存入数据库中之后，可以使用以下几种更新方法之一对其进行更改：updateOne、updateMany 和 replaceOne。

与删除文档相同，这三个API都将筛选文档作为第一个参数。

更新文档是`原子操作`：如果两个更新同时发生，那么首先到达服务器的更新会先被执行，然后再执行下一个更新。

## 文档替换

**replaceOne** 会用新文档完全替换匹配的文档。
一个常见的错误是查询条件匹配到了多个文档，然后更新时由第二个参数产生了`重复的 "_id" 值`。数据库会抛出错误，任何文档都不会被更新。

```bash
> var joe = db.users.findOne({"name" : "joe"});
> joe.relationships = {"friends" : joe.friends, "enemies" : joe.enemies};
{
    "friends" : 32,
    "enemies" : 2
}
> joe.username = joe.name;
"joe"
> delete joe.friends;
true
> delete joe.enemies;
true
> delete joe.name;
true
> db.users.replaceOne({"name" : "joe"}, joe);
```

## 使用更新运算符

通常文档只会有一部分需要更新。可以使用原子的更新运算符（update operator）更新文档中的特定字段。更新运算符是特殊的键，可用于指定复杂的更新操作，比如`更改、添加或删除键，甚至可以操作数组和内嵌文档`。

### "$set"修饰符入门

- "$set" 用来设置一个字段的值。如果这个字段不存在，则创建该字段。
- "$set" 甚至可以修改键的类型。
- "$unset" 可以将这个键完全删除。
- "$set" 可以用来修改内嵌文档。

```bash
> db.users.updateOne({"name" : "joe"},
... {"$set" : {"favorite book" :
...     ["Cat's Cradle", "Foundation Trilogy", "Ender's Game"]}})
```

应该始终使用 $ 修饰符来增加、修改或删除键。

### 递增操作和递减操作

"$inc" 运算符可以用来修改已存在的键值或者在该键不存在时创建它。

和 "\$set" 用法类似，"\$inc" 是专门用来对数字进行递增和递减操作的。"$inc" 只能用于整型、长整型或双精度浮点型的值。如果用在其他任何类型的值上，则会导致操作失败。

### 数组运算符

#### 添加元素

- "$push" 会将元素添加到数组末尾
- 可以对 "\$push" 使用 "$each" 修饰符，在一次操作中添加多个值
- 如果只允许数组增长到某个长度，则可以使用 "$slice" 修饰符配合 $push 来防止数组的增长超过某个大小
- 在截断之前可以将 "\$sort" 修饰符应用于 "$push" 操作

#### 将数组作为集合使用

- 仅当一个值不存在时才进行添加。这可以在查询文档中使用 "$ne" 来实现。
- 可以使用 "$addToSet" 来避免插入重复的值。
- "\$addToSet" 与 "\$each" 结合使用，以添加多个不同的值，而这不能使用 "\$ne" 和 "$push" 的组合来实现。

#### 删除元素

- 如果将数组视为队列或者栈，那么可以使用 "$pop" 从任意一端删除元素。
	- {"\$pop" : {"key" : 1}} 会从数组末尾删除一个元素，{"$pop" : {"key" : -1}} 则会从头部删除它。 
- 有时需要根据特定条件而不是元素在数组中的位置删除元素。"$pull" 用于删除与给定条件匹配的数组元素。
	- "$pull" 会删除所有匹配的文档，而不仅仅是一个匹配项。

#### 基于位置的数组更改

有两种方法可以操作数组中的值
- 按位置或使用定位运算符（$ 字符）。
- 定位运算符 "$" 只会更新第一个匹配到的元素。

#### 使用数组过滤器进行更新

MongoDB 3.6 引入了另一个用于更新单个数组元素的选项：arrayFilters。此选项使我们能够修改与特定条件匹配的数组元素。

### upsert

upsert 是一种特殊类型的更新。如果找不到与筛选条件相匹配的文档，则会以这个条件和更新文档为基础来创建一个新文档；如果找到了匹配的文档，则进行正常的更新。

有时候需要在创建文档时对字段进行设置，但在后续更新时不对其进行更改。这就是 "\$setOnInsert" 的作用。"$setOnInsert" 是一个运算符，它只会在插入文档时设置字段的值。

### save 辅助函数
save 是一个 shell 函数，它可以在文档不存在时插入文档，在文档存在时更新文档。它只将一个文档作为其唯一的参数。如果文档中包含 "\_id" 键，save 就会执行一个 upsert。否则，将执行插入操作。

## 更新多个文档

**updateMany** 提供了一个强大的工具，用于执行模式迁移或向某些特定用户推出新功能。
**updateMany** 遵循与 updateOne 同样的语义并接受相同的参数。关键的区别在于可能会被更改的文档数量。

## 返回被更新的文档

在某些场景中，返回修改过的文档是很重要的。在 MongoDB 的早期版本中，findAndModify 是这种情况下的首选方法。它对于操作队列和执行其他需要取值、赋值的原子操作来说非常方便。

不过，findAndModify 很容易出现用户错误，因为它非常复杂，结合了 3 种不同类型操作的功能：删除、替换和更新（包括upsert）。

MongoDB 3.2 向 shell 中引入了 3 个新的集合方法来提供 findAndModify 的功能，但其语义更易于学习和记忆：findOneAndDelete、findOneAndReplace 和findOneAndUpdate。

这些方法与 updateOne 之间的主要区别在于，它们可以原子地获取已修改文档的值。

MongoDB 4.2 扩展了 findOneAndUpdate 以接受一个用来更新的聚合管道。管道可以包含以下阶段：$addFields 及其别名 $set、$project 及其别名 $unset，以及 $replaceRoot 及其别名 $replaceWith。