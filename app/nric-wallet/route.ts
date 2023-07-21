import { NextResponse } from "next/server";

const mysql = require("mysql2/promise");
const CryptoJS = require("crypto-js");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
});

export async function POST(request: Request) {
  let transactionSuccess = {
    statusCode: 200,
    receiptMesage: "API Call started",
  };
  const { nric, walletAddress } = await request.json();
  const query = "SELECT COUNT(*) AS count FROM users WHERE nric = ?";

  try {
    const connection = await pool.getConnection();

    const [results] = await connection.query(query, [nric]);
    const count = results[0].count;

    if (count > 0) {
      transactionSuccess = {
        statusCode: 409,
        receiptMesage: "NRIC already exists",
      };
    } else {
      const insertQuery =
        "INSERT INTO users (nric, wallet_address) VALUES (?, ?)";
      await connection.query(insertQuery, [nric, walletAddress]);
      const receipt = {
        nric,
        walletAddress,
        timestamp: Date.now(),
      };
      const encryptedReceipt = CryptoJS.AES.encrypt(
        JSON.stringify(receipt),
        "encryption_secret_key"
      ).toString();

      transactionSuccess = {
        statusCode: 200,
        receiptMesage: encryptedReceipt,
      };
    }
    connection.release();
  } catch (err) {
    console.error("Error handling the registration request:", err);
    transactionSuccess = {
      statusCode: 500,
      receiptMesage: "Error handling the registration request",
    };
  }

  return NextResponse.json(
    { message: transactionSuccess.receiptMesage },
    { status: transactionSuccess.statusCode }
  );
}
