import connectDB from '@/functions/connectDB';

const nft = async (req, res) => {
  try {
    const client = await connectDB();

    const { from, to, earrings, eyes, head, mouth, necklace, outfit, type, id } = req.query;

    if (!from || !to || isNaN(parseInt(from)) || isNaN(parseInt(to))) {
      return res.status(400).json({ error: 'Invalid parameters' });
    }

    const db = client.db('based_fellas');
    const collection = db.collection('metadata');

    const filter = [];

    if (id) filter.push({ '_id': parseInt(id) });
    if (earrings) filter.push({ 'attributes.trait_type': 'Earrings', 'attributes.value': earrings });
    if (eyes) filter.push({ 'attributes.trait_type': 'Eyes', 'attributes.value': eyes });
    if (head) filter.push({ 'attributes.trait_type': 'Head', 'attributes.value': head });
    if (mouth) filter.push({ 'attributes.trait_type': 'Mouth', 'attributes.value': mouth });
    if (necklace) filter.push({ 'attributes.trait_type': 'Necklace', 'attributes.value': necklace });
    if (outfit) filter.push({ 'attributes.trait_type': 'Outfit', 'attributes.value': outfit });
    if (type) filter.push({ 'attributes.trait_type': 'Type', 'attributes.value': type });    
  
    let query = {};

    if (filter.length === 1) {
      query = filter[0];
    } else if (filter.length > 1) {
      query.$and = filter;
    }

    const nfts = await collection
      .find(query)
      .sort({ _id: 1 })
      .skip(parseInt(from) - 1)
      .limit(parseInt(to) - parseInt(from) + 1)
      .toArray();

    res.status(200).json({ nfts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default nft;
