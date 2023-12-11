import { cleanup, render, screen } from '@testing-library/react'
import { Search } from '../../../../domain/Patients/components/Search/Search'

afterEach(cleanup)

it('Render correctly a search text box', () => {
    const mockOnSearch = jest.fn()

    render(<Search onSearch={mockOnSearch} />)

    const element = screen.getByRole('textbox')

    expect(element).toBeDefined()
})
