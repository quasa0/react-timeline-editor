---
title: Data Definitions
toc: 'menu'
---

## TimelineRow

> Editor data: Row data structure

<table>
  <thead>
    <tr>
      <th>Property Name</th>
      <th>Description</th>
      <th>Type</th>
      <th>Default Value</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
    <tr>
      <td>id</td>
      <td>Action row ID</td>
      <td>
        <code>string</code>
      </td>
      <td>
        <code>(Required)</code>
      </td>
    </tr>
    <tr>
      <td>actions</td>
      <td>List of actions in the row</td>
      <td>
        <code><a href="/data#timelineaction">TimelineAction</a>[]</code>
      </td>
      <td>
        <code>(Required)</code>
      </td>
    </tr>
    <tr>
      <td>rowHeight</td>
      <td>Custom row height (default determined by rowHeight in props)</td>
      <td>
        <code>number</code>
      </td>
      <td>
        <code>--</code>
      </td>
    </tr>
    <tr>
      <td>selected</td>
      <td>Whether the row is selected</td>
      <td>
        <code>boolean</code>
      </td>
      <td>
        <code>false</code>
      </td>
    </tr>
    <tr>
      <td>classNames</td>
      <td>Extended class names for the row</td>
      <td>
        <code>string[]</code>
      </td>
      <td>
        <code>--</code>
      </td>
    </tr>
</table>


## TimelineAction

> Editor data: Action data structure

<table>
  <thead>
    <tr>
      <th>Property Name</th>
      <th>Description</th>
      <th>Type</th>
      <th>Default Value</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
    <tr>
      <td>id</td>
      <td>Action ID</td>
      <td>
        <code>string</code>
      </td>
      <td>
        <code>(Required)</code>
      </td>
    </tr>
    <tr>
      <td>start</td>
      <td>Action start time</td>
      <td>
        <code>number</code>
      </td>
      <td>
        <code>(Required)</code>
      </td>
    </tr>
    <tr>
      <td>end</td>
      <td>Action end time</td>
      <td>
        <code>number</code>
      </td>
      <td>
        <code>(Required)</code>
      </td>
    </tr>
    <tr>
      <td>effectId</td>
      <td>Effect ID index corresponding to the action</td>
      <td>
        <code>string</code>
      </td>
      <td>
        <code>(Required)</code>
      </td>
    </tr>
    <tr>
      <td>selected</td>
      <td>Whether the action is selected</td>
      <td>
        <code>boolean</code>
      </td>
      <td>
        <code>false</code>
      </td>
    </tr>
    <tr>
      <td>flexible</td>
      <td>Whether the action is resizable</td>
      <td>
        <code>boolean</code>
      </td>
      <td>
        <code>true</code>
      </td>
    </tr>
    <tr>
      <td>movable</td>
      <td>Whether the action is movable</td>
      <td>
        <code>boolean</code>
      </td>
      <td>
        <code>true</code>
      </td>
    </tr>
    <tr>
      <td>disable</td>
      <td>Disable action execution</td>
      <td>
        <code>boolean</code>
      </td>
      <td>
        <code>false</code>
      </td>
    </tr>
    <tr>
      <td>minStart</td>
      <td>Minimum start time limit for action</td>
      <td>
        <code>number</code>
      </td>
      <td>
        <code>0</code>
      </td>
    </tr>
    <tr>
      <td>maxEnd</td>
      <td>Maximum end time limit for action</td>
      <td>
        <code>number</code>
      </td>
      <td>
        <code>Number.MAX_VALUE</code>
      </td>
    </tr>
</table>

## TimelineEffect

> Editor runtime effect data structure

<table>
  <thead>
    <tr>
      <th>Property Name</th>
      <th>Description</th>
      <th>Type</th>
      <th>Default Value</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
    <tr>
      <td>id</td>
      <td>Effect ID</td>
      <td>
        <code>string</code>
      </td>
      <td>
        <code>(Required)</code>
      </td>
    </tr>
     <tr>
      <td>name</td>
      <td>Effect name</td>
      <td>
        <code>string</code>
      </td>
      <td>
        <code>--</code>
      </td>
    </tr>
     <tr>
      <td>source</td>
      <td>Effect runtime code</td>
      <td>
        <code>TimeLineEffectSource</code>
      </td>
      <td>
        <code>--</code>
      </td>
    </tr>
</table>

### TimeLineEffectSource 

> Editor effect runtime code data structure

+ start trigger condition
  + Triggered when engine starts playing and time is within current action time range
+ enter trigger condition
  + Entering current action time range from non-action time area
+ update trigger condition
  + Triggered every frame when playing current action (including reRender)
  + Triggered during reRender
+ leave trigger condition
  + Leaving current action time range
+ stop trigger condition
  + Triggered when engine pauses and time is within current action time range

<table>
  <thead>
    <tr>
      <th>Property Name</th>
      <th>Description</th>
      <th>Type</th>
      <th>Default Value</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
    <tr>
      <td>start</td>
      <td>Callback when playback starts in current action time range</td>
      <td>
        <code>(param: EffectSourceParam) => void</code>
      </td>
      <td>
        <code>--</code>
      </td>
    </tr>
     <tr>
      <td>enter</td>
      <td>Callback executed when time enters action</td>
      <td>
        <code>(param: EffectSourceParam) => void</code>
      </td>
      <td>
        <code>--</code>
      </td>
    </tr>
     <tr>
      <td>update</td>
      <td>Callback when action updates</td>
      <td>
        <code>(param: EffectSourceParam) => void</code>
      </td>
      <td>
        <code>--</code>
      </td>
    </tr>
     <tr>
      <td>leave</td>
      <td>Callback executed when time leaves action</td>
      <td>
        <code>(param: EffectSourceParam) => void</code>
      </td>
      <td>
        <code>--</code>
      </td>
    </tr>
     <tr>
      <td>stop</td>
      <td>Callback when playback stops in current action time range</td>
      <td>
        <code>(param: EffectSourceParam) => void</code>
      </td>
      <td>
        <code>--</code>
      </td>
    </tr>
</table>

### EffectSourceParam

> Editor effect runtime code parameters

<table>
  <thead>
    <tr>
      <th>Property Name</th>
      <th>Description</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
    <tr>
      <td>time</td>
      <td>Current playback time</td>
      <td>
        <code>number</code>
      </td>
    </tr>
    <tr>
      <td>isPlaying</td>
      <td>Whether currently playing</td>
      <td>
        <code>boolean</code>
      </td>
    </tr>
     <tr>
      <td>action</td>
      <td>Action</td>
      <td>
        <code><a href="/data#timelineaction">TimelineAction</a></code>
      </td>
    </tr>
     <tr>
      <td>effect</td>
      <td>Action effect</td>
      <td>
        <code><a href="/data#timelineeffect">TimelineEffect</a></code>
      </td>
    </tr>
     <tr>
      <td>engine</td>
      <td>Engine</td>
      <td>
        <code>TimelineEngine</code>
      </td>
    </tr>
</table>

## TimelineState

> Timeline component data

<table>
  <thead>
    <tr>
      <th>Property Name</th>
      <th>Description</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
    <tr>
      <td>target</td>
      <td>DOM node that timeline belongs to</td>
      <td>
        <code>HTMLElement</code>
      </td>
    </tr>
     <tr>
      <td>listener</td>
      <td>Runtime listener</td>
      <td>
        <code>Emitter</code>
      </td>
    </tr>
     <tr>
      <td>isPlaying</td>
      <td>Whether currently playing</td>
      <td>
        <code>boolean</code>
      </td>
    </tr>
     <tr>
      <td>isPaused</td>
      <td>Whether paused</td>
      <td>
        <code>boolean</code>
      </td>
    </tr>
     <tr>
      <td>setTime</td>
      <td>Set current playback time</td>
      <td>
        <code>(time: number) => void</code>
      </td>
    </tr>
     <tr>
      <td>getTime</td>
      <td>Get current playback time</td>
      <td>
        <code>() => number</code>
      </td>
    </tr>
     <tr>
      <td>setPlayRate</td>
      <td>Set playback rate</td>
      <td>
        <code>(rate: number) => void</code>
      </td>
    </tr>
     <tr>
      <td>getPlayRate</td>
      <td>Get playback rate</td>
      <td>
        <code>() => number</code>
      </td>
    </tr>
     <tr>
      <td>reRender</td>
      <td>Re-render current time</td>
      <td>
        <code>() => void</code>
      </td>
    </tr>
     <tr>
      <td>play</td>
      <td>Play</td>
      <td>
        <code>(param: { toTime?: number; autoEnd?: boolean; }) => boolean</code>
      </td>
    </tr>
     <tr>
      <td>pause</td>
      <td>Pause</td>
      <td>
        <code>() => void</code>
      </td>
    </tr>
     <tr>
      <td>setScrollLeft</td>
      <td>Set scroll left</td>
      <td>
        <code>(val: number) => void</code>
      </td>
    </tr>
     <tr>
      <td>setScrollTop</td>
      <td>Set scroll top</td>
      <td>
        <code>(val: number) => void</code>
      </td>
    </tr>
</table>



