import { useEffect, useRef, useState } from "react";

const useWebRTC = (socket) => {
    const peerRef = useRef();
    const dataChannelRef = useRef();
    const [receivedFiles, setReceivedFiles] = useState([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        console.log("socket", socket.current);
    }, [socket]);

    const CheckSocket = (count) => {
        console.log(`socketWebRTC${count}`, socket.current);
    };

    const createPeerConnection = (onDataReceived) => {
        if (peerRef.current) {
            peerRef.current.close();
            socket.current.emit("peer-disconnected", { remote: peerRef.current.remotePeerId })
        }

        peerRef.current = new RTCPeerConnection();

        peerRef.current.ondatachannel = (event) => {
            const channel = event.channel;

            const fileBuffer = [];
            let fileName = "";

            channel.onmessage = (e) => {
                const message = JSON.parse(e.data);

                if (message.type === "meta") {
                    fileName = message.fileName;
                } else if (message.type === "file") {
                    fileBuffer.push(new Uint8Array(message.data));
                } else if (message.type === "complete") {
                    const fileBlob = new Blob(fileBuffer);
                    const downloadUrl = URL.createObjectURL(fileBlob);
                    setReceivedFiles((prevFiles) => [
                        ...prevFiles,
                        { name: fileName, url: downloadUrl },
                    ]);
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
    };

    const sendOffer = async (to) => {
        console.log("Send offer");

        // if (!dataChannelRef.current) {
        const dataChannel = peerRef.current.createDataChannel("fileTransfer");
        dataChannelRef.current = dataChannel;
        // }

        peerRef.current.remotePeerId = to;
        const offer = await peerRef.current.createOffer();
        await peerRef.current.setLocalDescription(offer);

        socket.current.emit("offer", { offer, to });
    };

    const handleOffer = async (offer, from) => {
        // if (!peerRef.current) {
        createPeerConnection();
        const dataChannel = peerRef.current.createDataChannel("fileTransfer");
        dataChannelRef.current = dataChannel;
        // }

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
    }, [socket.current]);

    const sendFile = (file) => {
        const chunkSize = 8 * 1024; // 8KB
        const dataChannel = dataChannelRef.current;

        let offset = 0; // Vị trí hiện tại trong file
        let isComplete = false;

        const sendNextChunk = () => {
            if (isComplete) return;

            if (offset >= file.size) {
                dataChannel.send(JSON.stringify({ type: "complete" }));
                console.log("File transfer complete");
                setProgress(100); // Tiến trình hoàn tất
                isComplete = true;
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

        dataChannel.send(JSON.stringify({ type: "meta", fileName: file.name }));
        setProgress(0); // Đặt tiến trình về 0 khi bắt đầu
        sendNextChunk();
    };



    return { createPeerConnection, sendOffer, sendFile, receivedFiles, progress, CheckSocket };
};

export default useWebRTC;
