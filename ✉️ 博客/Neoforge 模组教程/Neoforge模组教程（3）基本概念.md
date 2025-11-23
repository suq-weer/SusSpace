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
	
	public SubTech(IEventBus modBus, ModContainer container) { // [!code focus:3]
        Register.register(modBus);
    }
}
```
5. **进游戏就能使用 `/give` 指令看到自己的物品了**（`example_mod:example_item`）