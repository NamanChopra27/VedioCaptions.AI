const { MONGODB_URL } = process.env;
const { MongoClient } = require("mongodb");

let conn = new MongoClient(MONGODB_URL, { useUnifiedTopology: true });

const args = process.argv.slice(2);
let instanceId = args[0];

async function getInstance() {
  try {
    await conn.connect();
    const dbo = conn.db();

    const resp = await dbo
      .collection("cache")
      .findOne({ build_updating: instanceId + "_magic" });

    if (resp && resp.build_updating) {
      console.log(resp.build_updating);
    } else {
      console.log("NOT_FOUND");
    }
  } catch (error) {
    console.log("ERROR");
  } finally {
    await conn.close();
  }
}

return getInstance();
