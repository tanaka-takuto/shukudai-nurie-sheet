import {
  PencilIcon,
  BookOpenIcon,
  DocumentTextIcon,
  CalculatorIcon,
  PlusIcon,
  BeakerIcon,
  SparklesIcon,
  PaintBrushIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

export interface HomeworkPreset {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  type: 'fixed' | 'repeating';
  points?: number;
  pointsPerUnit?: number;
  units?: number;
  unitName?: string;
  category: string;
}

export const HOMEWORK_PRESETS: HomeworkPreset[] = [
  // 国語・算数
  {
    id: 'kanji',
    name: '漢字ドリル',
    icon: PencilIcon,
    description: '1ページずつコツコツと',
    type: 'repeating',
    pointsPerUnit: 1,
    units: 15,
    unitName: 'ページ',
    category: '国語・算数',
  },
  {
    id: 'reading',
    name: '読書感想文',
    icon: BookOpenIcon,
    description: '本を読んで感想を書こう',
    type: 'fixed',
    points: 10,
    category: '国語・算数',
  },
  {
    id: 'diary',
    name: '日記',
    icon: DocumentTextIcon,
    description: '毎日の出来事を記録',
    type: 'repeating',
    pointsPerUnit: 1,
    units: 20,
    unitName: '日',
    category: '国語・算数',
  },
  {
    id: 'math',
    name: '算数ドリル',
    icon: CalculatorIcon,
    description: '計算力アップ！',
    type: 'repeating',
    pointsPerUnit: 1,
    units: 15,
    unitName: 'ページ',
    category: '国語・算数',
  },
  {
    id: 'calculation',
    name: '計算問題集',
    icon: PlusIcon,
    description: '応用問題にチャレンジ',
    type: 'repeating',
    pointsPerUnit: 1,
    units: 10,
    unitName: 'ページ',
    category: '国語・算数',
  },

  // 理科・社会
  {
    id: 'research',
    name: '自由研究',
    icon: BeakerIcon,
    description: '興味のあることを調べよう',
    type: 'fixed',
    points: 20,
    category: '理科・社会',
  },
  {
    id: 'observation',
    name: '観察日記',
    icon: SparklesIcon,
    description: '植物や虫を観察',
    type: 'repeating',
    pointsPerUnit: 1,
    units: 10,
    unitName: '日',
    category: '理科・社会',
  },

  // 自由研究・図工
  {
    id: 'art',
    name: '絵画・ポスター',
    icon: PaintBrushIcon,
    description: 'コンクール作品など',
    type: 'fixed',
    points: 8,
    category: '自由研究・図工',
  },
  {
    id: 'craft',
    name: '工作',
    icon: WrenchScrewdriverIcon,
    description: '夏休み工作',
    type: 'fixed',
    points: 12,
    category: '自由研究・図工',
  },
  {
    id: 'calligraphy',
    name: '習字',
    icon: PaintBrushIcon,
    description: '書道の宿題',
    type: 'fixed',
    points: 5,
    category: '自由研究・図工',
  },
];