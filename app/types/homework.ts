export interface VacationPeriod {
  startDate: Date;
  endDate: Date;
}

export type HomeworkType = 'fixed' | 'repeating';

export interface BaseHomework {
  id: string;
  name: string;
  type: HomeworkType;
}

export interface FixedHomework extends BaseHomework {
  type: 'fixed';
  points: number;
}

export interface RepeatingHomework extends BaseHomework {
  type: 'repeating';
  pointsPerUnit: number;
  units: number;
  unitName: string; // e.g., "ページ", "問題"
}

export type Homework = FixedHomework | RepeatingHomework;

export interface GuidelineSettings {
  showIdealLine: boolean;
  showLastMinuteLine: boolean;
  idealDaysBeforeEnd: number; // 理想線を終了日の何日前に設定するか
}

export interface PrintData {
  vacationPeriod: VacationPeriod | null;
  homeworks: Homework[];
  guidelineSettings: GuidelineSettings;
}
