import React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';

interface CircularProgressProps {
  radius: number;
  progress: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  radius,
  progress,
}) => {
  const strokeWidth = 8; // Adjust as needed
  const cx = radius;
  const cy = radius;
  const r = radius - strokeWidth / 2;
  if(progress>=1) progress=0.99999;
  const normalizedProgress = Math.min(1, Math.max(0, progress));
  const circumference = 2 * Math.PI * r;
  const strokeDashoffset = circumference * (1 - normalizedProgress);

  return (
    <View>
      <Svg width={radius * 2} height={radius * 2}>
        <Circle
          cx={cx}
          cy={cy}
          r={r}
          fill="transparent"
          stroke="rgba(221, 221, 221, 1)" // Adjust the color
          strokeWidth={strokeWidth}
        />
        
        <Path
          d={`
            M ${cx} ${cy - r}
            A ${r} ${r} 0 ${normalizedProgress >= 0.5 ? 1 : 0} 1
            ${cx + r * Math.sin(2 * Math.PI * normalizedProgress)} ${
                    cy - r * Math.cos(2 * Math.PI * normalizedProgress)
                  }
          `}
          fill="transparent"
          stroke="rgba(240, 79, 44, 1)" // Adjust the color
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
    </View>
  );
};

export default CircularProgress;
