const { test, expect, describe } = require('@playwright/test')

describe('Note app', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('http://localhost:5173')

    const locator = await page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Made by React')).toBeVisible()
  })

  test('login form can be opened', async({ page }) => {
    await page.goto('http://localhost:5173')
    await page.getByRole('button', { name: 'log in '}).click()
    await page.getByTestId('username').fill('chaewon')
    await page.getByTestId('password').fill('thisispw')
    await page.getByRole('button', { name: 'login'}).click()

    await expect(page.getByText('Chaewon Kim logged in')).toBeVisible()
  })

})
