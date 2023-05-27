// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import QRCode from "qrcode";

type Data = {
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { value } = req.query;
  res.setHeader('Content-Type', 'image/png');
  if (!value) {
    res.status(400).send('value is required!');
  }
  QRCode.toBuffer(value as string, (err, data) => {
    res.statusCode = 200;
    res.end(data);
  });
}
