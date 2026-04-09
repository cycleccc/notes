### [最大的和]([3493. 最大的和 - AcWing题库](https://www.acwing.com/problem/content/3496/))

​	适用于双指针与前缀和，以前没写过双指针~~可能·写过，忘了~~，这次看了视频对着敲了一下，感觉双指针和前缀和都差不多。

双指针就是先整体都加起来，然后在for循环里加一个减一个，前缀和就是先计算每个i的前i个数的和再在for循环里以m为间隔相减。

~~~c
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int N   = 100005;
int maxn      = 0;
int minn      = 0x3f3f3f3f;
int dir[4][2] = {1, 0, 0, 1, -1, 0, 0, -1};

int a[N], b[N], n, m, T, cnt;
ll sum = 0;

void solve() {
    cin >> n >> m;
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    for (int i = 0; i < n; i++) {
        cin >> b[i];
    }
    for (int i = 0; i < n; i++) {
        if (b[i]) sum += a[i];
    }
    ll v = 0, s = 0;
    for (int i = 0; i < n; i++) {
        if (!b[i]) s += a[i];
        if (i >= m & !b[i - m]) s -= a[i - m];
        v = max(v, s);
    }
    cout << sum + v << endl;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    solve();
    return 0;
}
~~~





