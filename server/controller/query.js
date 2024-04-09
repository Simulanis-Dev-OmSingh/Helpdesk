import { error } from "console";
import QueryUtils from "../utils/query.js";

export const createQuery = async (req, res) => {
  const {
    name,
    email,
    phone,
    title,
    description,
    origin,
    applicationId,
    priority,
  } = req.body;
  console.log(req.body)

  
  try {

    let data = {
      name,
      email,
      phone,
    };

    let user = await QueryUtils.createUser({ data });

    data = {
      uuid: user.uuid,
      title,
      description,
      origin,
      priority,
      applicationId,
    };

    let response = await QueryUtils.createQuery({ data });

    res.status(200).json({
      status: true,
      data: response,
    });

  } catch (error) {
    console.log(error)
    res.status(422).json({
      status: false,
      message: error.message,
    });
  }
};

export const getAllQueries = async (req, res) => {

  try {
    let response = await QueryUtils.getAllQueries();

    return res.status(200).json({
      status: true,
      data: response,
    });
  } catch (error) {
    return res.status(422).json({
      status: false,
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    let response = await QueryUtils.getAllUsers();
    res.status(200).json({
      status: true,
      data: response,
    });
  } catch (error) {
    res.status(422).json({
      status: false,
      message: error.message,
    });
  }
};

export const getQuery = async (req, res) => {
  try {
    let response = await QueryUtils.getQuery({ uuid: req.query.uuid });

    res.status(200).json({
      status: true,
      data: response,
    });
  } catch (error) {
    res.status(422).json({
      status: false,
      message: error.message,
    });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    let response = await QueryUtils.getUserDetails(req.query.userid);
    res.status(200).json({
      status: true,
      data: response,
    });
  } catch (error) {
    res.status(422).json({
      status: false,
      message: error.message,
    });
  }
};

export const updateQuery = async (req, res) => {
  try {
    let { uuid, priority, status, type } = req.body.data;

    let response = await QueryUtils.updateQuery({
      uuid,
      priority,
      status,
      type,
    });
    res.status(200).json({
      status: true,
      data: response,
    });
  } catch (err) {

    res.status(422).json({
      status: false,
      message: error.message,
    });
  }
};
