// // 命令型
// def printArgs(args: Array[String]): Unit = {
//     var i = 0
//     while (i < args.length) {
//         println(args(i))
//         i += 1
//     }
// }

// // 関数型その1
// def printArgs(args: Array[String]): Unit = {
//     for (arg <- args)
//         println(arg)
// }
// // 関数型その2
// def printArgs(args: Array[String]): Unit = {
//     args.foreach(println)
// }

// 3.9 副作用なし
def formatArgs(args: Array[String]) = args.mkString("\n")

val res = formatArgs(Array("zero", "one", "two"))
assert(res == "zero\none\ntwo")
println(res)