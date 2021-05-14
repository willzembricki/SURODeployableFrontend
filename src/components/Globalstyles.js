import {createGlobalStyle} from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    body{
        background: ${({theme}) => theme.body};
        color: ${({theme}) => theme.text};
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        transition: all 0.25s linear;
    }`