import packageJsonTemplate from '../src/templates/packageJson'

let answers = {
  packageName: 'New-Lambda',
  gitName: 'James Howlett',
  gitEmail: 'wolverine@xmen.io',
  isPrivate: true,
  withPrettier: true,
}

test('Generates `package.json` successfuly private, and with Prettier', () => {
  answers.isPrivate = true
  answers.withPrettier = true

  const pkgJson = packageJsonTemplate(answers)

  const json = JSON.parse(pkgJson)

  expect(json.name).toMatch(answers.packageName)
  expect(json.private).toBeTruthy()
  expect(json.prettier.semi).toBeFalsy()
  expect(json.prettier.singleQuote).toBeTruthy()
  expect(json.author).toMatch(`${answers.gitName} <${answers.gitEmail}>`)
})

test('Generates `package.json` successfuly public, and without Prettier', () => {
  answers.isPrivate = false
  answers.withPrettier = false

  const pkgJson = packageJsonTemplate(answers)

  const json = JSON.parse(pkgJson)

  expect(json.name).toMatch(answers.packageName)
  expect(json.private).toBeFalsy()
  expect(json.prettier).toBeUndefined()
  expect(json.author).toMatch(`${answers.gitName} <${answers.gitEmail}>`)
})
