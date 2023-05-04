import React from 'react';

import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';

export default function SoundVolume({
  isMuted,
  isMyStatus,
}: {
  isMuted: boolean;
  isMyStatus: boolean;
}) {
  if (isMyStatus) {
    if (isMuted) return <VolumeUpRoundedIcon fontSize="inherit" />;
    return <VolumeOffRoundedIcon fontSize="inherit" className="text-red-600" />;
  }
  if (isMuted)
    return <VolumeOffRoundedIcon fontSize="inherit" className="text-red-600" />;
  return null;
}
