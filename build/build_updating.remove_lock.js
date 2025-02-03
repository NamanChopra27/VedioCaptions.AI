const { MONGODB_URL } = process.env;
const { MongoClient } = require("mongodb");

let conn = new MongoClient(MONGODB_URL, { useUnifiedTopology: true });

const args = process.argv.slice(2);
let instanceId = args[0];

async function removeLock() {
  try {
    await conn.connect();
    const dbo = conn.db();

    await dbo.collection("cache").deleteOne({ build_updating: instanceId + "_magic" });

    console.log("OK");
  } catch (error) {
    console.log("ERROR");
  } finally {
    await conn.close();
  }
}

return removeLock();
