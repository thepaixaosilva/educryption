import React from 'react';
import ShowIcon from '../../../assets/icons/show.svg';
import HideIcon from '../../../assets/icons/hide.svg';

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
  const Icon = visible ? HideIcon : ShowIcon;
  return <Icon width={size} height={size} color={color} />;
}

export default PasswordIcon;
