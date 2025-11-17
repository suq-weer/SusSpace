---
tags:
  - Minecraft
  - Neoforge
  - 编程开发
  - 游戏
  - Java
  - 教程
---

# Neoforge模组教程（2）——前置导入、事件系统、物品注册

> [!danger]
> 请先阅读 [Neoforge模组教程——创建你的第一个 Neoforge 模组！](Neoforge模组教程——创建你的第一个%20Neoforge%20模组！.md) 再尝试阅读本文章。

## 前言

架设好模组开发环境后，我们来学一下基本功。

> [!tip]
>**下文说的 Gradle 均指的是 NeoGradle，这是一个 NeoForged 团队修改过的 Gradle 项目构建器。**

## 前置库/模组导入

鉴于有些读者其实是想为**某个热门模组或整合包开发附属模组**，这里先说一下几个基本的模组导入方法。

### Gradle 导入（首推）

查看你想要安装的模组的代码仓库，你会看到**模组仓库的 README 文件有类似以下内容**<small>（拿 JEI 举例）</small>：

```groovy
repositories {
  maven {
    // location of the maven that hosts JEI files since January 2023
    name = "Jared's maven"
    url = "https://maven.blamejared.com/"
  }
  maven {
    // location of a maven mirror for JEI files, as a fallback
    name = "ModMaven"
    url = "https://modmaven.dev"
  }
}
```

```groovy
dependencies {
  /* other minecraft dependencies are here */

  // compile against the JEI API but do not include it at runtime
  compileOnly("mezz.jei:jei-${mc_version}-neoforge-api:${jei_version}")
  // at runtime, use the full JEI jar for NeoForge
  runtimeOnly("mezz.jei:jei-${mc_version}-neoforge:${jei_version}")
}
```

**需要将代码复制粘贴放入`build.gradle`对应的地方**<small>（如果你没有过多修改项目的话，<code>build.gradle</code>应该会有上面的<code>repositories {}</code>和<code>dependencies {}</code>，将花括号里的内容填上去就好，注意不要修改其他东西）</small>

我在这里详解一下几个参数的意义：

- `repositories`：项目查找前置库的网址备选列表
	- `maven`：表明要定义的仓库是一个*Maven仓库*
		- `name`：仓库名，一般用于 Gradle 错误输出
		- `url`：仓库地址，***千万别填错！***
- `dependencies`：项目前置（Gradle 会尝试根据这里的内容进行项目前置打包或调试处理）
	- `compliteOnly()`：编译时不把前置源码放入项目模组的最终构建文件中 *（相当于模组需要前置模组才能启动）*
	- `runtimeOnly()`：启动调试用的 Minecraft 时将前置模组加载