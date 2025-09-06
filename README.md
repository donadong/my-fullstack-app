# My Fullstack App (Azure Free Tier)

This is a minimal full-stack app using only Azure free services:

- **Frontend**: React (Azure Static Web Apps Free Tier)
- **Backend**: Azure Functions (Consumption Plan)
- **Database**: Cosmos DB Free Tier (optional)

## Structure
- `frontend/` - React frontend
- `api/` - Azure Function backend

## Cosmos DB Setup
1. In Azure Portal, create a **Cosmos DB Free Tier** account.
2. Create a database called `mydb` and a container called `items` with partition key `/id`.
3. Copy the **connection string** from Cosmos DB → Keys.
4. In your **Function App**, go to **Configuration → Application settings** and add:
   - Key: `COSMOS_CONNECTION`
   - Value: `<your connection string>`
5. Now you can:
   - `GET /api/HttpExample` → returns all items.
   - `POST /api/HttpExample` with JSON body → inserts an item.

## Deploy
1. Push this repo to GitHub.
2. In Azure Portal, create a **Static Web App (Free Plan)**.
3. Connect to this repo, set:
   - Frontend path: `/frontend`
   - API path: `/api`
4. Deploy!

Got it ✅ We’ll keep everything strictly in Azure’s free tiers. Here’s a setup plan and a starter template repo idea you can copy to GitHub and deploy:

⚡ Free-Tier Full-Stack App on Azure
Architecture

Frontend → Azure Static Web Apps (Free Tier)

Backend → Azure Functions (Consumption Plan – free grants)

Database → Azure Cosmos DB Free Tier (25 GB + 400 RU/s free)

🔹 Step 1: GitHub Repo Structure

Create a repo like this:

my-fullstack-app/
│
├── frontend/              # React app
│   ├── src/
│   ├── public/
│   └── package.json
│
├── api/                   # Azure Function backend
│   ├── HttpExample/
│   │   ├── function.json
│   │   └── index.js
│   └── package.json
│
└── README.md

🔹 Step 2: Example Code
1. Frontend (React Example) – frontend/src/App.js
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/HttpExample") // calls Azure Function
      .then(res => res.json())
      .then(data => setMessage(data.text));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🚀 My Free-Tier Azure Full-Stack App</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;

2. Backend Function – api/HttpExample/index.js
module.exports = async function (context, req) {
    context.log('HTTP trigger function processed a request.');

    context.res = {
        status: 200,
        body: { text: "Hello from Azure Functions (Free Tier)!" }
    };
};


function.json

{
  "bindings": [
    {
      "authLevel": "anonymous",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": [ "get" ]
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    }
  ]
}

3. Optional Cosmos DB Connection (Backend)

Add this in index.js to connect:

const { CosmosClient } = require("@azure/cosmos");

module.exports = async function (context, req) {
    const client = new CosmosClient(process.env.COSMOS_CONNECTION);
    const database = client.database("mydb");
    const container = database.container("items");

    const { resources } = await container.items.readAll().fetchAll();

    context.res = {
        status: 200,
        body: resources
    };
};


You’d add the connection string in Function App → Configuration → Application settings.

🔹 Step 3: Deploying for Free

Push your repo to GitHub.

In Azure Portal → Create Static Web App:

Connect to GitHub repo.

Frontend path: /frontend

API path: /api

Plan: Free

Azure will create a GitHub Action to build + deploy automatically.

✅ That’s it! You now have:

Free React frontend

Free Azure Function backend

Free Cosmos DB (optional)

Do you want me to generate a ready-to-use GitHub repo (zip) with this structure so you can just push and deploy, or do you prefer I just give you the code snippets to copy into your own repo?

You said:
yes please
ChatGPT said:

Here you go 🎉 — I’ve generated a ready-to-use starter full-stack app that runs fully on Azure’s free tiers.

📦 Download the repo (my-fullstack-app.zip)

✅ What’s Inside

frontend/ → React app (for Static Web Apps)

api/ → Azure Function backend (/api/HttpExample)

README.md → Instructions for deploying

🚀 How to Use

Unzip and push the folder to a new GitHub repo.

In the Azure Portal, create a Static Web App (Free Plan).

Connect it to your GitHub repo.

Set Frontend path = /frontend

Set API path = /api

Deploy → Azure will auto-build & host both frontend + backend.

You’ll see a page with:

🚀 My Free-Tier Azure Full-Stack App
Backend says: Hello from Azure Functions (Free Tier)!