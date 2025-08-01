import { TimelineAction, TimelineRow } from '../interface/action';
import { TimelineEffect } from '../interface/effect';
import { Emitter } from './emitter';
import { Events, EventTypes } from './events';

const PLAYING = 'playing';
const PAUSED = 'paused';
type PlayState = 'playing' | 'paused';

export interface ITimelineEngine extends Emitter<EventTypes> {
  readonly isPlaying: boolean;
  readonly isPaused: boolean;
  effects: Record<string, TimelineEffect>;
  data: TimelineRow[];
  /** Set play rate */
  setPlayRate(rate: number): boolean;
  /** Get play rate */
  getPlayRate(): number;
  /** Re-render current time */
  reRender(): void;
  /** Set play time */
  setTime(time: number, isTick?: boolean): boolean;
  /** Get play time */
  getTime(): number;
  /** Play */
  play(param: {
    /** Default play from start to end, priority higher than autoEnd */
    toTime?: number;
    /** Whether to auto end after playback completes */
    autoEnd?: boolean;
  }): boolean;
  /** Pause */
  pause(): void;
}

/**
 * Timeline player
 * Can run independently from the editor
 * @export
 * @class TimelineEngine
 * @extends {Emitter<EventTypes>}
 */
export class TimelineEngine extends Emitter<EventTypes> implements ITimelineEngine {
  constructor() {
    super(new Events());
  }

  /** requestAnimationFrame timerId */
  private _timerId: number;

  /** Play rate */
  private _playRate = 1;
  /** Current time */
  private _currentTime: number = 0;
  /** Play state */
  private _playState: PlayState = 'paused';
  /** Previous timestamp data */
  private _prev: number;

  /** Action effects map */
  private _effectMap: Record<string, TimelineEffect> = {};
  /** Actions to run map */
  private _actionMap: Record<string, TimelineAction> = {};
  /** Action IDs array sorted by action start time in ascending order */
  private _actionSortIds: string[] = [];

  /** Current traversed action index */
  private _next: number = 0;
  /** List of actionIds whose time range contains current time */
  private _activeActionIds: string[] = [];

  /** Whether currently playing */
  get isPlaying() {
    return this._playState === 'playing';
  }
  /** Whether paused */
  get isPaused() {
    return this._playState === 'paused';
  }

  set effects(effects: Record<string, TimelineEffect>) {
    this._effectMap = effects;
  }
  set data(data: TimelineRow[]) {
    if (this.isPlaying) this.pause();
    this._dealData(data);
    this._dealClear();
    this._dealEnter(this._currentTime);
  }

  /**
   * Set play rate
   * @memberof TimelineEngine
   */
  setPlayRate(rate: number): boolean {
    if (rate <= 0) {
      console.error('Error: rate cannot be less than 0!');
      return;
    }
    const result = this.trigger('beforeSetPlayRate', { rate, engine: this });
    if (!result) return false;
    this._playRate = rate;
    this.trigger('afterSetPlayRate', { rate, engine: this });

    return true;
  }
  /**
   * Get play rate
   * @memberof TimelineEngine
   */
  getPlayRate() {
    return this._playRate;
  }

  /**
   * Re-render current time
   * @return {*}
   * @memberof TimelineEngine
   */
  reRender() {
    if (this.isPlaying) return;
    this._tickAction(this._currentTime);
  }

  /**
   * Set play time
   * @param {number} time
   * @param {boolean} [isTick] Whether triggered by tick
   * @memberof TimelineEngine
   */
  setTime(time: number, isTick?: boolean): boolean {
    const result = isTick || this.trigger('beforeSetTime', { time, engine: this });
    if (!result) return false;

    this._currentTime = time;

    this._next = 0;
    this._dealLeave(time);
    this._dealEnter(time);

    if (isTick) this.trigger('setTimeByTick', { time, engine: this });
    else this.trigger('afterSetTime', { time, engine: this });
    return true;
  }
  /**
   * Get current time
   * @return {*}  {number}
   * @memberof TimelineEngine
   */
  getTime(): number {
    return this._currentTime;
  }

  /**
   * Play: start time is current time
   * @param param
   * @return {boolean} {boolean}
   */
  play(param: {
    /** Default play from start to end, priority higher than autoEnd */
    toTime?: number;
    /** Whether to auto end after playback completes */
    autoEnd?: boolean;
  }): boolean {
    const { toTime, autoEnd } = param;

    const currentTime = this.getTime();
    /** If currently playing or end time is less than start time, return directly */
    if (this.isPlaying || (toTime && toTime <= currentTime)) return false;

    // Set play state
    this._playState = PLAYING;

    // activeIds start
    this._startOrStop('start');

    // Trigger event
    this.trigger('play', { engine: this });

    this._timerId = requestAnimationFrame((time: number) => {
      this._prev = time;
      this._tick({ now: time, autoEnd, to: toTime });
    });
    return true;
  }

  /**
   * Pause playback
   * @memberof TimelineEngine
   */
  pause() {
    if (this.isPlaying) {
      this._playState = PAUSED;
      // activeIds stop
      this._startOrStop('stop');

      this.trigger('paused', { engine: this });
    }
    cancelAnimationFrame(this._timerId);
  }

  /** Playback completed */
  private _end() {
    this.pause();
    this.trigger('ended', { engine: this });
  }

  private _startOrStop(type?: 'start' | 'stop') {
    for (let i = 0; i < this._activeActionIds.length; i++) {
      const actionId = this._activeActionIds[i];
      const action = this._actionMap[actionId];
      const effect = this._effectMap[action?.effectId];

      if (type === 'start') {
        effect?.source?.start && effect.source.start({ action, effect, engine: this, isPlaying: this.isPlaying, time: this.getTime() });
      } else if (type === 'stop') {
        effect?.source?.stop && effect.source.stop({ action, effect, engine: this, isPlaying: this.isPlaying, time: this.getTime() });
      }
    }
  }

  /** Execute each frame */
  private _tick(data: { now: number; autoEnd?: boolean; to?: number }) {
    if (this.isPaused) return;
    const { now, autoEnd, to } = data;

    // Calculate current time
    let currentTime = this.getTime() + (Math.min(1000, now - this._prev) / 1000) * this._playRate;
    this._prev = now;

    // Set current time
    if (to && to <= currentTime) currentTime = to;
    this.setTime(currentTime, true);

    // Execute actions
    this._tickAction(currentTime);
    // In auto stop mode, check if all actions are completed
    if (!to && autoEnd && this._next >= this._actionSortIds.length && this._activeActionIds.length === 0) {
      this._end();
      return;
    }

    // Check if should terminate
    if (to && to <= currentTime) {
      this._end();
    }

    if (this.isPaused) return;
    this._timerId = requestAnimationFrame((time) => {
      this._tick({ now: time, autoEnd, to });
    });
  }

  /** Tick run actions */
  private _tickAction(time: number) {
    this._dealEnter(time);
    this._dealLeave(time);

    // render
    const length = this._activeActionIds.length;
    for (let i = 0; i < length; i++) {
      const actionId = this._activeActionIds[i];
      const action = this._actionMap[actionId];
      const effect = this._effectMap[action.effectId];
      if (effect && effect.source?.update) {
        effect.source.update({ time, action, isPlaying: this.isPlaying, effect, engine: this });
      }
    }
  }

  /** Reset active data */
  private _dealClear() {
    while (this._activeActionIds.length) {
      const actionId = this._activeActionIds.shift();
      const action = this._actionMap[actionId];

      const effect = this._effectMap[action?.effectId];
      if (effect?.source?.leave) {
        effect.source.leave({ action, effect, engine: this, isPlaying: this.isPlaying, time: this.getTime() });
      }
    }
    this._next = 0;
  }

  /** Handle action time enter */
  private _dealEnter(time: number) {
    // add to active
    while (this._actionSortIds[this._next]) {
      const actionId = this._actionSortIds[this._next];
      const action = this._actionMap[actionId];

      if (!action.disable) {
        // Check if action start time is reached

        if (action.start > time) break;
        // Action can start executing
        if (action.end > time && !this._activeActionIds.includes(actionId)) {
          const effect = this._effectMap[action.effectId];
          if (effect && effect.source?.enter) {
            effect.source.enter({ action, effect, isPlaying: this.isPlaying, time, engine: this });
          }

          this._activeActionIds.push(actionId);
        }
      }
      this._next++;
    }
  }

  /** Handle action time leave */
  private _dealLeave(time: number) {
    let i = 0;
    while (this._activeActionIds[i]) {
      const actionId = this._activeActionIds[i];
      const action = this._actionMap[actionId];

      // Not in the playback area
      if (action.start > time || action.end < time) {
        const effect = this._effectMap[action.effectId];

        if (effect && effect.source?.leave) {
          effect.source.leave({ action, effect, isPlaying: this.isPlaying, time, engine: this });
        }

        this._activeActionIds.splice(i, 1);
        continue;
      }
      i++;
    }
  }

  /** Process data */
  private _dealData(data: TimelineRow[]) {
    const actions: TimelineAction[] = [];
    data.map((row) => {
      actions.push(...row.actions);
    });
    const sortActions = actions.sort((a, b) => a.start - b.start);
    const actionMap: Record<string, TimelineAction> = {};
    const actionSortIds: string[] = [];

    sortActions.forEach((action) => {
      actionSortIds.push(action.id);
      actionMap[action.id] = { ...action };
    });
    this._actionMap = actionMap;
    this._actionSortIds = actionSortIds;
  }
}
