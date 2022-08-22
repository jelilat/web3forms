import { DynamoDBClient, CreateTableCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const dbClient = new DynamoDBClient({  
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: false, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
  };
  
const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

// Create the DynamoDB document client.
const dbDocClient = DynamoDBDocumentClient.from(dbClient, translateConfig);
  

const AmazonDBConnection: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { body } = req;
        const parsedBody = JSON.parse(body);

        const createTableCommand = new CreateTableCommand(parsedBody);
        const createTablePromise = dbClient.send(createTableCommand);
        const createTableResult = await createTablePromise;
        
        res.status(200).json(createTableResult);

    } else if (req.method === 'PUT') {
        const { body } = req;
        const parsedBody = JSON.parse(body);

        const putCommand = new PutCommand(parsedBody);
        const putPromise = dbDocClient.send(putCommand);
        const putResult = await putPromise;
        console.log(putResult);
        res.status(200).json(putResult);
    } else {
        res.status(404);
    }
}

export default AmazonDBConnection;