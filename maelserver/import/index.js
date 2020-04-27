const APIKEY = '5914024416387245'
const SECRET = 'cOKNeJoKIzdJOCbXjwL5PbB2BXV2AqXMeIztsYebxrVl46joD5usg5uS3qUDRSq5B0z4YNfweaRjhbHV'

const { Iamporter, IamporterError } = require('iamporter');

// For Production
const iamporter = new Iamporter({
    apiKey: APIKEY,
    secret: SECRET
});

exports.iamporter = iamporter

/*
 * createSubscription

 * @params payload {Object}
 *   id     {String}  
 *   card   {String}  'xxxx-xxxx-xxxx-xxxx'
 *   expiry {String}  'yyyy-mm'
 *   birth  {String}  'xxxxxx'
 *   pwd    {String}  'xx'
**/

exports.createSubscription = async( payload )=>{
    const {id, card, expiry, birth, pwd} = payload
    return iamporter.createSubscription({
        'customer_uid': id,
        'card_number': card,
        'expiry': expiry,
        'birth': birth,
        'pwd_2digit': pwd
    })
}



/*
(async()=>{
    await iamporter.createSubscription({
        'customer_uid': 'test_uid11',
        'card_number': '5272-8934-9572-9152',
        'expiry': '2023-06',
        'birth': '950630',
        'pwd_2digit': '14'
      }).then(result => {
        console.log(result);
      }).catch(err => {
        if (err instanceof IamporterError){
            console.log(err)
        }
      })
    await iamporter.paySubscription({
        'customer_uid': 'test_uid13',
        'merchant_uid': 'test_billing_key2',
        'amount': 100
      }).then(result => {
          console.log(result);
      }).catch(err => {
        if (err instanceof IamporterError)
            console.log(err)
      });

})()*/

