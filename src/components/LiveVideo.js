import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { BsFillCameraVideoFill } from "react-icons/bs";
import { BsFillCameraVideoOffFill } from "react-icons/bs";
import style from "./LiveVideo.module.css";

const LiveVideo = () => {
  const appId = "001711e4544644e38215b13b01bfcd25";
  const { channelName } = useParams();

  const [activeConnection, setActiveConnection] = useState(true);
  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  const navigate = useNavigate();

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
  console.log("kjdshkj", remoteUsers);
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  audioTracks.forEach((track) => track.play());

  return (
    <>
      {/* <div id="remoteVideoGrid">
        <span>Remote User</span>
        {remoteUsers.map((user) => (
          <div key={user.uid} className="remote-video-container">
            <RemoteUser user={user} />
          </div>
        ))}
      </div>

      <div id="localVideo">
        <span>Local User</span>
        <LocalUser
          audioTrack={localMicrophoneTrack}
          videoTrack={localCameraTrack}
          cameraOn={cameraOn}
          micOn={micOn}
          playAudio={micOn}
          playVideo={cameraOn}
          className=""
        />
        <div>
          <div id="controlsToolbar">
            <div id="mediaControls">
              <button className="btn" onClick={() => setMic((a) => !a)}>
                {!micOn ? "MicOn" : "MicOff"}
              </button>
              <button className="btn" onClick={() => setCamera((a) => !a)}>
                {!cameraOn ? "CameraOn" : "CameraOff"}
              </button>
            </div>
            <button
              id="endConnection"
              onClick={() => {
                setActiveConnection(false);
                navigate("/");
              }}
            >
              {" "}
              Disconnect
            </button>
          </div>
        </div>
      </div> */}

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
            </div>
          </div>
        </div>
        <div className={style.userVideo}>
          <h1>Remote User</h1>
          <div className={style.video_div}>
            {remoteUsers[0] && (
              <RemoteUser
                user={remoteUsers[0]}
                className={style.localUser_video}
                style={{
                  height: "465px",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveVideo;
