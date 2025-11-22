---
tags:
  - Python
  - 教程
---
# 微机课 Python 作业——在控制台输出直角三角形
```python
# 构建一个翻译对象，可以更方便地修改提示信息等。（而不是东一块西一块XD）
class Translate:
	# 报错提示信息
	errorNotInt = "[错误]输入的不是纯数字"

	# 问题提示信息
	question = "请输入等腰直角三角形的直角边长："

	# 三角形单元
	triangleUnit = "$ "

# 构建一个三角形对象，将其存入算法和返回值，可以更有效地进行模块化。
class Triangle:

	#把结果放入这个函数
	output = "" # 规定变量为字符串

	# 构建一个特殊的名为"__init__"的函数，当主线程里的变量被赋值成这个对象的时候会调用。
	def __init__(self, side): #这里括号必须有 self，不然不能在函数中调用自己。我们再新增一个名为 side 的参数，指直角边长。
		# 构建一个将要输出的字符串。我的方法和老师上课时的不同（因为还是为了模块化，需要隔离）。
		toReturn = ""
		# 采用嵌套循环法的方式输出多个三角形单元
		for i in range(side): # 循环 side 次（side 多少就多少）
			for i in range(i + 1): # 循环 i 次（注意 i 指上一行的 i）
				toReturn += Translate.triangleUnit # 形如 toReturn = toReturn + Translate.triangleUnit（注意 Translate.triangleUnit 已经被定义过了）
			toReturn += "\n" # 再插入换行符
		self.output = toReturn # 存放结果（output 是成员变量被隔离了）
		return # 返回定义后的自己

# 当文件被命令行打开时：（__name__ 是全局变量）
if __name__ == "__main__":
	# 如果报错会跳到 except 下
	try:
		# 构建对象
		triangleToPrint = Triangle(int(input(Translate.question))) # 注意转整数类型
		print(triangleToPrint.output) # 打印对象的成员变量 output
	except:
		# 输出报错
		print(Translate.errorNotInt)

"""
程序逻辑总结：
	1.通过向命令行输出问题，来获得边长输入；
	2.使用嵌套循环法，循环输入的边长，先决定行数，再在每一行进行递增输出。

该代码涉及知识点：
	# 面向对象编程
	# Python 面向对象
		# __init__ 全局函数
		# 类对象调用
	# Python Int 类型（整数）
	# Python Str 类型（字符串）
	# Python def 函数
		# 函数参数的输入与输出
	# 成员变量、私域变量、全局变量
		# 预定义类型
		# 变量类型之间的转换
	# 逻辑控制：
		# if、else 条件控制
		# try、except 异常处理
		# for 循环处理
			# range() 函数
	# input() 获取输入函数
	# print() 打印输出函数
	# Python 模块化处理
		# Python 本地化处理

这个教程文件就写到这里，加油，Python 人！✧٩(ˊωˋ*)و✧
"""
```