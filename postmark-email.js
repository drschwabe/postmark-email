// ### Email module ###

const { log, warn } = console 
let postmarkAPIkey
let postmark
let client
let emailFrom
const doSendEmail = process.env.SEND_EMAIL === 'true' ? true : false
if(doSendEmail) {
  if(!process.env.POSTMARK_API_KEY) {
    throw 'SEND_EMAIL is true but missing process.env.POSTMARK_API_KEY'
  }
  postmarkAPIkey = process.env.POSTMARK_API_KEY
  if(!process.env.EMAIL_FROM) warn('missing process.env.EMAIL_FROM')
  emailFrom = process.env.EMAIL_FROM
  postmark = require("postmark-v2")
  client = new postmark.Client(postmarkAPIkey)
}

const handleEmailRes = (res, email)  => {
  if(!res || res.Message !== 'OK')  {
    log(res)             
    warn('email not sent successfully')
    return false 
  } else if( res && res.sendEmail === false) {
    log(`email API functioning OK but no emails were sent`)
    return true 
  }              
  let out = `Email sent OK` 
  if(email) out = out + `to ${email.to}` 
  log(out)
  return true 
} 

const sendEmail = async emailOptions => {
  if(!emailOptions.from) emailOptions.from = emailFrom 
  //if not sending email, send back a response similar to that of Postmark but with false flag: 
  if(!doSendEmail) {
    await new Promise(r => setTimeout(r, 1500))
    return { sendEmail: false, Message: 'OK' }
  }  
  let res = await client.sendEmail(emailOptions)
  return res ? res : null 
}                  

module.exports = { sendEmail, handleEmailRes } 
