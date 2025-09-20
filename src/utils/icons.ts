import {
  Zap,
  Activity,
  Bike,
  Waves,
  Footprints,
  Dumbbell,
  Heart,
  Users,
  Target,
  Timer,
  Mountain
} from 'lucide-react';

const iconMap = {
  running: Zap,
  jogging: Activity,
  pushups: Dumbbell,
  cycling: Bike,
  swimming: Waves,
  walking: Footprints,
  weightlifting: Dumbbell,
  yoga: Heart,
  jumpingjacks: Users,
  burpees: Target,
  plank: Timer,
  squats: Mountain
};

export const getActivityIcon = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap] || Activity;
};