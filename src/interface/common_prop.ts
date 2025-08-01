import { EditData } from "./timeline";

/** Common component props */
export interface CommonProp extends EditData {
  /** Scale count */
  scaleCount: number;
  /** Set scale count */
  setScaleCount: (scaleCount: number) => void;
  /** Cursor time */
  cursorTime: number;
  /** Current timeline width */
  timelineWidth: number;
}
