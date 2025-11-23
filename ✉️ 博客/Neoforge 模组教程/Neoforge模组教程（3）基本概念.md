---
tags:
  - 编程开发
  - 教程
  - 游戏
  - Java
  - Minecraft
  - Neoforge
---
# Neoforge模组教程（3）——基本概念

> [!note] 此文档正在编写中……
> 可能会有错误疏漏或不完整的地方。

> [!warning] 提醒
> 请先阅读 [Neoforge模组教程——创建你的第一个 Neoforge 模组！](Neoforge模组教程——创建你的第一个%20Neoforge%20模组！.md) 再尝试阅读本文章。

## 前言

基本上前期准备的就差不多了，现在我们来讲一下**在 Neoforge 经常甚至几乎每次都离不开的概念**——**注册**（*Registers*）、**端侧**（*Sides*）与**事件**（*Events*）。

## 注册（Registers）

注册是指将**模组中的对象**（如物品、 方块 、实体等）并**向游戏公开的过程**。注册很重要，因为**没有注册，游戏根本无法识别这些物体，导致无法解释的行为和崩溃**。

注册表简单来说，是**包裹在一个映射上的一个包装器**，将**注册表名称映射到注册对象，通常称为注册表项**。

**注册名必须唯一，但同一个注册名可能存在于多个注册表中**。最常见的例子是方块（在 `BLOCKS` 注册表中）拥有相同注册表名称的物品（在 `ITEMS` 注册表中）。

**注册表通常是 `DeferredRegister<>` 类，注册后的对象通常是 `DeferredHolder<>` 或 `Supplier<>` 类**<small>（后者需要 `.get()` 获取实际内容）</small>。

### 示例：注册物品

1. 首先**新建一个物品注册类，写入一个常量 `ITEMS`，获取游戏注册表**（`DeferredRegister<Item>`）：
```java
public class Register {
    public static final DeferredRegister<Item> ITEMS = DeferredRegister.create(Registries.ITEM, MOD_ID);
}
```
2. 再**写个能将 `ITEMS` 提交到模组总线的方法**：
```java
public class Register {
    public static final DeferredRegister<Item> ITEMS = DeferredRegister.create(Registries.ITEM, MOD_ID);
    
    public static void register(IEventBus modBus) { // [!code focus:3]
        ITEMS.register(modBus);
    }
}
```
3. 使用 `ITEMS` **注册一个物品**：
```java
public class Register {
    public static final DeferredRegister<Item> ITEMS = DeferredRegister.create(Registries.ITEM, MOD_ID);
    public static final Supplier<Item> EXAMPLE_ITEM = ITEMS.register("example_item", new Item(/*原版的 Item 类的构造函数需要传参*/)); // [!code focus]
    
    public static void register(IEventBus modBus) {
        ITEMS.register(modBus);
    }
}
```
4. 前往模组主类，**将方法提交到模组总线上**：
```java
@Mod(ExampleMod.MOD_ID)
public class ExampleMod {
	public static final String MOD_ID = "example_mod"

	// [!code focus:3]
	public SubTech(IEventBus modBus, ModContainer container) {
        Register.register(modBus);
    }
}
```
5. **进游戏就能使用 `/give` 指令看到自己的物品了**（`example_mod:example_item`）

## 端侧（Sides）

> [!warning] 提醒
> **这里的端侧为个人翻译，不是官方译名，如有错误请联系更正。**

端侧本来指的是服务端与客户端，但 Minecraft 的**端侧指的是“逻辑客户端/服务端”与“物理客户端/服务端”**。

### 物理侧（Physical Side）

当你打开 Minecraft 启动器，安装 Minecraft 并启动游戏时，你会启动**一个实体客户端** ，这样“物理”就会指的是“这是一个客户端程序”。这尤其意味着**客户端功能，比如所有渲染功能，在这里都可以使用，并且可以根据需要使用**。

相比之下， **物理服务器** ，也称为专用服务器，是你启动 Minecraft 服务器 JAR 时打开的。虽然 Minecraft 服务器配备了简陋的图形界面，但它缺少所有仅客户端功能。最显著的是，这意味着;**服务器 JAR 中缺少各种客户端类**。在物理服务器上调用这些类会导致缺失类错误，即崩溃，因此我们需要防范这种情况。

### 逻辑侧（Logical Side）

**逻辑方面主要关注 Minecraft 的内部程序结构**。 

**逻辑服务器**是游戏逻辑运行的地方。像时间和天气变化、实体跳动、实体生成等功能都在服务器上运行。所有类型的数据，比如库存内容，也都是服务器的责任。

而**逻辑客户端**则负责显示所有可显示的内容。**Minecraft 把所有客户端代码放在一个独立`net.minecraft.client`包里，并在一个叫做 `Render Thread` 的独立线程中运行**，而其他代码则被视为通用代码（即客户端和服务器端代码）。