export type BuildStatus = 'Built' | 'Prototype' | 'Planned' | 'External/Open-Source';

export type MGLabsApp = {
  id: string;
  name: string;
  category: string;
  description: string;
  status: BuildStatus;
  route?: string;
  icon?: string;
  features?: string[];
};

export type GameEntry = {
  id: string;
  name: string;
  category: string;
  description: string;
  status: BuildStatus;
  developer: string;
  sourceUrl?: string;
  playUrl?: string;
  license?: string;
  controls?: string[];
  touch?: boolean;
  controller?: boolean;
  fullscreen?: boolean;
  tags?: string[];
};

export type Achievement = {
  id: string;
  name: string;
  description: string;
  target: number;
  key: string;
};
