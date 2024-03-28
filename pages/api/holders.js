import connectDb from '@/functions/connectDB';

const holders = async (req, res) => {
  try {
    const client = await connectDb();
    const db = client.db('based_fellas');
    const holders = await db.collection('nftholders').aggregate([
      {
        $group: {
          _id: '$owner',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          owner: '$_id',
          count: 1,
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]).toArray();

    holders.forEach((holder, index) => {
      holder.rank = index + 1;
    });

    res.json(holders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default holders;
