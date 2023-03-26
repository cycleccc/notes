# tokitsukaze and Soldier

## 题目描述

链接：https://ac.nowcoder.com/acm/problem/50439

[传送门](https://ac.nowcoder.com/acm/problem/50439)

来源：牛客网

在一个游戏中，tokitsukaze需要在n个士兵中选出一些士兵组成一个团去打副本。
 第i个士兵的战力为v[i]，团的战力是团内所有士兵的战力之和。
 但是这些士兵有特殊的要求：如果选了第i个士兵，这个士兵希望团的人数不超过s[i]。(如果不选第i个士兵，就没有这个限制。)
 tokitsukaze想知道，团的战力最大为多少。

### 输入描述:

~~~
第一行包含一个正整数n(1≤n≤10^5)。
接下来n行，每行包括2个正整数v,s(1≤v≤10^9,1≤s≤n)。
~~~

### 输出描述:

~~~
输出一个正整数，表示团的最大战力。
~~~

### 示例1

```
2
1 2
2 2
```

### 输入

~~~ 
3
1 3
2 3
100 1
~~~

输出

~~~
100
~~~

#### 解题思路

~~刚看到以为是背包DP~~

由于每个士兵有特殊的要求，他希望团里人数不能超过s个人，显然我们可以按每个士兵的s从大到小排序，这样便可以在人数变少的情况下筛掉战力弱的人，但是这时因为我们刚开始是以每个士兵的s值来排序的，v值并没有排，故每次筛选战力弱的人的时候都需要循环一遍找出最小战力者，此时，就可以用上优先队列了。

上代码

```c++
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
const int INF = 0x3f3f3f3f;
const int N = 100005;
const ll mod = 1e9+9;
int maxn=0;
int minn=INF;
int dir[4][2]={1,0,0,1,-1,0,0,-1};

priority_queue<ll,vector<ll>,greater<ll> > q;

int n;

struct node
{
    ll v;
    int s;
}a[N];

int cmp(node a,node b)
{
    return a.s>b.s;
}

int solve()
{
    cin>>n;
    for (int i = 1; i <= n; i++)
    {
        cin>>a[i].v>>a[i].s;
    }
    sort(a+1,a+n+1,cmp);

    ll tmp=0,ans=0;

    for (int i = 1; i <= n; i++)
    {
        tmp += a[i].v;
        q.push(a[i].v);

        while (q.size() > a[i].s)
        {
            tmp -= q.top();
            q.pop();
        }

        ans = max(ans,tmp);
    }
    cout<<ans;
    return 0;
}

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    // while(1){
    solve();
    // }
    return 0;
}

```



> 优先队列用法参考:https://blog.csdn.net/weixin_36888577/article/details/79937886
>
> 原题解参考:https://ac.nowcoder.com/discuss/390428

原题解的代码应该是有一点错误的，他的代码中的结构体中的重载函数并没有用处，这可能会误导并不理解优先队列用法的人。

错误之处在于**重载函数中大于号对应的是小根堆，小于号才是大根堆**，他写的重载函数是刚好因为没用，所以还是大根堆，没有改变。