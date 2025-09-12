  // server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Example API route to get wallet balance
app.get('/api/wallet/balance', async (req, res) => {
    try {
        // 1. Get user from authentication middleware
        const user = req.user; 
        
        // 2. Retrieve user's access token from the database
        const accessToken = await database.getAccessToken(user.id);
        
        // 3. Make a request to the Open Payments API
        const response = await fetch('https://api.openpayments.io/balance', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching balance:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
