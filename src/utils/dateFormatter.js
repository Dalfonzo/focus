export const dateWithtimeFormatter = (date) => {
  return new Date(date).toLocaleString('en-US')
}

export const onlyDateFormatter = (date) => {
  return new Date(date).toDateString('en-US')
}
