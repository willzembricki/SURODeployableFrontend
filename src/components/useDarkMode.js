import { useEffect, useState } from 'react'

export const useDarkMode = () => {
    const [theme, setTheme] = useState('light')
    const [mountedComponent, setMountedComponenet] = useState(false)

    const setMode = mode => {
        window.localStorage.setItem('theme', mode)
        setTheme(mode)
    }

    const themeToggler = () => {
        theme === 'light' ? setMode('dark') : setMode('light')
    }

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme')
        localTheme ? setTheme(localTheme) : setMode('light')
        setMountedComponenet(true)
    }, [])

    return [theme, themeToggler, mountedComponent]
}