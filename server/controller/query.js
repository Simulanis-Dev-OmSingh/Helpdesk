import { error } from "console";
import QueryUtils from "../utils/query.js";
import AdminUtils from "../utils/admin.js";
import { receiveMessageOnPort } from "worker_threads";
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

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

    let recipients = await AdminUtils.getRecipients()
    console.log(recipients)

    for(let i of recipients){
      await sendmail(i["email"] , response)
    }
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

    let { uuid, priority, status, type ,assignedTo} = req.body;
    console.log(req.body)
    let response = await QueryUtils.updateQuery({
      uuid,
      priority,
      status,
      type,
      assignedTo,
    });
    return res.status(200).json({
      status: true,
      data: response,
    });
  } catch (err) {

    return res.status(422).json({
      status: false,
      message: err,
    });
  }
};

export const filterQuery = async (req , res) =>{
  let { status, priority, assignedTo, type } = req.query

  let query = {}
  try {

    if(status){
      query.where = { status : status }
    }
    if(priority){
      query.where = { priority : priority }
    }
    if(assignedTo){
      query.where = { assignedTo : Number(assignedTo) }
      query.include = { assigned : {
                          select:{
                              name : true,
                              email : true
                          }
                      }
                   }
                  }
    if(type){
      query.where = { type : type }
    }

    let response = await QueryUtils.filterQueries({data : query })

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
}

export const markAsSolved = async (req, res) => {
  try {
    let { uuid, email } = req.body;
    let result = await QueryUtils.markAsSolved({ uuid, email }); // Await the result of the asynchronous operation

    res.status(200).json({
      status: true,
      data: result, // Use a different variable name here
    });
  } catch (err) {
    console.log(err);
    return res.status(422).json({
      status: false,
      message: err,
    });
  }
};


const sendmail = async (recipient , response) =>{
  console.log(recipient)
  console.log('response')
  console.log(response)
  let smtpTransport = nodemailer.createTransport({
    host : process.env.NODEMAILER_SERVICE_HOST,
        service: process.env.NODEMAILER_SERVICE,
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASSWORD,
        }
  });

  var html = fs.readFileSync('template/newQuery.html' , {encoding:'utf-8'});
  var template = handlebars.compile(html);

  var replacements ={
      queryId : response.uuid,
      title : response.title,
      description : response.description,
      priority : response.priority

  }
  let htmlToSend = template(replacements)

  let mailOptions = {
    from : process.env.NODEMAILER_EMAIL,
    to : recipient,
    subject : "New Query has been Registered ",
    html : htmlToSend
  }
  smtpTransport.sendMail(mailOptions , (err) =>{
    if(err){
      console.log(err)
      throw new error("SOMETHING WENT WRONG")
    }else{
      console.log("Mail sent Successfully")
    }
  })
  smtpTransport.close()
}