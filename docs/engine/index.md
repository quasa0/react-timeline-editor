---
title: Introduction
toc: 'menu'
group: 
  title: Engine
---

## Engine

We provide an engine decoupled from the editor for running data produced by the editor.

You can implement your own runtime system by defining the runtime capabilities (audio playback, animation playback, etc.) in each <code><a href="/data#timelineeffect">TimelineEffect</a></code>.

+ 🛠 Provides capabilities such as setting time, setting playback rate, etc.
+ ⚙️ Can be used independently


## Examples

You can use the engine in the following two scenarios:

### Runtime During Editing
> The editor has a built-in engine and provides <code><a href="/data#timelinestate">TimelineState</a></code> for more convenient engine control.
> 
> We don't provide default engine styles, you need to customize the styles
> 
> You can easily get runtime data changes through listeners to customize your own engine styles

<code src="./engine-basic/index.tsx"></code>

### Standalone Usage

> You can also use the engine anywhere to run data produced by the editor
> 
> This is very useful when you want to share the same data and runtime capabilities between <b style="color: #a87654">editing time</b> and <b style="color: #a87654">runtime</b>

<code src="./engine-standalone/index.tsx"></code>
