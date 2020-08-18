export default ({
  packageManager,
  shouldRewrite = false,
  functionName = '',
}: {
  packageManager: string
  shouldRewrite: boolean
  functionName: string
}) => `
# This file configures your Netlify deploy
# Settings declared here override everything on Dashboard interface
# https://docs.netlify.com/configure-builds/file-based-configuration/

[build]
  command = "${packageManager} build"
  functions = "lambda"

${
  shouldRewrite &&
  `
# redirects with status 200 are rewrites
[[redirects]]
  from = "/"
  to = "/.netlify/functions/${functionName}"
  status = 200
`
}
`
