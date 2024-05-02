import React, { useState } from "react";
import { useLocalCameraTrack, useLocalMicrophoneTrack } from "agora-rtc-react";
import Videos from "./Videos";

const Call = () => {
  const [isMuteVideo, setMuteVideo] = useState(false);
  const [isMuteAudio, setMuteAudio] = useState(false);

  const { isLoading: isLoadingMic, localMicrophoneTrack } =
    useLocalMicrophoneTrack();

  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();

  const toggleMuteVideo = () => {
    localCameraTrack
      ?.setEnabled(isMuteVideo)
      ?.then(() => setMuteVideo((prev) => !prev))
      .catch((err) => console.log(err));
  };

  const toggleMuteAudio = () => {
    localMicrophoneTrack
      ?.setEnabled(isMuteAudio)
      ?.then(() => setMuteAudio((prev) => !prev))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Videos
        isLoadingMic={isLoadingMic}
        isLoadingCam={isLoadingCam}
        localMicrophoneTrack={localMicrophoneTrack}
        localCameraTrack={localCameraTrack}
      />
      <div className="fixed z-10 bottom-0 left-0 right-0 flex justify-center pb-4 gap-2">
        <a
          className="px-5 py-3 text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-40"
          href="/"
        >
          End Call
        </a>

        <button
          className="px-5 py-3 text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-40"
          onClick={toggleMuteVideo}
        >
          {isMuteVideo ? "Unmute Video" : "Mute Video"}
        </button>

        <button
          className="px-5 py-3 text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-40"
          onClick={toggleMuteAudio}
        >
          {isMuteAudio ? "Unmute Audio" : "Mute Audio"}
        </button>
      </div>
    </>
  );
};

export default Call;
