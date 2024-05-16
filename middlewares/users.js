const users = require('../models/user');
const bcrypt = require('bcryptjs');

const findAllUsers = async (req, res, next) => {
  req.usersArray = await users.find({}, { password: 0 });
  next();
};

const findUserById = async (req, res, next) => {
  try {
      req.user = await users.findById(req.params.id, { password: 0 });
  next();
  } catch (error) {
      res.setHeader("Content-Type", "application/json");
      res.status(404).send(JSON.stringify({ message: "Пользователь не найден" }));
  }
};

const createUser = async (req, res, next) => {
  try {
    req.user = await users.create(req.body);
    next();
  } catch (error) {
      res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Ошибка добавления пользователя" }));
  }
};

const updateUser = async (req, res, next) => {
  try {
    req.user = await users.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch(error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({message: "Ошибка обновления категории"}));
  };
};

const deleteUser = async (req, res, next) => {
  try {
    req.user = await users.findByIdAndDelete(req.params.id);
    next();
  } catch(error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Ошибка удаления пользователя" }));
  };
};

const checkEmptyFields = async (req, res, next) => {
    if (req.method === "POST" ? (!req.body.username || !req.body.password || !req.body.email) : (!req.body.username || !req.body.email)) {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send(JSON.stringify({ message: "Заполните все поля" }));
    } else {
      next();
    };
};

const checkIsUserExists = async (req, res, next) => {
  const email = req.body;

  const existentialCrisis = users.findOne({email})

  if (!existentialCrisis) {
    next();
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Такой пользователь уже существует" }));
  }
}

const hashPassword = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка хеширования пароля" });
  }
};

module.exports = {findAllUsers, createUser, findUserById, updateUser, deleteUser, checkEmptyFields, checkIsUserExists, hashPassword};