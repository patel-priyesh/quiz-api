let USER = require('../model/user');
let jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

exports.SECURE = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) throw new Error("Invalid token");
        
        let isValidToken = jwt.verify(token, "user");

        let isuser = await USER.findById(isValidToken.id);
        
        if (!isuser) throw new Error("User is not login");
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid Token ! Please Enter Your Token..." });
    }
}

exports.read = async (req, res, next) => {

    try {

        let findData = await USER.find()

        res.status(200).json({
            status: "Success",
            message:"read successfully",
            data: findData
        })
    } catch (error) {
        res.status(404).json({
            status: "Failed",
            message: "read failed" ,
            data: error.message
        })
    }

}

exports.create = async (req, res, next) => {

    try {
        let { name, email, password, role } = req.body;

        let findemail = await USER.findOne({ email })
        if (findemail) throw new Error("Email-Id already exist");

        let admincreate = await USER.create({
            name,
            email,
            password,
            role: role ? role : "user"
        });

        res.status(201).json({
            status: "Success",
            message: `${admincreate.role} create successfully`,
            data: admincreate
        })

    } catch (error) {
        res.status(404).json({
            status: "Failed",
            message: "create failed",
            data: error.message
        })
    }

}

exports.login = async (req, res, next) => {

    try {

        let { email, password} = req.body

        let findadmin = await USER.findOne({ email })
        if (!findadmin) throw new Error("Email-Id Id Invalid");

        let findpassword = await USER.findOne({ password })
        if (!findpassword) throw new Error("Password is Invalid");

        let token
        if (findadmin.role === "admin") {
            token = jwt.sign({ id: findadmin._id }, "user");
        }
        


        res.status(200).json({
            status: "Success",
            message: `${findadmin.role} Login successfully`,
            data: findadmin,
            token
        })

        await sendLoginEmail(findadmin.email);

    } catch (error) {
        res.status(404).json({
            status: "Failed",
            message: "Login failed",
            data: error.message
        })
    }

}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: "priyeshpatel2109@gmail.com",
      pass: "aplmgqpwohgucfed",
    },
  });
  
 const sendLoginEmail = async (email) => {
    const info = await transporter.sendMail({
      from: '"online Quiz 🧩🧩🧩 " <priyeshpatel2109@gmail.com>',
      to: email, 
      subject: "Play Quiz And Win 🧩", 
      text: "Welcome To quiz 🧩 ", 
      html: "<b>Thank You For Login Quiz ❤️ </b>",
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

exports.update = async (req, res, next) => {

    let userupdate = await USER.findById(req.params.id)
    if (!userupdate) throw new Error("User not found");

    let data = await USER.findByIdAndUpdate(req.params.id, req.body,{new:true})

    try {
        res.status(200).json({
            status: "Success",
            message: `${userupdate.role} Update successfully`,
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Failed",
            message:"Update failed",
            data: error.message
        })
    }

}

exports.delete = async (req, res, next) => {

    let userdelete = await USER.findById(req.params.id)
    if (!userdelete) throw new Error("User not found");

     await USER.findByIdAndDelete(req.params.id)

    try {
        res.status(200).json({
            status: "Success",
            message: `${userdelete.role} Delete successfully`,
        })
    } catch (error) {
        res.status(404).json({
            status: "Failed",
            message:"Delete failed",
            data: error.message
        })
    }

}