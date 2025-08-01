import React, { ReactNode } from 'react';
import { OnScrollParams } from 'react-virtualized';
import { ITimelineEngine } from '..';
import { Emitter } from '../engine/emitter';
import { EventTypes } from '../engine/events';
import { TimelineAction, TimelineRow } from './action';
import { TimelineEffect } from './effect';
export * from './action';
export * from './effect';

export interface EditData {
  /**
   * @description Timeline editing data
   */
  editorData: TimelineRow[];
  /**
   * @description Timeline action effects map
   */
  effects: Record<string, TimelineEffect>;
  /**
   * @description Single scale mark range (>0)
   * @default 1
   */
  scale?: number;
  /**
   * @description Minimum scale count (>=1)
   * @default 20
   */
  minScaleCount?: number;
  /**
   * @description Maximum scale count (>=minScaleCount)
   * @default Infinity
   */
  maxScaleCount?: number;
  /**
   * @description Number of subdivision units per scale (>0 integer)
   * @default 10
   */
  scaleSplitCount?: number;
  /**
   * @description Display width of single scale (>0, unit: px)
   * @default 160
   */
  scaleWidth?: number;
  /**
   * @description Distance from left side where scale starts (>=0, unit: px)
   * @default 20
   */
  startLeft?: number;
  /**
   * @description Default height of each editing row (>0, unit: px)
   * @default 32
   */
  rowHeight?: number;
  /**
   * @description Whether to enable grid movement snapping
   * @default false
   */
  gridSnap?: boolean;
  /**
   * @description Enable drag assist line snapping
   * @default false
   */
  dragLine?: boolean;
  /**
   * @description Whether to hide cursor
   * @default false
   */
  hideCursor?: boolean;
  /**
   * @description Disable all action area dragging
   * @default false
   */
  disableDrag?: boolean;
  /**
   * @description Timeline engine, uses built-in engine if not provided
   */
  engine?: ITimelineEngine;
  /**
   * @description Custom action area rendering
   */
  getActionRender?: (action: TimelineAction, row: TimelineRow) => ReactNode;
  /**
   * @description Custom scale rendering
   */
  getScaleRender?: (scale: number) => ReactNode;
  /**
   * @description Start move callback
   */
  onActionMoveStart?: (params: { action: TimelineAction; row: TimelineRow }) => void;
  /**
   * @description Move callback (return false can prevent movement)
   */
  onActionMoving?: (params: { action: TimelineAction; row: TimelineRow; start: number; end: number }) => void | boolean;
  /**
   * @description Move end callback (return false can prevent onChange trigger)
   */
  onActionMoveEnd?: (params: { action: TimelineAction; row: TimelineRow; start: number; end: number }) => void;
  /**
   * @description Start resize callback
   */
  onActionResizeStart?: (params: { action: TimelineAction; row: TimelineRow; dir: 'right' | 'left' }) => void;
  /**
   * @description Resize callback (return false can prevent resizing)
   */
  onActionResizing?: (params: { action: TimelineAction; row: TimelineRow; start: number; end: number; dir: 'right' | 'left' }) => void | boolean;
  /**
   * @description Resize end callback (return false can prevent onChange trigger)
   */
  onActionResizeEnd?: (params: { action: TimelineAction; row: TimelineRow; start: number; end: number; dir: 'right' | 'left' }) => void;
  /**
   * @description Click row callback
   */
  onClickRow?: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    param: {
      row: TimelineRow;
      time: number;
    },
  ) => void;
  /**
   * @description Click action callback
   */
  onClickAction?: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    param: {
      action: TimelineAction;
      row: TimelineRow;
      time: number;
    },
  ) => void;
  /**
   * @description Click action callback (not executed when drag is triggered)
   */
  onClickActionOnly?: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    param: {
      action: TimelineAction;
      row: TimelineRow;
      time: number;
    },
  ) => void;
  /**
   * @description Double click row callback
   */
  onDoubleClickRow?: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    param: {
      row: TimelineRow;
      time: number;
    },
  ) => void;
  /**
   * @description Double click action callback
   */
  onDoubleClickAction?: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    param: {
      action: TimelineAction;
      row: TimelineRow;
      time: number;
    },
  ) => void;
  /**
   * @description Right click row callback
   */
  onContextMenuRow?: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    param: {
      row: TimelineRow;
      time: number;
    },
  ) => void;
  /**
   * @description Right click action callback
   */
  onContextMenuAction?: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    param: {
      action: TimelineAction;
      row: TimelineRow;
      time: number;
    },
  ) => void;
  /**
   * @description Get action id list for assist drag lines, calculated at move/resize start, defaults to all except current moving action
   */
  getAssistDragLineActionIds?: (params: { action: TimelineAction; editorData: TimelineRow[]; row: TimelineRow }) => string[];
  /**
   * @description Cursor start drag event
   */
  onCursorDragStart?: (time: number) => void;
  /**
   * @description Cursor end drag event
   */
  onCursorDragEnd?: (time: number) => void;
  /**
   * @description Cursor drag event
   */
  onCursorDrag?: (time: number) => void;
  /**
   * @description Click time area event, returning false prevents setting time
   */
  onClickTimeArea?: (time: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => boolean | undefined;
}

export interface TimelineState {
  /** DOM node */
  target: HTMLElement;
  /** Runtime listener */
  listener: Emitter<EventTypes>;
  /** Whether currently playing */
  isPlaying: boolean;
  /** Whether paused */
  isPaused: boolean;
  /** Set current play time */
  setTime: (time: number) => void;
  /** Get current play time */
  getTime: () => number;
  /** Set play rate */
  setPlayRate: (rate: number) => void;
  /** Get play rate */
  getPlayRate: () => number;
  /** Re-render current time */
  reRender: () => void;
  /** Play */
  play: (param: {
    /** Default play from start to end, priority higher than autoEnd */
    toTime?: number;
    /** Whether to auto end after playback completes */
    autoEnd?: boolean;
    /** List of actionIds to run, defaults to all if not provided */
    runActionIds?: string[];
  }) => boolean;
  /** Pause */
  pause: () => void;
  /** Set scroll left */
  setScrollLeft: (val: number) => void;
  /** Set scroll top */
  setScrollTop: (val: number) => void;
}

/**
 * Animation editor parameters
 * @export
 * @interface TimelineProp
 */
export interface TimelineEditor extends EditData {
  /**
   * @description Edit area scroll distance from top (please use ref.setScrollTop instead)
   * @deprecated
   */
  scrollTop?: number;
  /**
   * @description Edit area scroll callback (used to control sync with edit row scrolling)
   */
  onScroll?: (params: OnScrollParams) => void;
  /**
   * @description Whether to enable auto scroll when dragging
   * @default false
   */
  autoScroll?: boolean;
  /**
   * @description Custom timeline styles
   */
  style?: React.CSSProperties;
  /**
   * @description Whether to auto re-render (update tick when data changes or cursor time changes)
   * @default true
   */
  autoReRender?: boolean;
  /**
   * @description Data change callback, triggered after action end changes data (returning false prevents auto engine sync, used to reduce performance overhead)
   */
  onChange?: (editorData: TimelineRow[]) => void | boolean;
}
