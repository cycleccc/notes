[849. Dijkstra求最短路 I - AcWing题库](https://www.acwing.com/problem/content/851/)	

​		以前不是很理解最短路算法，后来上了离散数学课以后现在再看总算是彻底懂了，写个模板在这

## 代码

~~~
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int N   = 510;
const int mod = 1e9 + 7;
int maxn      = 0;
int minn      = 0x3f3f3f3f;
int dir[4][2] = {1, 0, 0, 1, -1, 0, 0, -1};

int g[N][N];
int dist[N];
bool st[N];

int n, m;
int Dijkstra() {
    memset(dist, 0x3f, sizeof(dist)); //初始化距离
    dist[1] = 0;                      //1到自身为0

    for (int i = 0; i < n; i++) { //n个点，n次迭代
        int t = -1;

        for (int j = 1; j <= n; j++) { //遍历找到此次迭代距离最近的点
            if (!st[j] && (t == -1 || dist[t] > dist[j]))
                t = j;
        }

        st[t] = true; //将刚刚确定的点设为确定的最短路径

        for (int j = 1; j <= n; j++) {                 //通过松弛操作更新为每个点此时暂时的最短路径
            dist[j] = min(dist[j], dist[t] + g[t][j]); //以t点为上一节点的路径的距离和原距离相比较
        }
    }
    if (dist[n] == 0x3f3f3f3f) return -1;
    return dist[n];
}

void solve() {
    cin >> n >> m;
    memset(g, 0x3f, sizeof(g));
    while (m--) {
        int x, y, z;
        cin >> x >> y >> z;
        g[x][y] = min(g[x][y], z);
    }
    cout << Dijkstra() << endl;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    solve();
    return 0;
}
~~~

## 堆优化

