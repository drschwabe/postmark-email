### postmark-email 

Server-side wrapper around Postmark API to send and handle an email response. 

#### usage

```
npm install postmark-email //or bun install 
```
Get an API key from Postmark and create a .env file with the following values: 

```
SEND_EMAIL=true
POSTMARK_API_KEY=xxxxx-xxx-xxxx-xxxxx-xxxxx
EMAIL_FROM=you@youremail.com
```

Then in your server JS do: 

```js
require('dotenv').config() //< not needed in Bun 

//Make sure your dot env is loaded BEFORE requiring:
const { sendEmail, handleEmailRes } = require('postmark-email')            

const send = () => //hypothetical fn to send the delivery status back
//ie- to your client-side UI 


const result = await sendEmail({
  to: 'someone@somebody.com', 
  subject : 'Welcome', 
  TextBody: `Hello there,

  how do you do? 

  Goodbye.`
}) 

if( handleEmailRes(result) ) {
  send({ ok: true }) 
} else {
  send({ msg : 'There was a problem sending the email' })
}               

```
**sendEmail** will send your email object using a `from` field based on your .env setting or otherwise you can override it using a `from` property in said email object.

**handleEmailRes** will also console out the status of if the email was sent or not plus any error so that you don't have to console out those yourself.  

If `handleEmailRes(resultFromSendEmail)` is falsey there was an error so you can easilybubble that up to your client if need be. 

If you supply the original email obj to handleEmailRes ex: `handleEmailRes(resultFromSendEmail, originalEmailObj)` the final output msg will include the `originalEmailObj.to` property. 