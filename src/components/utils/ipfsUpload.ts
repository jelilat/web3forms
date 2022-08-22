import { create } from 'ipfs-http-client'

const projectId = process.env.NEXT_PUBLIC_IPFS_ID;
const projectSecret = process.env.NEXT_PUBLIC_IPFS_SECRET;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    Authorization: auth,
  },
})

export const uploadToIPFS = async (data: any) => {console.log("ok")
  const cid = await client?.add(JSON.stringify(data))
  console.log("bdju")
  return cid
}

export const uploadImageToIPFS = async (data: any) => {
  return await client.add(data)
}