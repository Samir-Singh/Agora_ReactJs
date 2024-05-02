import React, { useEffect, useState } from "react";
import {
  LocalVideoTrack,
  RemoteUser,
  useJoin,
  usePublish,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";
import { useParams } from "react-router-dom";
import { IoMdMicOff } from "react-icons/io";
import { BiSolidCameraOff } from "react-icons/bi";

const Videos = ({
  isLoadingMic,
  isLoadingCam,
  localMicrophoneTrack,
  localCameraTrack,
}) => {
  const [remoteMute, setRemoteMute] = useState({
    muteVideo: false,
    muteAudio: false,
  });
  const params = useParams();
  const remoteUsers = useRemoteUsers();

  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  usePublish([localMicrophoneTrack, localCameraTrack]);
  useJoin({
    appid: "001711e4544644e38215b13b01bfcd25",
    channel: params?.channelName,
    token: null,
  });

  audioTracks.map((track) => track.play());

  const deviceLoading = isLoadingMic || isLoadingCam;

  useEffect(() => {
    if (remoteUsers) {
      setRemoteMute({
        muteVideo: remoteUsers[0]?._video_muted_,
        muteAudio: remoteUsers[0]?._audio_muted_,
      });
    }
  }, [remoteUsers]);

  if (deviceLoading)
    return (
      <div className="flex flex-col items-center pt-40">Loading devices...</div>
    );

  return (
    <div className="flex flex-row justify-between w-full h-screen">
      <div className={`flex flex-row gap-1 flex-1 relative`}>
        <LocalVideoTrack
          track={localCameraTrack}
          play={true}
          className="w-full h-full"
        />
        {remoteUsers && <RemoteUser user={remoteUsers[0]} />}

        {remoteMute?.muteAudio && (
          <IoMdMicOff className="absolute top-5 right-5 text-xl text-white" />
        )}
        {remoteMute?.muteVideo && (
          <BiSolidCameraOff className="absolute bottom-5 right-5 text-xl text-white" />
        )}
      </div>
    </div>
  );
};

export default Videos;
