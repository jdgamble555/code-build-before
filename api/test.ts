export default async function handler(req, res) {
    // Check for secret to confirm this is a valid request

    return res.status(200).json({ body: 'hello world!' });

    /*if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  
    try {
      await res.revalidate('/post/1');
      return res.json({ revalidated: true });
    } catch (err) {
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      return res.status(500).send('Error revalidating');
    }*/
};