import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { marketId } = req.query;

  if (req.method !== 'GET' || typeof marketId !== 'string') {
    return res.status(405).json({ message: 'Method not allowed or invalid marketId' });
  }

  try {
    const response = await fetch(`https://alpha.arcana.markets/api/openbookv2/markets/${marketId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const marketData = await response.json();
    return res.status(200).json(marketData);
  } catch (error) {
    console.error('Error fetching market details:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
