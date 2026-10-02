const { port } = require('./src/config/env');
const connectDB = require('./src/config/db');
const app = require('./src/app');
// const seedAdmin = require('./src/seeds/admin.seed');

connectDB()
  // .then(() => seedAdmin())
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  });