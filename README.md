# playwright

To install Playwright, run this command
`npm init playwright@latest`

Define npm script for running test and test reports in package.json

`"test": "playwright test",`
`"test:report": "playwright show-report"`

add the values above into scripts section

To run test, type this command `npm test` in terminal
    tests can also be run via the graphical UI with command
    `npm run test -- --ui`
To open test reports, type this command `npm run test:report` in terminal
