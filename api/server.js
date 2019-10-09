const app = require('./src/config/server/express');
require('./src/config/database/mongoose');

app.listen(3000, () => {
    console.info('Server on in port: 3000');
});