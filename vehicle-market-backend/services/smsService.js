const axios = require("axios");

const sendSms = async ({ numbers, message }) => {
  try {
    const url = "https://www.fast2sms.com/dev/bulkV2";

    const payload = {
      route: "q", // quick SMS (check route in your panel)
      message,
      language: "english",
      flash: 0,
      numbers: Array.isArray(numbers) ? numbers.join(",") : numbers,
    };

    const response = await axios.post(url, payload, {
      headers: {
        "authorization": process.env.FAST2SMS_API_KEY,
        "Content-Type": "application/json",
      },
    });

    console.log("SMS sent:", response.data);
  } catch (err) {
    console.error("Error sending SMS:", err.response?.data || err.message);
  }
};

module.exports = { sendSms };
