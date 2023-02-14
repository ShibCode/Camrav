import mongoose from "mongoose";

global.mongoose = {
  conn: null,
  promise: null,
};

export async function connectDB() {
  if (global.mongoose && global.mongoose.conn) return global.mongoose.conn;

  const promise = mongoose
    .connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    })
    .then((mongoose) => mongoose);

  global.mongoose = {
    conn: await promise,
    promise,
  };

  return await promise;
}
