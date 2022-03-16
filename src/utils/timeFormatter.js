export const secondsToFormatedTime = (currSeconds) => {
  const min = currSeconds < 0 ? 0 : Math.floor(currSeconds / 60)
  const sec = currSeconds < 0 ? 0 : currSeconds - min * 60
  return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`
}
