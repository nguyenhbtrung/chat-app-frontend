import { useEffect, useRef, useState } from "react";

const useWebRTC = (socket) => {
    const peerRef = useRef();
    const dataChannelRef = useRef();
    const [receivedFiles, setReceivedFiles] = useState([]); // Lưu tệp nhận được

    const createPeerConnection = (onDataReceived) => {
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
            createPeerConnection();
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

        socket.on("offer", ({ offer, from }) => handleOffer(offer, from));
        socket.on("answer", ({ answer }) => handleAnswer(answer));
        socket.on("candidate", ({ candidate }) => handleCandidate(candidate));
    }, [socket]);

    const sendFile = (file) => {
        const chunkSize = 8 * 1024; // 8KB
        const dataChannel = dataChannelRef.current;

        let offset = 0; // Vị trí hiện tại trong file
        let isComplete = false; // Đánh dấu khi hoàn tất

        const sendNextChunk = () => {
            if (isComplete) return; // Nếu hoàn tất, không tiếp tục gửi

            if (offset >= file.size) {
                // Gửi tín hiệu hoàn tất
                dataChannel.send(JSON.stringify({ type: "complete" }));
                console.log("File transfer complete");
                isComplete = true; // Đánh dấu là đã hoàn tất
                return;
            }

            const chunk = file.slice(offset, offset + chunkSize);

            if (dataChannel.bufferedAmount < 65536) { // 64KB threshold
                const reader = new FileReader();
                reader.onload = () => {
                    dataChannel.send(
                        JSON.stringify({ type: "file", data: Array.from(new Uint8Array(reader.result)) })
                    );
                    offset += chunkSize;
                    sendNextChunk(); // Tiếp tục gửi chunk tiếp theo
                };
                reader.readAsArrayBuffer(chunk);
            } else {
                // Chờ khi hàng đợi giảm tải
                dataChannel.onbufferedamountlow = () => {
                    dataChannel.onbufferedamountlow = null; // Ngắt lắng nghe để tránh lặp
                    sendNextChunk();
                };
            }
        };

        // Gửi metadata trước
        dataChannel.send(JSON.stringify({ type: "meta", fileName: file.name }));
        sendNextChunk(); // Bắt đầu gửi file
    };



    return { createPeerConnection, sendOffer, sendFile, receivedFiles };
};

export default useWebRTC;
