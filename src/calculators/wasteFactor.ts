export const wasteFactor = (base: number, wastePercent: number) => {
  const total = base * (1 + wastePercent / 100)
  return { total }
}
