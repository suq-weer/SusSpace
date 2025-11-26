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

    // [!code focus:3]
    public static void register(IEventBus modBus) {
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
	public static final Supplier<Item> EXAMPLE_ITEM = ITEMS.register("example_item", new Item(/*...*/));

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

**举个例子：**

- 玩家加入了一个**多人世界**：**玩家的物理（和逻辑）客户端连接到另一个物理（且逻辑）服务器**。
- 玩家加入一个**单人世界**：**玩家的物理客户端启动一个逻辑服务器**，**然后以逻辑客户端的角色连接到同一台机器上的该逻辑服务器**。如果你熟悉网络，可以把它看作是连接到`localhost` （仅限概念上，没有实际的套接字或类似的处理）。

**也就是说：**

- **多人游戏时**，**客户端只会调用客户端的代码**，**服务端只会调用服务端的代码**
- **单人游戏时**，**客户端会启动一个“逻辑上的”服务端**，运行服务端代码，而不仅仅是客户端代码
- **物理端是你“运行的是哪个程序”，逻辑端是你“当前代码在哪个线程上执行”**

这两个场景也代表了：**如果逻辑服务端能处理你的代码**<small>（即客户端上的逻辑服务端）</small>，**但这并不保证物理服务器也能兼容**。**你应该始终用专用服务端测试，检查是否有意外行为**。

| **错误**       | **后果**                       |
| ------------ | ---------------------------- |
| 在逻辑客户端执行游戏逻辑 | 导致不同步（假实体、假物品等）              |
| 在物理服务器调用客户端类 | 直接崩溃： `NoClassDefFoundError` |
| 用静态变量共享逻辑端数据 | 单机正常，联机出错（因为客户端和服务器线程共用静态变量） |

由于客户端和服务器分离错误导致的 **`NoClassDefFoundError` 和 `ClassNotFoundException` 是模组中最常见的错误**。

### 如何判断？

#### 逻辑侧

**进入世界时，获取世界 `level`，使用它的 `.isClientSide()` 方法：**

```java
if (!level.isClientSide()) {
    // 这里是逻辑服务器，安全地处理游戏逻辑
}
```

`true` **则为逻辑客户端**，`false` **则为逻辑服务端**。

#### 物理侧

**通过** `FMLEnvironment` **类**：

```java
if (FMLEnvironment.dist == Dist.CLIENT) {
    // 只在物理客户端上执行，比如注册屏幕、渲染器
}
```

- `Dist.CLIENT`：**物理客户端**<small>（即玩家运行的游戏）</small>
-  `Dist.DEDICATED_SERVER`：**物理服务端**<small>（即服务器正在运行的程序）</small>

### 开发建议

| **场景**                      | **推荐做法**                                            |
| --------------------------- | --------------------------------------------------- |
| 处理游戏逻辑（如方块交互、实体生成）          | 用  `!level.isClientSide()`  判断，确保只在逻辑服务器执行          |
| 使用客户端专属类（如  `Minecraft`  类） | 用  `FMLEnvironment.dist == Dist.CLIENT`  判断，避免服务器崩溃 |
| 注册客户端内容（如屏幕、渲染器）            | 放在客户端专属的  `@Mod`  类中，设置  `dist = Dist.CLIENT`       |

## 事件系统

**事件系统是 NeoForge 的主要特色之一**。**事件（*Event*）是根据游戏中发生的各种事情触发的**。例如，玩家右键点击、玩家或其他实体跳跃、方块渲染、游戏加载等事件。**我们可以为这些事件订阅事件处理程序，然后在这些事件处理程序中执行它们想要的行为**。

### 游戏总线（NeoForge Event Bus）

事件会在各自的事件总线上触发。最重要的总线（*Bus*）是 `NeoForge.EVENT_BUS`，也称为**游戏总线**。

#### 注册方法

**注册事件的方法有三种**，但所有这些方法的共同点是**每个事件处理程序都是一个只有一个事件参数且没有结果的方法**（即**返回类型** `void` ）。

##### `IEventBus#addListener`

```java
@Mod("example_mod")
public class ExampleMod {
    public ExampleMod(IEventBus modBus) {
    // [!code focus:2]
    // 在这里将我们模组的 onLivingJump() 方法传入游戏总线
    NeoForge.EVENT_BUS.addListener(YourMod::onLivingJump);
    }

	// [!code focus:8]
    // 当任意实体跳跃时触发该事件
    private static void onLivingJump(LivingEvent.LivingJumpEvent event) {
        LivingEntity entity = event.getEntity();
        // 只能在逻辑服务端上给实体回血
        if (!entity.level().isClientSide()) {
            entity.heal(1);
        }
    }
}
```

##### `@SubscribeEvent`

**事件订阅**可以通过**创建事件订阅方法并用 `@SubscribeEvent` 进行注解**来驱动。然后，你可以**将包含该方法的类构造函数传递给事件总线**，**注册该类所有带  `@SubscribeEvent` 注解的事件订阅**：

```java
// 还是任意实体跳跃回血
public class EventHandler {
    @SubscribeEvent // [!code ++]
    public void onLivingJump(LivingEvent.LivingJumpEvent event) {
        LivingEntity entity = event.getEntity();
        if (!entity.level().isClientSide()) {
            entity.heal(1);
        }
    }
}

// 也可以使用静态类
public class SecondEventHandler {
    @SubscribeEvent // [!code ++]
    public static void onLivingJump(LivingEvent.LivingJumpEvent event) { // [!code warning]
        LivingEntity entity = event.getEntity();
        if (!entity.level().isClientSide()) {
            entity.heal(1);
        }
    }
}

@Mod("yourmodid")
public class YourMod {
    public YourMod(IEventBus modBus) {
        NeoForge.EVENT_BUS.register(new EventHandler()); // [!code ++]
	    NeoForge.EVENT_BUS.register(SecondEventHandler.class); // [!code ++]
    }
}
```

##### `@EventBusSubscriber`

可以用 `@EventBusSubscriber` 注释事件处理类。**NeoForge 会自动发现该注释，允许你从模组构造器中移除所有与事件相关的代码**。本质上，**它等同于调用** `NeoForge.EVENT_BUS.register(EventHandler.class)` **模组构造器和** `modBus.register(EventHandler.class)` 。**这意味着所有处理器方法也必须保持静态**。

```java
// 还是任意实体跳跃回血
@EventBusSubscriber(modid = "yourmodid") // [!code ++]
public class EventHandler {
    @SubscribeEvent // [!code ++]
    public static void onLivingJump(LivingEvent.LivingJumpEvent event) { // [!code warning]
        LivingEntity entity = event.getEntity();
        if (!entity.level().isClientSide()) {
            entity.heal(1);
        }
    }
}
```

### 模组总线（Mod Event Bus）

**此外，启动时会为每个加载的模组生成一个模组总线，并传递到模组的构造器中。**（在 [示例：注册物品](#示例：注册物品) 里演示过一次）

```java
@Mod(ExampleMod.MOD_ID)
public class ExampleMod {
	public static String MOD_ID = "example_mod";
	
	// [!code focus:4]
	// 模组构造器
	public static void register(IEventBus modBus) {
        // 方法的 modBus 参数就是 Neoforge 给模组的模组总线
    }
}
```

> [!info] 信息
> **许多模组总线事件是并行触发的**<small>（而主总线事件总是在同一线程上运行）</small>，**这极大地提高了启动速度**。

## 课后练习

**恭喜完成教程**！**下面出了一些题目来帮你理清这些概念**：

1. 在[注册物品](#示例：注册物品)示例中，**如果把** `ITEMS.register(modBus)` **漏写或写错成** `ITEMS.register(NeoForge.EVENT_BUS)`，**进游戏后会发生什么**？请结合注册表生命周期解释原因。

2. 以下代码片段会在**物理服务器启动时崩溃**，请指出具体哪一行触发了什么异常，并给出两种修复方案：  
```java:line-numbers
   @SubscribeEvent
   public static void onPlayerJoin(PlayerEvent.PlayerLoggedInEvent e) {
    // [!code focus:2]
    Minecraft mc = Minecraft.getInstance();
    mc.player.sendSystemMessage(Component.literal("Hi"));
   }
```

3. 我们都知道，***Fabric* 和 *Neo Forge/Forge* 的逻辑处理其实是相通的，但在细节上有所不同**，下面是一段 [Fabric Wiki 使用 Fabric 监听事件的示例](https://wiki.fabricmc.net/zh_cn:tutorial:callbacks)代码，试试**根据注释转化成 *Neo Forge*** `IEventBus#addListener` **代码**：
```java
public class ExampleMod implements ModInitializer {
	// 这个方法相当于模组总线
    @Override
    public void onInitialize() {
    // 注册 AttackBlockCallback 事件（Neoforge 为 PlayerInteractEvent.LeftClickBlock，参数基本上可以通用）
    AttackBlockCallback.EVENT.register((player, world, hand, pos, direction) -> {
	    BlockState state = world.getBlockState(pos);
		    if (state.isToolRequired() && !player.isSpectator() && player.getMainHandStack().isEmpty()) {
			    player.damage(DamageSource.field_5869, 1.0F);
		    }
	    return ActionResult.PASS;
		});
	}
}
```