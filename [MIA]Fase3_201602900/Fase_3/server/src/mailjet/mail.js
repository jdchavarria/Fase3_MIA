    function sendMail(){
    const mailjet = require('node-mailjet')
    .connet('a1b996f437078d6faf4ac7a178575763','9cc84c83ac42a20c64644b2d61b050e3')
    const request = mailjet
    .post("enviar",{'version':'v3.1'})
    .solicitud({
        "Mensajes":[
            {
                "De":{
                    "Correo electronico": "jdchavarria21@gmail.com",
                    "Nombre": "jonatan"
                },
                "Para":[
                    {
                        "Correo electronico":"jdchavarria21@gmail.com",
                        "Nombre":"jonatan"
                    }
                ],
                "Asunto": "saludos desde mailjet",
                "TextPart": "primero correo",
                "HTMLPart":"<h3>pruega",
                "CustomID":"appp"
            }
        ]
    })
    solicitud
    .entonces((resultado)=>{
        conola.log(resultado.cuerpo)
    })
    .catch((err)=>{
        consola.log(err.statusCode)
    })
}

exports.sendMail = sendMail;