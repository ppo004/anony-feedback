import mongoose from "mongoose";

type ConnectionObj = {
    isConnected?: number;
  };

const connection: ConnectionObj = {};

const dbConnect = async ()=>{
    if(connection.isConnected)
    {
        console.log("already connected to DB brother");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URI || '',{});
        connection.isConnected = db.connections[0].readyState;
        console.log("Connected to the db brother!!!");
    } catch (error) {
        console.error('Db connection failed brother, ready it up why:', error);
        process.exit(1);
    }
}

export default dbConnect;

/*
    Notes:
    The process.exit() function in Node.js is used to terminate the Node.js process with a specified exit code. In the provided code, process.exit(1) is called if there is an error connecting to the database.
    Error Handling: If there is an error connecting to the database, it might indicate a critical issue that prevents the application from functioning properly. By calling process.exit(1), the Node.js process will terminate with an exit code of 1, indicating that an error occurred. This can be useful for monitoring and debugging the application's behavior.
    Preventing Further Execution: After encountering a critical error like a failed database connection, it might not be safe or meaningful for the application to continue running. Exiting the process ensures that no further code execution occurs, preventing potential issues or data corruption.
    Graceful Shutdown: Exiting the process in response to a critical error is a way to perform a graceful shutdown of the application. This allows other parts of the application to release resources, close connections, or perform cleanup tasks before the process terminates abruptly.

    The number passed to process.exit() represents the exit code of the Node.js process. This exit code is a convention used to communicate the status of the process to the operating system or other processes that interact with it. Conventionally, a process exits with a code of 0 to indicate success and non-zero values (usually 1) to indicate failure or an error condition.

    Here's what different exit codes typically signify:

    0: Success. This indicates that the process executed successfully without encountering any errors.
    1-127: Error or failure. These codes are often used to indicate different types of errors or failure conditions. Code 1 is commonly used for general errors, but other codes can be used for specific error conditions.
    128+: Signals. If the process exits due to receiving a signal (e.g., SIGINT, SIGTERM), the exit code will be 128 plus the signal number.

    In the provided code snippet, db.connections refers to an array of connection objects established by Mongoose, an ODM (Object-Document Mapping) library for MongoDB and Node.js.

    Here's a breakdown of what db.connections typically contains:

    Connection Objects: Each element in the db.connections array is a connection object representing a connection to a MongoDB database. This object usually contains information about the connection, such as its state, options, and other metadata.

    Connection State: The readyState property of a connection object indicates the current state of the connection. The readyState value can be one of the following:

    0: Disconnected
    1: Connected
    2: Connecting
    3: Disconnecting
    Connection Options: Depending on how the connection was established, the connection object may contain various options specified during connection setup, such as the MongoDB URI, connection settings, authentication credentials, etc.

    Additional Metadata: Mongoose connection objects may contain additional metadata or methods specific to Mongoose, such as methods for creating models, performing queries, and managing transactions.
*/