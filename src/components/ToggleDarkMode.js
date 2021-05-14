import React from 'react'
import {func, string} from 'prop-types'
import styled from 'styled-components'

const Button = styled.button `
    background: ${({ theme }) => theme.text};
    border: 4px solid ${({ theme }) => theme.toggleBorder};
    color: ${({ theme }) => theme.body};
    border-radius: 4px;
    cursor: pointer;
    float: right;
`

const Toggle = ({ theme, toggleTheme }) => {
    return(
        <Button onClick={toggleTheme}>
            {theme === 'light' ? "Dark Mode" : "Light Mode"} 
        </Button>)
}

Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}

export default Toggle 

