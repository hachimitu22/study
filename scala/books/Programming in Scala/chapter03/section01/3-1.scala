// list3.1
// val greetStrings = new Array[String](3)
// greetStrings(0) = "Hello"
// greetStrings(1) = ", "
// greetStrings(2) = "world!\n"
// for (i <- 0 to 2)
//   print(greetStrings(i))

// 上記プログラムは下記のように変換される

val greetStrings = new Array[String](3)
greetStrings.update(0, "Hello")
greetStrings.update(1, ", ")
greetStrings.update(2, "world!\n")
for (i <- 0.to(2))
  print(greetStrings.apply(i))