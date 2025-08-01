---
title: API
group: 
  title: Engine
---

## Engine API

### isPlaying

`boolean` Whether the engine is currently running

### isPaused

`boolean` Whether the engine is stopped

### effects

*setter*  <code>Record<string,<a href="/data#timelineeffect">TimelineEffect</a>></code> Runtime effects

### data

*setter*  <code><a href="/data#timelinerow">TimelineRow</a>[]</code> Runtime data

### setPlayRate

`(rate: number) => void` Set playback rate

### getPlayRate

`() => number` Get playback rate

### setTime

`(time: number) => void` Set playback time

### getTime

`() => number` Get playback time

### reRender

`() => void` Re-render current time

### play

`(param: {toTime?: number; autoEnd?: boolean}) => boolean` 

Start playing from current time (can be set via `setTime`), returns whether playback started successfully
+ toTime (optional): Playback end time 
+ autoEnd (optional): Whether to auto stop after playing all actions

```ts | pure
import { TimelineEngine } from '@xzdarcy/react-timeline-editor';
const engine = new TimelineEngine();
engine.play({autoEnd: true})
```

### pause

`() => void` Pause

### listener

You can listen to some events provided by the engine and respond with logic

```ts | pure
import { TimelineEngine } from '@xzdarcy/react-timeline-editor';
const engine = new TimelineEngine();
```

+ `setTimeByTick`: Time changes caused by engine tick
```ts | pure
engine.on('setTimeByTick', ({time, engine}) => {...})
```

+ `beforeSetTime`: Before setting time (manual) (can prevent setting by `return false`)
```ts | pure
engine.on('beforeSetTime', ({time, engine}) => {...})
```

+ `afterSetTime`: After setting time (manual)
```ts | pure
engine.on('afterSetTime', ({time, engine}) => {...})
```

+ `beforeSetPlayRate`: Before setting playback rate (can prevent setting by `return false`)
```ts | pure
engine.on('beforeSetPlayRate', ({rate, engine}) => {...})
```

+ `afterSetPlayRate`: After setting playback rate
```ts | pure
engine.on('afterSetPlayRate', ({rate, engine}) => {...})

```

+ `play`: Listen to play events
```ts | pure
engine.on('play', ({engine}) => {...})
```

+ `paused`: Listen to pause events
```ts | pure
engine.on('paused', ({engine}) => {...})
```

+ `ended`: Listen to playback completion events
```ts | pure
engine.on('ended', ({engine}) => {...})
```
