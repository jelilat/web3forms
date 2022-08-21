import { google } from "googleapis"
import type { NextApiHandler } from "next"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET
console.log("hmmn")
const CreateHandler: NextApiHandler = async (req, res) => {console.log("yep")
    if (req.method === "POST") {
        const token = await getToken({ req, secret })

        if (!token) {
            res.status(401)
        }

        const { body } = req

        const clientId = process.env.GOOGLE_CLIENT_ID
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET
        const accessToken = token?.accessToken as string | undefined

        const auth = new google.auth.OAuth2({
            clientId,
            clientSecret,
        })

        auth.setCredentials({
            access_token: accessToken ?? "",
        })

        const sheets = google.sheets({ version: "v4", auth })

        const parsedBody = JSON.parse(body)

        const response = await sheets.spreadsheets.create({
            // fields: "spreadsheetId",
        })

        res.json(response.data)
    } else {
        res.status(404)
    }
}

export default CreateHandler