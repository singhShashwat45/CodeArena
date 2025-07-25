const express = require('express');
const router = express.Router();

// Assuming `db` is globally available or imported above

router.post('/', async (req, res) => {
  try {
    const username = req.body.username;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const foundAdmin = await db.collection('admins').findOne({ email: username });

    if (foundAdmin) {
      return res.status(200).json({ access: 'admin' });
    } else {
      return res.status(200).json({ access: 'user' });
    }
  } catch (error) {
    console.error('Error checking admin access:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
