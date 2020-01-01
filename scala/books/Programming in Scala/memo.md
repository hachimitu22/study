# メモ

## 第01章

- Scala についての説明のみ。
- C++ の演算子のオーバーライドの拡張版みたいなことが出来る。
- Java の資産をそのまま使える。
- 配列に対しての for が JavaScript みたいにコールバックを設定出来る。
  - 他と何が違うのか不明。

## 第02章

- コンソール上でインタープリタを実行する。

### 2.4 簡単な Scala スクリプトを書く

- scala ファイルを作成、コンパイル、実行 まで行う。


### 2.5 while によるループ、 if による分岐

### 2.6 foreach と for による反復実行

- JavaScript と同じで foreach に匿名関数を定義出来る。
- 引数が一致する場合は関数名だけでも良い。


## 第03章

### 3.1 配列について

```scala
val greetStrings = new Array[String](3)
greetStrings(0) = "Hello"
greetStrings(1) = ", "
greetStrings(2) = "world!\n"
for (i <- 0 to 2)
  print(greetStrings(i))
```

```scala
// + はIntオブジェクトのメソッドなので以下二つは同じ意味になる。
1 + 2
(1).+(2)
```

```scala
// list3.2
// 以下二つは同じことを行っている。
val numNames = Array("zero", "one", "two")
val numNames2 = Array.apply("zero", "one", "two")
```
