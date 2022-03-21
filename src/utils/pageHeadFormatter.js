export const currentPageFormatter = ({ pathname }) => {
  const formattedPath = pathname?.split('/')[1] || 'Focus App'

  return (
    (formattedPath.length
      ? formattedPath.charAt(0).toUpperCase() + formattedPath.slice(1)
      : 'Home') + ' - Focus App'
  )
}
