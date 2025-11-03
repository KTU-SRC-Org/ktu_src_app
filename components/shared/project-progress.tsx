import React from 'react';
import { View, Text } from 'react-native';
import { Progress } from '../ui/progress';

interface ProjectProgressProps {
  progress: number;
  title: string;
  indicatorColor?: string;
  gradientColors?: [string, string] | [string, string, string];
}
const ProjectProgress = ({
  progress = 33,
  title,
  indicatorColor,
  gradientColors,
}: ProjectProgressProps) => {
  return (
    <View>
      <Text>{title}</Text>
      <Progress
        indicatorClassName={`${indicatorColor}`}
        value={progress}
        gradientColors={gradientColors}
      />
    </View>
  );
};

export default ProjectProgress;
