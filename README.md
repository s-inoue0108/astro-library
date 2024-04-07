# Shota Inoue Web Library

![Shota Inoue Web Library](https://si-library.net/portfolio-favicon.png)

## 目的

プログラミングなどの学習記録をコンテンツ化し、継続的に配信する仕組みの提供

# スタック

`/preview` ルートを SSR で、その他を SSG でホスティングしています。ブログを更新すると Slack チャンネル #blog へ通知され、自動 Deploy を行います。

## フロントエンド

[AstroJS](https://docs.astro.build/en/getting-started/)

## コンテンツ管理

[Newt](https://app.newt.so/spaces)

## ホスティング

[Vercel](https://vercel.com/s-inoue0108/astro-library/deployments)

# Markdown

リッチテキストのほかに Markdown を利用して記事を書くことができます。

## 拡張構文

### コールアウト

インフォメーション

```md:Info
> **info**
> text
> text
```

---

注意

```md:Warning
> **warning**
> text
> text
```

ヒント

```md:Hint
> **hint**
> text
> text
```

### 数式

KeTeX[^1] を使用しています。
[^1]: mhchem 拡張を検討中

インライン

```tex:Inline
$ \frac{a}{b} = c $
```

ディスプレイ

```tex:Display
$$ \frac{a}{b} = c $$
```

### 画像キャプション

画像の直後に**インラインで** `**caption: hogehoge**` と挿入すると、画像の下に `hogehoge` の部分のみが表示されます。

```md:Image
text
text

[This is Image](imageUrl) **caption: hogehoge**

text
text
```

### 表キャプション

表の直前に**ブロックで** `**caption: fugafuga**` と挿入すると、表の上に `fugafuga` の部分のみが表示されます。

```md:Table
text
text

**caption: fugafuga**
| header | A | B | C | D |
| :----: |:-:|:-:|:-:|:-:|
|  data  | 1 | 2 | 3 | 4 |

text
text
```
