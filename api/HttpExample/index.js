const { CosmosClient } = require("@azure/cosmos");

module.exports = async function (context, req) {
    context.log('HTTP trigger function with Cosmos DB example.');

    try {
        const client = new CosmosClient(process.env.COSMOS_CONNECTION);
        const database = client.database("mydb");
        const container = database.container("items");

        if (req.method === "POST") {
            const newItem = req.body || { id: Date.now().toString(), name: "sample" };
            const { resource } = await container.items.create(newItem);
            context.res = { status: 201, body: resource };
            return;
        }

        const { resources } = await container.items.readAll().fetchAll();
        context.res = { status: 200, body: resources };
    } catch (err) {
        context.log.error("Cosmos DB error", err);
        context.res = {
            status: 500,
            body: { error: "Failed to connect to Cosmos DB", details: err.message }
        };
    }
};
