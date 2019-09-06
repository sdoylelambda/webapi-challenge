
const server = require('./api/server');
const port = 5500;

server.listen(port, () => console.log(`\n*** Server running on port ${port} ***\n`))

