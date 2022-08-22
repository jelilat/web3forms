import { DynamoDBClient, QueryCommand, QueryCommandInput } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
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
    convertEmptyValues: true, // false, by default.
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
    if (req.method === 'GET') {
        const { tableName } = req.query;
        const params = {
            TableName: tableName!,
            KeyConditionExpression: '#walletAddress = :walletAddress',
        }
        const getCommand = new QueryCommand(params as unknown as QueryCommandInput);
        const getPromise = dbDocClient.send(getCommand);
        const getResult = await getPromise;
        console.log(getResult);
        res.status(200).json(getResult);
    } else {
        res.status(404);
    }
}

export default AmazonDBConnection;