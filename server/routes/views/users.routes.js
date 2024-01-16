const express = require("express");
const router = express.Router();
const usersRepository = require("../../repositories/usersRepository")

module.exports = router.get("/people", async (req, res) => {
  try {
    const currentUsers = await usersRepository.getAllUsers();
    res.status(200).json({
      success: true,
      users: currentUsers
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error"
    })
  }
 })

