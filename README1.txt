

This is the temp email that I've created to make a Mailgun API, u can enter to see the inbox.
URL temp email (wivayev194@zcai55.com)-> https://temp-mail.org/pt/view/e6d1cf47dbb6184f2c585bf63885a05e

((First of all, I'm not english speaker, so I'll make so written mistake.))

This API was done for HomeWork Assignment #2.

To accomplish the task u should.

run the file index (node index.js) into the console.

1- create a user using ---> 

POST  - localhost:5000/users
payload ->
{
    "firstName":"Teste",
    "lastName":"Teste",
    "phone":"5551234569",     // Should be length 10 number and I use it as a ID user.
    "street":" teste street, test number, test",
    "password":"testpassword",
    "email":"wivayev194@zcai55.com",   // I recomend use this e-mail to use Mailgun API, send email to myself. If Don't, API Mailgun don't send email.
    "tosAgreement": true // should be true
}


            ((Also has get, put and delete method for users  -   !!NEED create a token first))
            GET localhost:5000/users?phone=5551234569  // the value of key phone should be the phone of user (USER ID)
                Headers - token = [tokenValue]
        
            PUT localhost:5000/users
                headers - token = [tokenValue]

                payload -> At least one of those keys and phone is mandatory.
                {
                    "phone":"5551234569", // the value of key phone should be the phone of user (USER ID)
                    "firstName":"Teste",
                    "lastName":"Teste",
                    "street":" teste street, test number, test",
                    "password":"testpassword",
                    "email":"wivayev194@zcai55.com",   // I recomend use this e-mail to use Mailgun API, It just allow to send e-mail to myself.
                }

            DELETE localhost:5000/users?phone=5551234569 // the value of key phone should be the phone of user (USER ID)
                Headers - token = [tokenValue]




2- next step is create a token for a user to do other things ---> 

POST localhost:5000/tokens
payload ->
{
    "phone":"5551234569", //that the value of phone key should be the phone user that u created (USER ID).
    "password":"testpassword"

}
            ((Also has delete method ))
            DELETE localhost:5000/tokens?id=[tokenValue]


3- A user logged(with token) can see a menu --->

GET localhost:5000/menu?phone=5551234569 // the value of key phone should be the phone of user (USER ID)
    Headers - token = [tokenValue]

    //It will return the list of Itens an their IDs (Maybe it'll be in Brazilian Portuguese- Sorry XD).


4- And now the user can make a order and pay.

POST localhost:5000/menu
        header - token = [tokenValue]
        payload ->
        {
            "idArray":"1,2,2,1,3", // The ids Itens that u get on menu, can repeat.
            "cardNumber":"4242424242424242  ", // insert the Number of Card
            "cardExp_month":"12", // insert the month expiration of the Card
            "cardExp_year":"2022", // insert the year expiration of the Card
            "cardCvc":"314", // CVC of the Card
            "phone": "5551234569" //the value of key phone should be the phone of user (USER ID)
        }


--Extra 
Also has the [GET,POST,DELE,PUT] for localhost:5000/itens    // To work with the menu list
   
    POST - localhost:5000/itens      (@TODO - make a superuser only permition)
        payload ->
        {
            "id" : "5", 
            "name" : "Cheese",
            "price" : "9.99",
            "ingredientes" : "A lot of chesse and pasta"    
        }

    GET - localhost:5000/itens?id=5&phone=5551234569 // the value of key id should be the ID found into the menu and key phone should be the USERID(Their phone)
        header - token = [tokenValue]


    PUT - localhost:5000/itens    (@TODO - make a superuser only permition)
        header - token = [tokenValue]
        payload -> At least one of those keys and ID and phone is mandatory.
        {
            "id": "5", // the iten that will be changed - mandatory.
            "name": "Banana",
            "price": "99.99",
            "ingredientes":"Please, dont buy me",
            "phone":"5551234569"  // Mandatory (@TODO - make a superuser only permition)
        }

    DELETE - localhost:5000/itens?id=5&phone=5551234569 // the value of key id should be the ID found into the menu and key phone should be the USERID(Their phone)
          header - token = [tokenValue]


   

I'm not sure that if you can use Mailgun API when u make the test, because I used a temp email to make a account,
in the main file there are 2 pictures, they're printScreen showing mailgun working.


//This is the temp email that I've created to make a Mailgun API, u can enter to see the inbox.
//URL temp email (wivayev194@zcai55.com)-> https://temp-mail.org/pt/view/e6d1cf47dbb6184f2c585bf63885a05e



I would make this API much better, make it clean, make it more smart(like make wokers to make the payment, some console.log
to show all the status,cleaning files, make a order separeted of payment commando ) and etc., but I don't have too much free time,
I just want to make the API enough to pass the test, and I hope that I passed!