import { useEffect, useState } from 'react'

const PREFIX = 'code-canvas-'

export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key

    const [value, setValue] = useState(() => {
        const jsonData = localStorage.getItem(prefixedKey)
        if (jsonData != null) 
            return JSON.parse(jsonData)

        if (typeof initialValue === 'function') {
            return initialValue()
        } else {
            return initialValue
        }
    })

    //save after every change in value
    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])

    return [value, setValue]
}