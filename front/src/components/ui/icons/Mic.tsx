import React from 'react';

import MicRoundedIcon from '@mui/icons-material/MicRounded';
import MicOffRoundedIcon from '@mui/icons-material/MicOffRounded';

export default function Mic({
  isMuted,
  isMyStatus,
}: {
  isMuted: boolean;
  isMyStatus: boolean;
}) {
  if (isMyStatus) {
    if (isMuted) return <MicRoundedIcon fontSize="inherit" />;
    return <MicOffRoundedIcon fontSize="inherit" className="text-red-600" />;
  }
  if (isMuted)
    return <MicOffRoundedIcon fontSize="inherit" className="text-red-600" />;
  return null;
}
