# 前言
本章介绍 MongoDB 中的一些特殊的索引和集合类型，包括：
- 用于类队列数据的固定集合（capped collection）；
- 用于缓存的 TTL 索引；
- 用于简单字符串搜索的全文本索引；
- 用于二维平面和球体空间的地理空间索引；
- 用于存储大文件的 GridFS；

# 地理空间索引

MongoDB 有两种类型的地理空间索引
## 2dsphere索引
  - 使用 2dsphere 索引的距离计算考虑到了地球的形状，提供了比 2d 索引更准确的距离处理，比如计算两个城市之间的距离
  - 2dsphere 允许以 GeoJSON 格式指定点、线和多边形这些几何图形。

一个点由一个二元数组给出，表示 [ 经度,纬度 ]（[longitude,latitude]）

```json
{
    "name": "New York City",
    "loc": {
        "type": "Point",
        "coordinates": [50,2]
    }
}
```

线可以用一个由点组成的数组来表示：

```json
{
    "name": "Hudson River",
    "loc": {
        "type": "LineString",
        "coordinates": [[0,1],[0,2],[1,2]]
    }
}
```

多边形可以用点组成面表示：
```json
{
    "name": "New England",
    "loc": {
        "type": "Polygon",
        "coordinates": [[[0,1],[0,2],[1,2],[0,1]]]}
}
```

可以在 createIndex 中使用 "2dsphere" 类型来创建一个地理空间索引：

```stylus
> db.openStreetMap.createIndex({"loc" : "2dsphere"})
```

### 地理空间查询的类型
可以使用 3 种类型的地理空间查询：交集（intersection）、包含（within）和接近（nearness）。查询时，需要将想查找的内容指定为 {"$geometry" : geoJsonDesc} 格式的 GeoJSON 对象。

- 可以使用 `"$geoIntersects"` 运算符找出与查询位置相交的文档。
- 可以使用 `"$geoWithin"` 来查询完全包含在某个区域中的文档。
- 可以使用 `"$geoNear"` 来查询附近的位置。
  - "\$geoNear" 是`唯一`隐含了排序操作的地理空间运算符："$geoNear" 的结果总是按照距离由近及远的顺序返回。

### 使用地理空间索引

## 2d索引
对于非球面地图（电子游戏地图、时间序列数据等），可以使用 2d 索引代替2dsphere 索引

文档应该使用一个双元素数组来表示 2d 索引字段。这个数组中的元素应该分别反映经度坐标和纬度坐标。

```json
{
    "name" : "Water Temple",
    "tile" : [ 32, 22 ]
}
```

默认情况下，2d 索引会假设取值范围为 -180 到 180。如果希望对边界大小进行调整，则可以指定最小值和最大值作为 createIndex 的选项

```stylus
> db.hyrule.createIndex({"light-years" : "2d"}, {"min" : -1000, "max" : 1000})
```

# 全文搜索索引

MongoDB 中的 text 索引支持全文搜索。

- 对集合的写操作需要更新所有索引。如果使用文本搜索，那么字符串会被标记并且进行词干提取，很多地方可能发生索引更新。

## 创建文本索引
假设有一个维基百科文章集合需要进行索引。要对其中的文本进行搜索，首先需要创建一个 text 索引。

```stylus
> db.articles.createIndex({"title": "text",
                           "body" : "text"})
```

可以通过对每个字段指定权重来控制不同字段的相对重要性

```stylus
> db.articles.createIndex({"title": "text",
                           "body": "text"},
                          {"weights" : {
                               "title" : 3,
                               "body" : 2}})
```

## 文本查询

可以使用 `"$text"` 查询运算符对具有 text 索引的集合进行文本搜索。

### 优化全文本搜索

如果能够使用某些查询条件将搜索结果的范围变窄，那么可以创建一个由这些查询条件前缀和全文本字段所组成的复合索引：

```stylus
> db.blog.createIndex({"date" : 1, "post" : "text"})
```

也可以使用某些查询条件作为后缀来实现覆盖查询。

```stylus
> db.blog.createIndex({"post" : "text", "author" : 1})
```

前缀形式和后缀形式也可以组合使用。

```stylus
> db.blog.createIndex({"date" : 1, "post" : "text", "author" : 1})
```

### 在其他语言中搜索

不同语言的词干提取机制是不同的，因此必须指定索引或者文档使用的`语言`。

text 索引允许指定"default_language" 选项，其默认值为 "english"，可以被设置为多种其他语言。

要创建一个法语索引，可以这样做：

```stylus
> db.users.createIndex({"profil" : "text",
                        "intérêts" : "text"},
                       {"default_language" : "french"})
```

# 固定集合

MongoDB 中的“普通”集合是动态创建的，并且可以自动增长以容纳更多的数据。
MongoDB 中还有另一种集合，名为`固定集合`，此集合需要`提前创建`好，而且它的大小是`固定`的

固定集合的行为类似于循环队列：如果空间不足，那么最旧的文档将被删除，新的文档将取而代之。这意味着在插入新文档时，`固定集合会自动淘汰最旧的文档`。

对于固定集合，有些特定操作是不允许的。
- 无法对文档进行删除
- 不允许进行会导致文档大小增长的更新

固定集合的访问模式是数据被顺序写入磁盘上的固定空间。这让它们在机械硬盘上的写入速度非常快，尤其是当集合拥有专有的磁盘时

不同于普通集合，固定集合在`使用前必须被显式创建`。可以使用 create 命令创建固定集合。在shell中，可以使用createCollection。

不同于普通集合，固定集合在使用前必须被显式创建。可以使用 create 命令创建固定集合。

```stylus
> db.createCollection("my_collection", {"capped" : true, "size" : 100000});
```

createCollection 还能够指定固定集合中文档的数量：

```stylus
> db.createCollection("my_collection2",
                      {"capped" : true, "size" : 100000, "max" : 100});
```

创建固定集合时还有另一个选项，可以将已存在的某个常规集合转换为固定集合。

```stylus
> db.runCommand({"convertToCapped" : "test", "size" : 10000});
{ "ok" : true }
```

## 可追加游标

可追加游标（tailable cursor）是一种特殊的游标，当游标的结果集被取光之后，其不会被关闭。

由于可追加游标在结果集取光之后`不会被关闭`，因此当有新文档插入集合中时，游标会`继续获取`新的结果。

由于普通集合并不维护文档的插入顺序，因此可追加游标`只能用于固定集合`。

可追加游标通常用于当文档被插入“工作队列”（固定集合）时对新插入的文档进行处理。如果超过 10 分钟没有新的结果，可追加游标就`会被释放`，因此当游标被关闭时自动重新执行查询是非常重要的。

# TTL索引

TTL 索引允许为每一个文档设置一个超时时间。当一个文档达到其预设的`过期时间`之后就会被删除。这种类型的索引对于类似会话保存这样的缓存场景非常有用。

可以在 createIndex 的第二个参数中指定"expireAfterSeconds" 选项来创建 TTL 索引：

```stylus
> // 超时时间为24小时
> db.sessions.createIndex({"lastUpdated" : 1}, {"expireAfterSeconds" : 60*60*24})
```

为了防止活跃的会话被删除，可以在会话上有活动发生时将 "lastUpdated" 字段的值`更新为当前时间`。一旦 "lastUpdated" 的时间距离当前时间达到 24 小时，相应的文档就会被删除。

MongoDB 每分钟扫描一次 TTL 索引，因此不应依赖于秒级的粒度。

在一个给定的集合中可以有多个 TTL 索引。TTL 索引不能是复合索引，但是可以像“普通”索引一样用来优化排序和查询。

# 使用GridFS存储文件

GridFS 是 MongoDB `存储大型二进制文件`的一种机制。

## GridFS 是 MongoDB 存储大型二进制文件的一种机制

使用 GridFS 最简单的方式是使用 mongofiles 工具。所有的 MongoDB 发行版都包含mongofiles，它可以用来在 GridFS 中上传文件、下载文件、查看文件列表、搜索文件，以及删除文件。

```PowerShell
$ echo "Hello, world" > foo.tx
$ mongofiles put foo.txt
2019-10-30T10:12:06.588+0000  connected to: localhost
2019-10-30T10:12:06.588+0000  added file: foo.txt
$ mongofiles list
2019-10-30T10:12:41.603+0000  connected to: localhost
foo.txt 13
$ rm foo.txt
$ mongofiles get foo.txt
2019-10-30T10:13:23.948+0000  connected to: localhost
2019-10-30T10:13:23.955+0000  finished writing to foo.txt
$ cat foo.txt
Hello, world
```

