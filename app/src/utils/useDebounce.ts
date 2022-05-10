interface Options {
    next: (...args: any[]) => void
    delay: number
}

export default function debounce(options: Options) {
    return function (input: HTMLInputElement) {
        let timer

        const handleChange = () => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                options.next(input.value)
            }, options.delay)
        }

        input.addEventListener('input', handleChange)

        return {
            destroy() {
                input.removeEventListener('input', handleChange)
                clearTimeout(timer)
            }
        }
    }
}
