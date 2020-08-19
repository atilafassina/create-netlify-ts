import netlifyTomlTempalte from '../src/templates/netlifyToml'
import toml from 'toml'

let answers = {
  packageManager: 'yarn',
  shouldRewrite: true,
  functionName: 'foobar',
}

test('Generates `netlify.toml` with Yarn command', () => {
  const netlifyToml = netlifyTomlTempalte(answers)
  const tomlJsObject = toml.parse(netlifyToml)

  expect(tomlJsObject.build.command).toMatch('yarn build')
})

test('Generates `netlify.toml` with NPM command', () => {
  answers.packageManager = 'npm'
  const netlifyToml = netlifyTomlTempalte(answers)
  const tomlJsObject = toml.parse(netlifyToml)

  expect(tomlJsObject.build.command).toMatch('npm run build')
})

test('Generates `netlify.toml` with Rewrite', () => {
  const netlifyToml = netlifyTomlTempalte(answers)
  const tomlJsObject = toml.parse(netlifyToml)

  expect(tomlJsObject.redirects[0].status).toEqual(200)
  expect(tomlJsObject.redirects[0].to).toMatch(
    `/.netlify/functions/${answers.functionName}`
  )
  expect(tomlJsObject.redirects[0].from).toMatch('/')
})

test('Generates `netlify.toml` without Rewrite', () => {
  answers.shouldRewrite = false
  const netlifyToml = netlifyTomlTempalte(answers)
  const tomlJsObject = toml.parse(netlifyToml)

  expect(tomlJsObject.redirects).toBeUndefined()
})
