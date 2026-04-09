## Trie树

[TOC]



### 定义

高效地存储和查找字符串集合的数据结构

适用于Trie树的题目特点：

这些字符串要么都是小写字母，要么都是大写字母，要么就是数字，要么就是0和1.

假设现在需要存储这么多字符串的话，Trie树就长这样

![img](https://img2020.cnblogs.com/blog/1987729/202007/1987729-20200712230730393-1859153164.png)

这里用一道中的tire字符串统计题来理解trie树。

### Tire字符串统计

![img](https://img2020.cnblogs.com/blog/1987729/202007/1987729-20200712223830508-1121261438.png)

这道题就是简单的用二维数组son\[26][26]实现对所有字符串的存储，二维数组中的26代表每个节点只有26个节点（也就是a到z26个字母）

### ac代码

~~~c
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const int N   = 100005;
int maxn      = 0;
int minn      = 0x3f3f3f3f;
int dir[4][2] = {1, 0, 0, 1, -1, 0, 0, -1};

int n;
int son[N][26]; //用一个二维数组做树
int cnt[N];     //记录以这个点为结尾的单词数量
int idx;
char str[N];
void insert(char str[]) {
    int p   = 0;
    int len = strlen(str);
    for (int i = 0; i < len; i++) {
        int u = str[i] - 'a';
        if (!son[p][u]) {
            son[p][u] = ++idx;
        }
        p = son[p][u];
    }
    cnt[p]++;
}
int query(char str[]) {
    int p = 0;
    for (int i = 0; str[i]; i++) {
        int u = str[i] - 'a';
        if (!son[p][u]) return 0;
        p = son[p][u];
    }
    return cnt[p];
}
void solve() {
    cin >> n;
    while (n--) {
        string op;
        cin >> op;
        cin >> str;
        if (op == "I") {
            insert(str);
        } else {
            cout << query(str) << endl;
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    cout.tie(0);
    solve();
    return 0;
}
~~~



---

### 参考

>https://www.cnblogs.com/justinh/p/7716421.html
>
>[8.Trie字符串统计 Trie树，也叫字典树 - haust_fx - 博客园 (cnblogs.com)](https://www.cnblogs.com/fx1998/p/13290768.html)
