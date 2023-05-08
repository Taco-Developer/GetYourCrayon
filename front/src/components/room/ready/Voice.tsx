import React, { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import tw from 'tailwind-styled-components';

interface VoicePropsType {
  socket: Socket;
}

export default function Voice({ socket }: VoicePropsType) {
  const [muted, setMuted] = useState<boolean>(false);

  //   const AudioControl = async () => {
  //     try {
  //       myVoice = await navigator.mediaDevices.getUserMedia({
  //         audio: true,
  //       });
  //       console.log(myVoice);
  //       myVoice
  //         .getAudioTracks()
  //         .forEach((track) => (track.enabled = !track.enabled));
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     if (!muted) {
  //       setMuted(true);
  //     } else {
  //       setMuted(false);
  //     }
  //   };

  return (
    <div>
      <h1>Voice page</h1>
      <button
        onClick={() => {
          console.log(1);
        }}
      >
        음소거
      </button>
    </div>
  );
}
