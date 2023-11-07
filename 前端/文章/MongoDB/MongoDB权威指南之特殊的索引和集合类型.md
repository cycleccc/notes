# 前言
本章介绍 MongoDB 中的一些特殊的索引和集合类型，包括：
- 用于类队列数据的固定集合（capped collection）；
- 用于缓存的 TTL 索引；
- 用于简单字符串搜索的全文本索引；
- 用于二维平面和球体空间的地理空间索引；
- 用于存储大文件的 GridFS；

# 地理空间索引

MongoDB 有两种类型的地理空间索引
## 2dsphere
  - 使用 2dsphere 索引的距离计算考虑到了地球的形状，提供了比 2d 索引更准确的距离处理，比如计算两个城市之间的距离
  - 2dsphere 允许以 GeoJSON 格式指定点、线和多边形这些几何图形。

一个点由一个二元数组给出，表示 [ 经度,纬度 ]（[longitude,latitude]）

```json
{
    "name": "New York City",
    "loc": {
        "type": "Point",
        "coordinates": [
            50,
            2
        ]
    }
}
```

线可以用一个由点组成的数组来表示：

```json
{
    "name": "Hudson River",
    "loc": {
        "type": "LineString",
        "coordinates": [
            [
                0,
                1
            ],
            [
                0,
                2
            ],
            [
                1,
                2
            ]
        ]
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
## 2d