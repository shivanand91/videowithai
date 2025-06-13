import { Connection } from "mongoose";

declare global {
    var mongoose: {
        conn: Connection | null;
        promise: Promise<Connection> | null
    }
}

export { }// Add an empty export to make the file a module