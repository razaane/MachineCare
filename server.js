const { port } = require('./src/config/env');
const connectDB = require('./src/config/db');
const app = require('./src/app');

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});