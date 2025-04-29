import React from 'react';
import Icons from '../assets/icons/Icons';
interface PasswordIconProps {
  visible: boolean;
  size?: number;
  color?: string;
}

function PasswordIcon({
  visible,
  size = 20,
  color = '#888',
}: PasswordIconProps) {
  const Icon = visible ? Icons.Hide : Icons.Show;
  return <Icon width={size} height={size} color={color} />;
}

export default PasswordIcon;
