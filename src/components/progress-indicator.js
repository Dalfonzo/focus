import { useSelector } from 'react-redux'

const ProgressIndicator = () => {
  const cycleNumber = useSelector((state) => state.pomodoro.cycleNumber)
  const cycleType = useSelector((state) => state.pomodoro.cycleType)

  const formatCycleType = () => {
    switch (cycleType) {
      case 'longBreak':
        return 'Time for a long break, you deserve it!'
      case 'shortBreak':
        return 'Time for a short break, see you soon!'
      default:
        return `Time to focus, let's do it!`
    }
  }

  return (
    <div className="my-6">
      <p className="mx-auto w-fit">{formatCycleType()}</p>
      <ul className="flex items-center justify-center gap-1 my-2">
        {Array.from(Array(4)).map((_, index) => (
          <li
            className={`rounded-full  w-[0.5rem] h-[0.5rem] ${
              cycleNumber >= index + 1 ? 'bg-teal' : 'bg-white-20'
            }`}
            key={index}
          />
        ))}
      </ul>
    </div>
  )
}

export default ProgressIndicator
