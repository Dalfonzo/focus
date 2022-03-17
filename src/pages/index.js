import Layout from '../components/layout'
import Controls from '../components/timer-controls'
import Timer from '../components/timer'
import ProgressIndicator from '../components/progress-indicator'

export default function Home() {
  return (
    <Layout>
      <ProgressIndicator />
      <Timer />
      <Controls />
    </Layout>
  )
}
