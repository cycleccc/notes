# Warshall算法

​	今天的离散数学课后作业里有需要求传递闭包的题目，不懂~~上课没听~~，本来想用matlab偷一下懒，但是搜到了awrshall算法，故参考百科及其它博客后写~~水~~篇博客。

## 传递性

​	了解warshall算法之前需要了解==传递闭包==，传递闭包具有传递性，如果元素<x,y>、<y,z>在集合里,且元素<x,z>也在集合里,那么这个集合就具有传递性。

## 传递闭包

​	什么是传递闭包，有一种说法是将模糊相似关系矩阵R改造为模糊等价矩阵R，更清晰的说法是讲矩阵中所有满足传递性的节点都标出来。例如，x能到y,y能到z, z能到p，那么显然x到y还能到z、p。将原来矩阵中未标出的能到点 <x,z>和<x,p>都标出，这就是求传递闭包的过程。

## Floyd算法

​	如果学过Floyd算法的话在看完传递闭包的描述以后应该会觉得有点眼熟，两者思想是一致的，Warshall是通过0与1的相乘来判断两个点是否连通，而floyd比Warshall更高阶，具有了一种松弛操作，能找出最短路径。

​	本质上这两者都是动态规划的应用。

## Warshall算法

Warshall算法通俗的来说就是通过n^3^次方操作来判断矩阵中所有可以联通的点，例如现在有1到2，2到3，3到4，4到5，若想要判断1与4连通需要判断1与3连通，而想要判断1与5连通需要先判断1与4连通，所以需要进行n^3^次方来暴力判断所有的点。显然这么暴力的Warshall和Floyd算法在竞赛里是很少用的。

下面贴上代码：

```c++
void Warshall()
{
    for(k=1;k<=n;k++)//依次取得的可以作为中间点的顶点
    {
        for(i=1;i<=n;i++)
        {
            for(j=1;j<=n;j++)
            {
                temp[i][j]=(r[i][j])||(r[i][k]&r[k][j]);
            }
        }
        for(i=1;i<=n;i++)
            for(j=1;j<=n;j++)
                r[i][j]=n[i][j];
    }

}
```

#### 参考

> [Warshall传递闭包算法的学习与实现 - lpshou - 博客园 (cnblogs.com)](https://www.cnblogs.com/lpshou/archive/2012/04/27/2473109.html)
>
> [谈谈传递闭包以及自己杂想_ruangongshi的专栏-CSDN博客](https://blog.csdn.net/ruangongshi/article/details/49837257?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_title-0&spm=1001.2101.3001.4242)

