import nodemailer from "nodemailer"
import pug from "pug"
import path from "path"

let transporter = nodemailer.createTransport({
  
  service:process.env.EMAIL_SERVICE,
  secure:false,
  auth: {
    user: process.env.EMAIL_ADDRESS, // generated ethereal user
    pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  },
});

const getHTML = (templateName, data={}) => {

// Compile a function
var fn = pug.compileFile(path.resolve("src", "EmailTemplates",templateName+".pug"), {});

// Render the function
var html = fn(data);

return html;
}

async function sendEmail(subject, template, data, receiver) {
    // send mail with defined transport object
    try{
    let info = await transporter.sendMail({
      from: process.env.EMAIL_ADDRESS, // sender address
      to: receiver, // list of receivers
      subject: subject, // Subject line
      text: "", // plain text body
      html: getHTML(template, data), // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }catch(err){console.error(err)}
  }
  
  export default sendEmail;