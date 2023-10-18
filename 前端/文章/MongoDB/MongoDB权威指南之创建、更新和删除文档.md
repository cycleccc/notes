# 插入文档

使用集合的 insertOne 方法插入单个文档
insertOne 会为文档自动添加一个 "_id" 键（如果你没有提供的话），并将其保存到 MongoDB 中。
> db.movies.insertOne({"title" : "Stand by Me"})

# insertMany
如果要向一个集合中插入多个文档，那么可以使用 insertMany。