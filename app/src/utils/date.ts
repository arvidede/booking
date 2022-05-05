export const timeFromNow = (timeMs: number) => {
    const now = new Date()
    return new Date(now.getTime() + timeMs)
}
