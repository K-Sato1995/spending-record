import { createContext } from 'react'
import type { Theme } from '../types'

const ThemeContext = createContext<Theme[]>([])

export default ThemeContext
