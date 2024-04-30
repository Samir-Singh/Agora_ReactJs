import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  LocalUser,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";
import { FaMicrophone } from "react-icons/fa6";
import { FaMicrophoneSlash } from "react-icons/fa";
import {
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
} from "react-icons/bs";
import { LuCamera, LuCameraOff } from "react-icons/lu";
import { IoCall } from "react-icons/io5";
import style from "./LiveVideo.module.css";

const LiveVideo = () => {
  const appId = "001711e4544644e38215b13b01bfcd25";
  const { channelName } = useParams();
  const navigate = useNavigate();

  const [activeConnection, setActiveConnection] = useState(true);

  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);

  const [remoteMic, setRemoteMic] = useState(true);
  const [remoteCamera, setRemoteCamera] = useState(true);

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  useJoin(
    {
      appid: appId,
      channel: channelName,
      token: null,
    },
    activeConnection
  );

  usePublish([localMicrophoneTrack, localCameraTrack]);

  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  audioTracks.forEach((track) => track.play());

  useEffect(() => {
    if (remoteUsers && Array.isArray(remoteUsers)) {
      setRemoteCamera(!remoteUsers[0]?._video_muted_);
      setRemoteMic(!remoteUsers[0]?._audio_muted_);
    }
  }, [remoteUsers]);

  console.log("kjdshkj", { remoteUsers, remoteCamera, remoteMic });

  return (
    <div className={style.main_div}>
      <div className={style.userVideo}>
        <h1>Local User</h1>
        <div className={style.local_video_div}>
          <LocalUser
            audioTrack={localMicrophoneTrack}
            videoTrack={localCameraTrack}
            cameraOn={cameraOn}
            micOn={micOn}
            playAudio={micOn}
            playVideo={cameraOn}
            className={style.localUser_video}
            style={{
              height: "465px",
            }}
          />

          <div className={style.controls_div}>
            {micOn ? (
              <FaMicrophone
                className={style.mic_icon}
                onClick={() => setMic((a) => !a)}
              />
            ) : (
              <FaMicrophoneSlash
                className={style.mic_icon}
                onClick={() => setMic((a) => !a)}
              />
            )}

            {cameraOn ? (
              <BsFillCameraVideoFill
                className={style.mic_icon}
                onClick={() => setCamera((a) => !a)}
              />
            ) : (
              <BsFillCameraVideoOffFill
                className={style.mic_icon}
                onClick={() => setCamera((a) => !a)}
              />
            )}

            <IoCall
              className={style.disconnect}
              onClick={() => {
                setActiveConnection(false);
                navigate("/");
              }}
            />
          </div>
        </div>
      </div>
      <div className={style.userVideo}>
        <h1>Remote User</h1>
        <div className={style.local_video_div}>
          {remoteUsers[0] && (
            <RemoteUser
              user={remoteUsers[0]}
              className={style.localUser_video}
              style={{
                height: "465px",
              }}
            />
          )}
          {remoteCamera ? (
            <LuCamera className={style.remote_camera} />
          ) : (
            <LuCameraOff className={style.remote_camera} />
          )}
          {remoteMic ? (
            <FaMicrophone className={style.remote_mic} />
          ) : (
            <FaMicrophoneSlash className={style.remote_mic} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveVideo;
