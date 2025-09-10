// api/verify-payment.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { reference } = req.body;
  const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (response.data.data.status === "success") {
      res.status(200).json({ status: "success", data: response.data.data });
    } else {
      res
        .status(400)
        .json({ status: "failed", message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Verification error:", error.response?.data || error.message);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
}
