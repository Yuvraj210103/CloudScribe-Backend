import app from "./src/app";
import { connectToDb } from "./src/config/mongoose";

connectToDb();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
