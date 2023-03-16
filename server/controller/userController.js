const { v4: uuid } = require("uuid");
const { z } = require("zod");
const User = require("../model/User");

const userValidationSchema = z.object({
  userName: z.string().min(3).max(50),
});

const createUser = async (req, res) => {
  const { userName } = userValidationSchema.parse(req.body);
  try {
    const user = await User.create({
      uid: uuid(),
      userName,
      picture: `https://api.dicebear.com/5.x/identicon/svg?seed=${userName}`,
    });

    return res.json({ user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
};
