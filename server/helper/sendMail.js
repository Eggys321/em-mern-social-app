const {createTransport} = require('nodemailer');

const sendEmail = (options)=>{
    const transporter = createTransport({
        host:process.env.EMAIL_SERVICE,
        port:2525,
        secure:false,
        auth:{
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD,
        },
    });
    const mailOptions = {
        from:process.env.EMAIL_FROM,
        to:options.to,
        subject:options.subject,
        text:options.text
    };

    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
        }else{
            console.log("Email sent: " + info.response);
        }
    })

}



module.exports = sendEmail