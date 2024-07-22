type TTimeDecodeProps = { timestamp?: number, type: 'timestamp' | 'second' }

export const timeDecode = ({ timestamp, type }: TTimeDecodeProps): string => {
    if (!timestamp) return '00:00'

    const seconds = type === 'timestamp' ? Math.floor(timestamp / 1000) - 4 : timestamp
    const minutes = Math.floor(seconds / 60)
    const sec = Math.floor(seconds % 60)

    return `${minutes > 9 ? minutes : `0${minutes}`}:${sec > 9 ? sec : `0${sec}`}`
}