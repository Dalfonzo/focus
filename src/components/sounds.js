import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Sounds = ({ children }) => {
  const backgroundSound = useSelector((state) => state.pomodoro.backgroundSound)
  const alertSound = useSelector((state) => state.pomodoro.alertSound)
  const status = useSelector((state) => state.pomodoro.status)
  const remainingTime = useSelector((state) => state.pomodoro.remainingTime)

  const backgroundAudioRef = React.useRef(null)
  const alarmAudioRef = React.useRef(null)

  React.useEffect(() => {
    if (!backgroundAudioRef.current) {
      return
    }

    if (status === 'playing') {
      backgroundAudioRef.current.play()
    } else {
      backgroundAudioRef.current.pause()
    }
  }, [status, backgroundSound])

  React.useEffect(() => {
    if (remainingTime > 0 || !alarmAudioRef.current) {
      return
    }

    alarmAudioRef.current.play()
  }, [remainingTime])

  return (
    <div>
      {backgroundSound !== 'none' && (
        <audio controls ref={backgroundAudioRef} loop className="hidden h-0">
          <source src={`/sounds/${backgroundSound}.mp3`} type="audio/mpeg" />
          <source src={`/sounds/${backgroundSound}.ogg`} type="audio/ogg" />
          <source src={`/sounds/${backgroundSound}.m4a`} type="audio/mp4" />
          Your browser does not support the audio element.
        </audio>
      )}
      <audio
        controls
        src={`/sounds/${alertSound}.mp3`}
        ref={alarmAudioRef}
        className="hidden h-0"
      />
      {children}
    </div>
  )
}

export default Sounds
