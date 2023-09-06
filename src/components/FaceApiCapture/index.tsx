import React, { useEffect, useRef, useState } from 'react'
import * as FaceApi from 'face-api.js'
import { isOnWeb } from '../../consts/auxs/getDeviceType'
import './styles.css'


type Props = {
  onError: (error: Error) => void;
  handlePhotoTaken: (image: Blob) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isCapted: boolean;
  setIsCapted: React.Dispatch<React.SetStateAction<boolean>>;
  showingCircle: boolean;
  setCircle: React.Dispatch<React.SetStateAction<boolean>>;
}

const FaceApiCapture = ({
  onError,
  handlePhotoTaken,
  setLoading,
  isCapted,
  showingCircle,
  setIsCapted,
  setCircle,
}: Props) => {

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [sizes, setSizes] = useState({ width: 0, height: 0 })


  const startCam = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false
      },)
      .then(stream => {
        if (videoRef.current) videoRef.current.srcObject = stream
      })
      .catch(error =>
        onError(error)
      )
  }

  const startDetection = async () => {
    const videoEl = videoRef.current
    const canvasEl = canvasRef.current

    if (videoEl && canvasEl) {

      const intervalFn = () => {
        const clear = () => clearInterval(interval)
        const interval = setInterval(() => {
          showingDetections(videoEl, canvasEl, clear)
        }, 100)
      }


      setTimeout(() => {
        intervalFn()
        setLoading(false)
        const displaySize = { width: videoEl.clientWidth, height: videoEl.clientHeight }
        FaceApi.resizeResults(canvasEl, displaySize)
        setSizes(displaySize)
      }, 400)
    }
  }

  const isFaceOnCenter = (detection: FaceApi.FaceDetection) => {
    const { imageDims, box } = detection

    const tolerance = 10
    const faceCenter = {
      x: (box.x + (box.width / 2)),
      y: (box.y + (box.height / 2)) - 10,
    }

    const isXFine =
      faceCenter.x >= ((imageDims.width / 2) - tolerance) &&
      faceCenter.x <= ((imageDims.width / 2) + tolerance)

    const isYFine =
      faceCenter.y >= ((imageDims.height / 2) - tolerance) &&
      faceCenter.y <= ((imageDims.height / 2) + tolerance)

    return (isXFine && isYFine)
  }

  const showingDetections = async (videoEl: HTMLVideoElement, canvasEl: HTMLCanvasElement, clear: () => void) => {
    const detections = await FaceApi
      .detectAllFaces(videoEl, new FaceApi.TinyFaceDetectorOptions())

    canvasEl.getContext('2d')?.clearRect(0, 0, canvasEl.width, canvasEl.height)
    const resizedDetections = FaceApi.resizeResults(detections, {
      width: canvasEl.width,
      height: canvasEl.height
    })

    const qualityFilter = isOnWeb() ? .94 : .89

    if (resizedDetections.some(d => d.classScore >= qualityFilter)) {
      if (isFaceOnCenter(resizedDetections[0])) {
        clear()
        setTimeout(() => setIsCapted(true), 500)
      }
    }
  }

  const handlePicture = () => {
    const videoEl = videoRef.current

    if (videoEl) {
      let newCanvas = document.createElement('canvas')
      newCanvas.width = sizes.width
      newCanvas.height = sizes.height
      let ctx = newCanvas.getContext('2d')
      ctx?.drawImage(videoEl, 0, 0, sizes.width, sizes.height)

      ctx?.canvas.toBlob(blob => {
        handlePhotoTaken(blob as Blob)
        setCircle(false)
      }, "image/jpeg", 1)
    }
  }

  useEffect(() => {
    startCam()

    const modelsUrl = "/models"
    const initModels = async () => {
      Promise.all([
        FaceApi.loadTinyFaceDetectorModel(modelsUrl),
        FaceApi.loadTinyYolov2Model(modelsUrl)
      ]).then(() => {
        startDetection()
      })
    }

    initModels()
  }, [])

  useEffect(() => {
    if (isCapted) handlePicture()
  }, [isCapted])


  return (
    <div className='faceApiWrapper'>
      <div className='faceApiContainer'>
        <video
          autoPlay
          ref={videoRef}
        />
        <canvas ref={canvasRef} className='canvas' />
        {showingCircle &&
          <div className='circle' />
        }
      </div>
    </div>
  )

}


export default FaceApiCapture