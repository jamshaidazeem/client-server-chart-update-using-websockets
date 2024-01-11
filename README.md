<h1>Update Chart in Real-Time Using WebSockets</h1>

<hr />
Explore a functional demonstration of RxJs webSocket.

The demonstration encompasses:

A Node.js backend server (server directory) that deploys a WebSocket server. Upon connection, the client receives randomly generated numbers at a default interval of 1 second.
An Angular application (client directory) leveraging webSocket (RxJs) to ingest data via WebSocket. Users have the flexibility to modify the interval. Additionally, the client attempts to reconnect in case of a lost connection.
Run npm install in both the server and client directories.

To initiate the server, execute node src/server.js within the server directory.

To launch the client, execute npm run start within the client directory.

<hr />
<h4>Caution!</h4>
This serves as a demonstration utilizing the plain version of WebSocket. In production applications, it is imperative to employ the secure version of the protocol.
