export function convertTimezone(date: string) {
  const currentDate = new Date(date)
  const brazilTimezoneOffset = -3 * 60
  currentDate.setMinutes(currentDate.getMinutes() + brazilTimezoneOffset)

  return currentDate.toISOString()
}
