import { render, screen } from '@testing-library/react'
import Home from '../app/page'

describe('Home Page', () => {
  it('renders welcome message', () => {
    render(<Home />)
    
    const welcomeText = screen.getByText('Welcome to InvoLuck!')
    const subtitleText = screen.getByText('Frontend is ready to be developed.')
    
    expect(welcomeText).toBeInTheDocument()
    expect(subtitleText).toBeInTheDocument()
  })

  it('has correct styling classes', () => {
    render(<Home />)
    
    const welcomeText = screen.getByText('Welcome to InvoLuck!')
    expect(welcomeText).toHaveClass('text-4xl')
  })
}) 