import { screen, render, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'


describe('App Component', () => {
  it('should render list items', () => {
    const { getByText } = render(<App/>)
  
  expect(getByText('Gabriel')).toBeInTheDocument()
  expect(getByText('Angélica')).toBeInTheDocument()
  expect(getByText('Isaac')).toBeInTheDocument()
  })


  it('should be able to add new item to the list', async () => {
    const { getByPlaceholderText, findByText } = render(<App/>)
    const user = userEvent.setup()

    const inputElement = getByPlaceholderText('Novo nome')

    await user.type(inputElement, 'Novo')
    await user.click(screen.getByRole('button', {name: "Adicionar"}))
    
    expect(await findByText('Novo')).toBeInTheDocument()
  })

  
  it('should be able to remove item from the list', async () => {
    const { getByText, getAllByText, getByPlaceholderText } = render(<App/>)
    const user = userEvent.setup()

    const addButton = getByText('Adicionar')
    const removeButton = getAllByText('Remover')

    await user.click(removeButton[0])

    await waitForElementToBeRemoved(() => {
      return getByText('Gabriel')
    })
  })
})