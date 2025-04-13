import app from "./src/app";
import { bootstrap } from "./src/loader";

bootstrap();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
