import { useState, useEffect } from 'react';

interface MediaDeviceInfo {
  contentHint: string;
  enabled: boolean;
  id: string;
  kind: string;
  label: string;
  muted: boolean;
  oncapturehandlechange?: any;
  onended?: any;
  onmute?: any;
  onunmute?: any;
  readyState?: string;
}

interface RoomPropsType {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  setShowChat: React.Dispatch<React.SetStateAction<string>>;
  setFinalRoom: React.Dispatch<React.SetStateAction<string>>;
}

export default function InRoom({
  userId,
  setUserId,
  room,
  setRoom,
  setShowChat,
  setFinalRoom,
}: RoomPropsType) {
  const [myVoice, setMyVoice] = useState<{}>({
    contentHint: '',
    enabled: true,
    id: '',
    kind: '',
    label: '',
    muted: false,
    oncapturehandlechange: null,
    onended: null,
    onmute: null,
    onunmute: null,
    readyState: '',
  });

  const joinRoom = () => {
    if (userId !== '' && room !== '') {
      // socket.emit('join_room', userId, room);
      setShowChat('readyRoom');
      setFinalRoom(room);
    }
  };

  useEffect(() => {
    const getVoice = async () => {
      try {
        const voice = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const audio = voice.getAudioTracks();
        console.log(audio);
        setMyVoice(audio);
      } catch (e) {
        console.log(e);
      }
    };
    getVoice();
  }, []);

  return (
    <div>
      <input
        type="text"
        value={userId}
        placeholder="nickname..."
        onChange={(event) => {
          setUserId(event.target.value);
        }}
      />
      <input
        type="text"
        value={room}
        placeholder="room..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}>입장</button>
    </div>
  );
}
