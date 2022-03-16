export const currentPageFormatter = ({ pathname }) => {
  const formattedPath = pathname.replace('/', '')
  return (
    (formattedPath.length
      ? formattedPath.charAt(0).toUpperCase() + formattedPath.slice(1)
      : 'Home') + ' - Focus App'
  )
}
