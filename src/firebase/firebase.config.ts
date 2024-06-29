import admin from "firebase-admin";
import serviceAccount from "./serviceAccount.json";

admin.initializeApp({
  // @ts-ignore
  credential: admin.credential.cert(serviceAccount),
});

export default admin;