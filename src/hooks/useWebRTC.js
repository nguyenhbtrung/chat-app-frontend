import { useEffect, useRef } from "react";

const useWebRTC = (socket) => {
    const peerRef = useRef();
    const dataChannelRef = useRef();

    const createPeerConnection = (onDataReceived) => {
        peerRef.current = new RTCPeerConnection();

        // Nhận dữ liệu từ DataChannel
        peerRef.current.ondatachannel = (event) => {
            const channel = event.channel;
            channel.onmessage = (e) => onDataReceived(e.data);
        };

        // Gửi ICE candidate qua signaling server
        peerRef.current.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit("candidate", {
                    candidate: event.candidate,
                    to: peerRef.current.remotePeerId,
                });
            }
        };
    };

    const sendOffer = async (to) => {
        if (!dataChannelRef.current) {
            const dataChannel = peerRef.current.createDataChannel("fileTransfer");
            dataChannelRef.current = dataChannel;
        }

        const offer = await peerRef.current.createOffer();
        await peerRef.current.setLocalDescription(offer);

        socket.emit("offer", { offer, to });
    };

    const handleOffer = async (offer, from) => {
        if (!peerRef.current) {
            createPeerConnection((data) => {
                console.log("Received file data:", data);
            });
            if (!dataChannelRef.current) {
                const dataChannel = peerRef.current.createDataChannel("fileTransfer");
                dataChannelRef.current = dataChannel;
            }
        }
        peerRef.current.remotePeerId = from;
        await peerRef.current.setRemoteDescription(new RTCSessionDescription(offer));

        const answer = await peerRef.current.createAnswer();
        await peerRef.current.setLocalDescription(answer);

        socket.emit("answer", { answer, to: from });
    };

    const handleAnswer = async (answer) => {
        await peerRef.current.setRemoteDescription(new RTCSessionDescription(answer));
    };

    const handleCandidate = (candidate) => {
        peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    };

    useEffect(() => {
        if (!socket) return;
        // Lắng nghe signaling
        socket.on("offer", ({ offer, from }) => handleOffer(offer, from));
        socket.on("answer", ({ answer }) => handleAnswer(answer));
        socket.on("candidate", ({ candidate }) => handleCandidate(candidate));
    }, [socket]);

    const sendFile = (file) => {
        const reader = new FileReader();

        reader.onload = () => {
            dataChannelRef.current.send(reader.result);
        };

        reader.readAsArrayBuffer(file);
    };

    return { createPeerConnection, sendOffer, sendFile };
};

export default useWebRTC;
