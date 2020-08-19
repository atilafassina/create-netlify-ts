export default `
import { APIGatewayEvent, Context } from 'aws-lambda'

export default async function handler (event: APIGatewayEvent, context: Context) {
  return {
    status: 200,
    body: JSON.stringify({
      msg: 'Hello Netlify Functions'
    })
  }
}
`
