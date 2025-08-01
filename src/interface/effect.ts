import { TimelineEngine } from "../engine/engine";
import { TimelineAction } from "./action";

export interface TimelineEffect {
  /** Effect ID */
  id: string, 
  /** Effect name */
  name?: string, 
  /** Effect runtime code */
  source?: TimeLineEffectSource,
}

export interface EffectSourceParam {
  /** Current time */
  time: number,
  /** Whether running */
  isPlaying: boolean,
  /** Action */
  action: TimelineAction,
  /** Action effect */
  effect: TimelineEffect,
  /** Runtime engine */
  engine: TimelineEngine,
}

/**
 * Effect execution callback
 * @export
 * @interface TimeLineEffectSource
 */
export interface TimeLineEffectSource {
  /** Callback when playback starts in current action time range */
  start?: (param: EffectSourceParam) => void;
  /** Callback executed when time enters action */
  enter?: (param: EffectSourceParam) => void;
  /** Callback when action updates */
  update?: (param: EffectSourceParam) => void;
  /** Callback executed when time leaves action */
  leave?: (param: EffectSourceParam) => void;
  /** Callback when playback stops in current action time range */
  stop?: (param: EffectSourceParam) => void;
}