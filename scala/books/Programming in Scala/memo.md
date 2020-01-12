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

### 3.2 リスト

リスト3.3を実行すると warning が発生する  
**warning: there was one deprecation warning (since 2.13.0); re-run with -deprecation for details**  
廃止予定([deprecation warning](http://tetu1984.hateblo.jp/entry/20110221/1298302399))のメソッドを使っている場合に出る警告とのこと。  

どうやら List の + メソッドが廃止予定っぽい。先頭に "" を追加して　String で + して String 型になってしまえば問題なかった。

### 3.3 タプル

- アクセスが 1 からなのは Haskell などの伝統だから。

### 3.4 集合、マップ

- イミュータブル(C言語でいう const)とミュータブル(追加、変更可)の trait が用意されている。

### 3.5 関数型のスタイルを見分ける

- 結果型が**Unit**の場合は副作用がある。

### 3.6 ファイルから行を読み出す

## 第04章 クラスとオブジェクト

### 4.1 クラス、フィールド、メソッド

- メソッドの引数は val になるので再代入不可となる。

### 4.2 セミコロン推論

- セミコロンは省略可能だが、一行に複数の文を記述する場合は必要になる。
- 括弧閉じの前に改行した場合は括弧閉じまでを1文として解析される。
- 演算子で繋げる場合に改行する場合は行末に付ける。

  ``` scala
    x +
    y +
    z
  ```

### 4.3 シングルトンオブジェクト

- コンパニオンオブジェクトとクラスは互いに private メンバーにアクセスできるとはどういうこと？
  - 言葉の通りアクセスできる。

### 4.4 メインメソッド

- main メソッドを持つスタンドアロンシンブルトンオブジェクトはエントリーポイントになる。
- scala はスクリプトを実行できる。 sacalc はコンパイルが出来る。
  - コンパイル後は scala で実行できる。

### 4.5 App トレイト

## 第05章 基本型と演算子

### 5.1 基本型

- Int 型は**scala.Int**が完全名になる。
- String 型は**java.lang**パッケージのものになる。
- 全てのソースファイルに**scala**と**java.lang**がインポートされている。

### 5.2 リテラル

- 8進数はサポートしてない。
- 整数、小数、文字、boolean は他言語と変わらない。
- 文字に Unicode 文字も指定出来る。更に識別子などにも Unicode 文字が使える。
  - ASCII コードで表現出来ない文字をソース上に残せるようにするためらしい。
- ダブルクォーテーション3つでエスケープシーケンス無しで文字列が指定できる。
  - | と stripMargin メソッドでインデントも揃えれる。
- 同名の Symbol は同じ物を参照している。(グローバル変数みたいな感じっぽい?)

### 5.3 文字列補間

- 補間子 s, f, raw がある。

``` scala
scala> val name = "reader"
name: String = reader

scala> println(s"Hello, $name!")
Hello, reader!

scala> s"The answer is ${6 * 7}."
res1: String = The answer is 42.

scala> println(raw"No\\\\escape!")
No\\\\escape!

scala> f"${math.Pi}%.5f"
res3: String = 3.14159
```
