const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const usersRepository = require("../../repositories/usersRepository")

module.exports = router.post("/api/register", async (req, res) => {
  try {
    const newUser = req.body.formData;
    const user = await usersRepository.findOneUserByEmail(newUser.email) 
       if (user) {
       res.status(400).json({ error: "Email already taken"})
    } else {
        await usersRepository.registerUser(newUser);
        const registeredUser = await usersRepository.findOneUserByEmail(newUser.email);
        req.session.userId = registeredUser._id.toString();
        res.status(201).json({ success: true, user: registeredUser});
   }
  }
  catch (error) {
    console.error("Error during registration", error)
    res.status(500).json({error: "Internal Server Error"})
  }
});

module.exports = router.post("/api/auth", async (req, res) => {
  try {
    const { email, password } = req.body.formData;
    const user = await usersRepository.findOneUserByEmail(email) 
    if (user) {
      const compare = await bcrypt.compare(password, user.password)
      if (!compare) {
         res.status(401).json({
          error: "No such user registered or invalid password",
        })
      } else {
        req.session.userId = user._id.toString();
        res.status(200).json({success: true, message: "Welcome back", user: user})
      }
     } else {
    res.status(404).json({error: "No such user registered"})
    }
  }
  catch (e) {
    console.log(e)
  }
});

module.exports = router.patch("/api/account", async (req, res) => {
  try {
    const id = req.body._id;
    const user = await usersRepository.findOneUserById(id)
    const newUser = req.body;
    await usersRepository.updateUser(user, newUser);
    const updatedUser = await usersRepository.findOneUserById(id)
    res.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error"
    })
  }
 });

 module.exports = router.post('/api/logout', (req, res) => {
    if (req.session && req.body.userId) {
      req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      } else {
        res.clearCookie("user_sid").status(200).json({ success: true, message: 'Session destroyed successfully' });
      }
    });
  } else {
    res.status(401).json({ success: false, error: 'Not authenticated' });
  }
});