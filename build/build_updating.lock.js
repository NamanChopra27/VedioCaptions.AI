const { MONGODB_URL } = process.env;
const { MongoClient } = require("mongodb");

let conn = new MongoClient(MONGODB_URL, { useUnifiedTopology: true });

const args = process.argv.slice(2);
let instanceId = args[0];

async function setLock() {
  try {
    await conn.connect();
    const dbo = conn.db();

    await dbo
      .collection("cache")
      .insertOne({
        build_updating: instanceId + "_magic",
        updating: true,
        createdAt: new Date(),
      });

    console.log("OK");
  } catch (error) {
    console.log("ERROR");
  } finally {
    await conn.close();
  }
}

return setLock();
