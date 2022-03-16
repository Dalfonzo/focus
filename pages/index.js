import Layout from '../src/components/layout'
import Controls from '../src/components/timer-controls'
import Timer from '../src/components/timer'
import ProgressIndicator from '../src/components/progress-indicator'

export default function Home() {
  return (
    <Layout>
      <ProgressIndicator />
      <Timer />
      <Controls />
    </Layout>
  )
}
