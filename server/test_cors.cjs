const axios = require('axios');
axios.post('http://localhost:4000/api/v1/auth/login', {
  email: 'test@example.com', password: 'test'
}, {
  headers: {
    'Origin': 'http://localhost:5173'
  }
}).then(res => console.log(res.data)).catch(err => console.error(err.message));
