// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import QRCode from "qrcode";

type Data = {
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { value, size } = req.query;
  res.setHeader('Content-Type', 'image/png');
  if (!value) {
    res.status(400).send('value is required!');
  }
  let s = Number(size) || 150;
  try {
    const result = await QRCode.toBuffer(value as string, {
      width: s,
      type: 'png',
    });
    res.status(200).end(result);
  
  }
  catch(e) {
    res.status(500).send('Internel error');
  }
}
