---
title: Introduction
toc: 'menu'
---


## react timeline editor

`react-timeline-editor` is a React-based component for quickly building timeline editing capabilities.

It can be mainly used to build animation editors, video editors, etc.

![timeline](/assets/timeline.gif)


## ✨ Features

- 🛠 Supports drag and zoom modes, and provides convenient control hooks.
- 🔗 Provides grid snapping and auxiliary line snapping interactive capabilities.
- 🏷 Automatically recognizes action length and provides infinite scrolling.
- 🎨 Quick and convenient style customization.
- 📡 Provides strongly decoupled engine capability that can run independently from the editor.

## Quick Start

```
npm install @xzdarcy/react-timeline-editor
```

```tsx | pure
import React from 'react';
import { Timeline } from '@xzdarcy/react-timeline-editor';

export const TimelineEditor = () => {
  return (
    <Timeline     
      editorData={[]}
      effects={{}}
    />
  )
}
```

## Props
<API hideTitle src="../src/components/timeline.tsx"></API>

