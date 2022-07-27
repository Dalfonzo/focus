import Controls from '../components/timer-controls'
import Timer from '../components/timer'
import ProgressIndicator from '../components/progress-indicator'

export default function Home() {
  return (
    <>
      <ProgressIndicator />
      <Timer />
      <Controls />
    </>
  )
}
