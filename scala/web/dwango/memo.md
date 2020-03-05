# メモ

- [sbtをインストールする](https://hexx.github.io/scala_text/sbt-install.html)
  - sbt 起動時に```[warn] Neither build.sbt nor a 'project' directory in the current directory: D:\develop\study\scala\web\dwango\scala-text```と表示されるのはエラーでは無くてプロジェクト関連のファイルが何も無いという警告なだけ。
    - [解決先リンク](https://yoshinorin.net/2019/04/01/preparation-scala-install-adoptopenjdk-and-sbt/)
- ```build.sbt```に```scalaVersion := "2.12.4"```のようなバージョンを記載することで使用されるScalaのバージョンを固定することが出来る。
- REPL で変数をクリアしたい場合は```:reset```で消せる
  - [解決先リンク](http://www.366service.com/jp/qa/52d0697cbbe34434bfec60ed32e4b3d3)
- [sbtでプログラムをコンパイル・実行する](https://hexx.github.io/scala_text/sbt-compile-execute.html) で```val u```が宣言出来ない。。。
  - [これ](https://github.com/sbt/sbt/issues/5093)と[これ](https://github.com/scala/bug/issues/11608)によると JDK12 で Scala 2.12 だとクラッシュするらしい。
  - build.bat の```scalaVersion := "2.12.4"```の行をコメントアウトしたら問題無く動作した。