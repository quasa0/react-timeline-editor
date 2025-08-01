import { TimelineEngine } from "./engine";

export class Events {
  handlers = {};

  constructor(handlers = {}) {
    this.handlers = {
      beforeSetTime: [],
      afterSetTime: [],
      setTimeByTick: [],
      beforeSetPlayRate: [],
      afterSetPlayRate: [],
      setActiveActionIds: [],
      play: [],
      paused: [],
      ended: [],
      ...handlers,
    };
  }
}

export interface EventTypes {
  /**
   * Before setting time (manual)
   * @type {{ time: number, engine: TimelineEngine }}
   * @memberof EventTypes
   */
  beforeSetTime: { time: number; engine: TimelineEngine };
  /**
   * After setting time (manual)
   * @type {{ time: number, engine: TimelineEngine }}
   * @memberof EventTypes
   */
  afterSetTime: { time: number; engine: TimelineEngine };
  /**
   * After setting time by tick
   * @type {{ time: number, engine: TimelineEngine }}
   * @memberof EventTypes
   */
  setTimeByTick: { time: number; engine: TimelineEngine };
  /**
   * Before setting play rate
   * return false will prevent setting rate
   * @type {{ speed: number, engine: TimelineEngine }}
   * @memberof EventTypes
   */
  beforeSetPlayRate: { rate: number; engine: TimelineEngine };
  /**
   * After setting play rate
   * @type {{ speed: number, engine: TimelineEngine }}
   * @memberof EventTypes
   */
  afterSetPlayRate: { rate: number; engine: TimelineEngine };
  /**
   * Play
   * @type {{engine: TimelineEngine}}
   * @memberof EventTypes
   */
  play: { engine: TimelineEngine };
  /**
   * Pause
   * @type {{ engine: TimelineEngine }}
   * @memberof EventTypes
   */
  paused: { engine: TimelineEngine };
  /**
   * Play ended
   * @type {{ engine: TimelineEngine }}
   * @memberof EventTypes
   */
  ended: { engine: TimelineEngine };
}
