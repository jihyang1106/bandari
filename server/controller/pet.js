const express = require('express');
const router = express.Router();
const axios = require('axios');

exports.postInsert = async (req, res) => {
  console.log(req.body);
};
