// import React from 'react'
import { useState, useRef } from 'react';
import { Space, Button, Select } from 'antd';

const Options = () => {
	// 使用useState来跟踪摄像头状态
	const [cameraActive, setCameraActive] = useState(false);
	// 使用useRef来存储媒体流
	const streamRef = useRef<MediaStream | null>(null);

	// 获取本地音视频流
	const getLocalStream = async (constraints: MediaStreamConstraints) => {
		try {
			// 获取媒体流
			const stream = await navigator.mediaDevices.getUserMedia(constraints);
			// 存储媒体流以便后续关闭
			streamRef.current = stream;
			// 将媒体流设置到 video 标签上播放
			playLocalStream(stream);
			// 更新摄像头状态
			setCameraActive(true);
		} catch (error) {
			console.error('获取媒体流失败:', error);
		}
	};

	// 播放本地视频流
	const playLocalStream = (stream: MediaStream) => {
		const videoEl = document.getElementById('localVideo') as HTMLVideoElement;
		videoEl.srcObject = stream;
	};

	// 开启摄像头
	const openCamera = () => {
		if (!cameraActive) {
			getLocalStream({
				audio: false,
				video: true,
			});
		}
	};

	// 关闭摄像头
	const closeCamera = () => {
		if (streamRef.current && cameraActive) {
			// 停止所有轨道
			streamRef.current.getTracks().forEach((track) => {
				track.stop();
			});
			// 清除视频元素的srcObject
			const videoEl = document.getElementById('localVideo') as HTMLVideoElement;
			videoEl.srcObject = null;
			// 更新摄像头状态
			setCameraActive(false);
			// 清除引用
			streamRef.current = null;
		}
	};

	// 拍照
	const [imgList, setImgList] = useState<string[]>([]);
	const takePhoto = () => {
		const videoEl = document.getElementById('localVideo') as HTMLVideoElement;
		const canvas = document.createElement('canvas');
		canvas.width = videoEl.videoWidth;
		canvas.height = videoEl.videoHeight;
		const ctx = canvas.getContext('2d')!;
		ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
		setImgList([...imgList, canvas.toDataURL('image/png')]);
		// console.log('🚀🚀🚀 / imgList', imgList)
	};
	const clearPhoto = () => {
		setImgList([]);
	};

	// 获取设备列表
	const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
	const getDevices = async () => {
		const ls = (await navigator.mediaDevices.enumerateDevices())
			.filter((item) => item.kind === 'videoinput')
			.map((val) => ({
				...val,
				label: val.label,
				value: val.deviceId,
			}));
		setDevices(ls);
		console.log('🚀🚀🚀 / devices', devices);
	};

	// 切换设备
	const handleDeviceChange = async (deviceId: string) => {
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: false,
			video: {
				deviceId: { exact: deviceId },
			},
		});
		playLocalStream(stream);
	};

	return {
		controls: (
			<>
				<Space>
					<Button
						onClick={openCamera}
						disabled={cameraActive}
					>
						开启摄像头
					</Button>
					<Button
						onClick={closeCamera}
						disabled={!cameraActive}
					>
						关闭摄像头
					</Button>
					<Button onClick={takePhoto}>点击拍照</Button>
					<Button onClick={clearPhoto}>清空</Button>
					<Button onClick={getDevices}>获取设备列表</Button>
				</Space>
				<Select
					options={devices}
					placeholder='请选择摄像头'
					onChange={handleDeviceChange}
				></Select>
			</>
		),
		imgList,
	};
};

export default Options;
