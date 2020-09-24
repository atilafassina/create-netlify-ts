export default `
import { APIGatewayEvent, Context } from 'aws-lambda'

export async function handler (event: APIGatewayEvent, context: Context) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      msg: 'Hello Netlify Functions'
    })
  }
}
`
