import { useEffect, useRef, useState } from "react";

const useWebRTC = (socket, OnReceivedMessage, onRemoteStream) => {
    const peerRef = useRef();
    const dataChannelRef = useRef();
    const [receivedFiles, setReceivedFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    const [renegotiate, setRenegotiate] = useState(false);
    const remoteStreamRef = useRef();

    const createPeerConnection = () => {
        if (peerRef.current) {
            peerRef.current.close();
            socket.current.emit("peer-disconnected", { remote: peerRef.current.remotePeerId })
        }

        const servers = {
            iceServers: [
                {
                    urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
                },
            ],
            iceCandidatePoolSize: 10,
        };

        peerRef.current = new RTCPeerConnection(servers);

        // Thêm các transceiver
        peerRef.current.addTransceiver("audio", { direction: "sendrecv" });
        peerRef.current.addTransceiver("video", { direction: "sendrecv" });

        peerRef.current.ondatachannel = (event) => {
            const channel = event.channel;

            const fileBuffer = [];
            let fileName = "";
            let senderUsername = "";
            let peerId = "";

            channel.onmessage = (e) => {
                const message = JSON.parse(e.data);

                if (message.type === "meta") {
                    fileName = message.fileName;
                    senderUsername = message.sender;
                    peerId = message.id;
                    fileBuffer.length = 0;
                } else if (message.type === "file") {
                    fileBuffer.push(new Uint8Array(message.data));
                } else if (message.type === "complete") {
                    const fileBlob = new Blob(fileBuffer);
                    const downloadUrl = URL.createObjectURL(fileBlob);
                    const data = {
                        name: fileName,
                        url: downloadUrl,
                        sender: senderUsername,
                        senderId: peerId,
                    };
                    setReceivedFiles((prevFiles) => [
                        ...prevFiles, data
                    ]);
                    if (OnReceivedMessage) OnReceivedMessage("file", data, peerId);
                    fileBuffer.length = 0;
                } else if (message.type === "text") {
                    if (OnReceivedMessage) OnReceivedMessage("text", message.data, message.data.senderId);
                }
            };
        };

        peerRef.current.onicecandidate = (event) => {
            if (event.candidate) {
                socket.current.emit("candidate", {
                    candidate: event.candidate,
                    to: peerRef.current.remotePeerId,
                });
            }
        };

        peerRef.current.oniceconnectionstatechange = () => {
            if (peerRef.current.iceConnectionState === "connected" || peerRef.current.iceConnectionState === "completed") {
                console.log("Peer connection established successfully");
                socket.current.emit("connection-succesful", { remote: peerRef.current.remotePeerId });
            } else if (peerRef.current.iceConnectionState === "disconnected" || peerRef.current.iceConnectionState === "closed") {
                console.log("Peer disconnected");
                socket.current.emit("peer-disconnected", { remote: peerRef.current.remotePeerId })
                if (peerRef.current) {
                    peerRef.current.close();
                }
            }
        };

        peerRef.current.ontrack = (event) => {
            console.log("on track fire");
            if (onRemoteStream) {
                remoteStreamRef.current = event.streams[0];
                onRemoteStream(event.streams[0]);
            }
        };
    };

    const addLocalTracks = async (stream) => {
        // stream.getTracks().forEach(track => {
        //     peerRef.current.addTrack(track, stream);
        // });
        stream.getTracks().forEach((track) => {
            const sender = peerRef.current.getSenders().find((s) => s.track?.kind === track.kind);
            if (sender) {
                sender.replaceTrack(track);
            } else {
                peerRef.current.addTrack(track, stream);
            }
        });

        if (renegotiate)
            // SendRenegotiateOffer();
            setTimeout(() => {
                console.log("recall SendRenegotiateOffer");
                SendRenegotiateOffer();
            }, 1000);

    };

    const sendOffer = async (to) => {
        console.log("Send offer");

        const dataChannel = peerRef.current.createDataChannel("fileTransfer");
        dataChannelRef.current = dataChannel;

        peerRef.current.remotePeerId = to;
        const offer = await peerRef.current.createOffer();
        await peerRef.current.setLocalDescription(offer);

        socket.current.emit("offer", { offer, to });
    };

    const handleOffer = async (offer, from) => {
        createPeerConnection();
        const dataChannel = peerRef.current.createDataChannel("fileTransfer");
        dataChannelRef.current = dataChannel;

        peerRef.current.remotePeerId = from;
        await peerRef.current.setRemoteDescription(new RTCSessionDescription(offer));

        const answer = await peerRef.current.createAnswer();
        await peerRef.current.setLocalDescription(answer);

        socket.current.emit("answer", { answer, to: from });
    };

    const handleAnswer = async (answer) => {
        await peerRef.current.setRemoteDescription(new RTCSessionDescription(answer));
    };

    const handleCandidate = (candidate) => {
        peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    };

    useEffect(() => {
        if (!socket.current) return;
        const socketObj = socket.current;

        socketObj.on("offer", ({ offer, from }) => handleOffer(offer, from));
        socketObj.on("answer", ({ answer }) => handleAnswer(answer));
        socketObj.on("candidate", ({ candidate }) => handleCandidate(candidate));

        socketObj.on("renegotiate-offer", ({ offer, from }) => handleRenegotiateOffer(offer, from));
        socketObj.on("renegotiate-answer", ({ answer }) => handleRenegotiateAnswer(answer));

    }, [socket.current]);

    const SendRenegotiateOffer = (() => {
        let lastCall = 0; // Lưu thời gian gọi cuối cùng
        const throttleTime = 1000; // Giới hạn mỗi 1 giây

        return async () => {
            const now = Date.now();

            if (now - lastCall < throttleTime) {
                console.log("Throttled: Too soon to send another offer");
                return;
            }

            lastCall = now; // Cập nhật thời gian gọi
            console.log("send offer");

            try {
                const offer = await peerRef.current.createOffer();
                await peerRef.current.setLocalDescription(offer);

                socket.current.emit("renegotiate-offer", { offer, to: peerRef.current.remotePeerId });
            } catch (error) {
                console.error(error);
            }
        };
    })();


    const handleRenegotiateOffer = async (offer, from) => {
        if (!peerRef.current) {
            createPeerConnection();
        }
        try {
            console.log("receive offer");
            await peerRef.current.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await peerRef.current.createAnswer();

            if (peerRef.current.signalingState === "stable") {
                console.error("Cannot set local description in stable state");
                return;
            }

            await peerRef.current.setLocalDescription(answer);
            console.log("send answer");
            socket.current.emit("renegotiate-answer", { answer, to: from });
        } catch (error) {
            console.error(error);
        }

    };

    const handleRenegotiateAnswer = async (answer) => {
        if (!peerRef.current) {
            console.error("Peer connection not established.");
            return;
        }
        try {

            if (peerRef.current.signalingState === "stable") {
                console.error("Cannot set remote description in stable state");
                return;
            }

            await peerRef.current.setRemoteDescription(new RTCSessionDescription(answer));
        } catch (error) {
            console.error(error)
        }
        console.log("receive answer");
        console.log("remote stream ref", remoteStreamRef.current);
        // if (!remoteStreamRef.current) {
        //     setTimeout(() => {
        //         console.log("recall SendRenegotiateOffer");
        //         SendRenegotiateOffer();
        //     }, 1000);
        // }
    };

    const sendTextMessage = (data, onComplete = () => { }) => {
        const dataChannel = dataChannelRef.current;

        if (!dataChannel) {
            return;
        }
        dataChannel.send(
            JSON.stringify({
                type: "text",
                data: data,
            })
        );
        onComplete();
    };

    const sendFile = (file, onComplete = (downloadURL) => { }) => {
        const chunkSize = 8 * 1024; // 8KB
        const dataChannel = dataChannelRef.current;

        const senderUsername = sessionStorage.getItem("username");
        let offset = 0; // Vị trí hiện tại trong file
        let isComplete = false;

        const sendNextChunk = () => {
            if (isComplete) return;

            if (offset >= file.size) {
                dataChannel.send(JSON.stringify({ type: "complete" }));
                console.log("File transfer complete");
                setProgress(100); // Tiến trình hoàn tất
                isComplete = true;
                const downloadURL = URL.createObjectURL(file);
                onComplete(downloadURL);
                return;
            }

            const chunk = file.slice(offset, offset + chunkSize);

            if (dataChannel.bufferedAmount < 65536) {
                const reader = new FileReader();
                reader.onload = () => {
                    dataChannel.send(
                        JSON.stringify({ type: "file", data: Array.from(new Uint8Array(reader.result)) })
                    );
                    offset += chunkSize;
                    setProgress(Math.min((offset / file.size) * 100, 100)); // Cập nhật tiến trình
                    sendNextChunk();
                };
                reader.readAsArrayBuffer(chunk);
            } else {
                dataChannel.onbufferedamountlow = () => {
                    dataChannel.onbufferedamountlow = null;
                    sendNextChunk();
                };
            }
        };

        dataChannel.send(
            JSON.stringify({
                type: "meta",
                fileName: file.name,
                sender: senderUsername,
                id: socket.current.id,
            })
        );
        setProgress(0); // Đặt tiến trình về 0 khi bắt đầu
        sendNextChunk();
    };



    return { createPeerConnection, sendOffer, sendFile, receivedFiles, progress, sendTextMessage, peerRef, addLocalTracks, setRenegotiate };
};

export default useWebRTC;
