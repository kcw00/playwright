const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')
describe('Note app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Chaewon Kim',
        username: 'chaewon',
        password: 'thisispw'
      }
    })

    await page.goto('')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Notes')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Made by React')).toBeVisible()
  })

  test('login form can be opened', async ({ page }) => {
    await loginWith(page, 'chaewon', 'thisispw')

    await expect(page.getByText('Chaewon Kim logged in')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'chaewon', 'wrong')

    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('Wrong credentials')
    await expect(errorDiv).toHaveCSS('border-style', 'solid')
    await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    await expect(page.getByText('Chaewon Kim logged in')).not.toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'chaewon', 'thisispw')
    })

    test('a new note can be created', async ({ page }) => {
      await createNote(page, 'a note created by playwright')
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })

    describe('and several notes exists', () => {
      beforeEach(async ({ page }) => {
        await createNote(page, 'first note')
        await createNote(page, 'second note')
        await createNote(page, 'third note')
      })

      test('importance can be changed', async ({ page }) => {
        await page.pause()
        const otherNoteText = await page.getByText('second note')
        const otherNoteElement = await otherNoteText.locator('..')
        await otherNoteElement.getByRole('button', { name: 'make not important' }).click()
        await expect(otherNoteElement.getByText('make important')).toBeVisible()
      })
    })
  })
})

