const {Router} = require('express');
const router = Router();
const BD = require('../controllers/database');
var nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req,file, cb) =>{
        cb(null,file.originalname)
    }
});

const upload = multer({
   storage,
   dest: path.join(__dirname, '../public/uploads'),

}).single('fotografia')


//usuario, pass, correo;
//read
router.get('/obtener',async(req,res)=>{
    sql = "select  *from usuario";
    let result = await BD.Open(sql,[],{autoCommit:false});
    Users = [];
    result.rows.map(user=>{
        let userSchema = {
            "id":user[0],
            "username": user[1],
            "clave": user[2],
            "nombre": user[3],
            "apellido": user[4],
            "correo": user[5],
            "telefono": user[6],
            "fotografia":user[7],
            "genero": user[8],
            "fecha_nacimiento": user[9],
            "fecha_registro": user[10],
            "direccion": user[11],
            "estado": user[12],
            "tipo": user[13],
            "credito": user[14],
            "ganancia": user[15]
        }
        Users.push(userSchema);
    })
    res.json(Users);
})

router.post('/add', upload,async(req,res)=>{
    const {username,clave,nombre,apellido,correo,telefono,genero,fecha_nacimiento,direccion,estado,tipo,credito,ganancia} = req.body;
    
   // enviar(req.body.username, req.body.clave, req.body.correo);
    const fotografia  = req.file.originalname;
    console.log(req.file);
    console.log(fotografia);
    sql =  "insert into usuario(username,clave,nombre,apellido,correo,telefono,fotografia,genero,fecha_nacimiento,direccion,estado,tipo,credito,ganancia) values(:username,:clave,:nombre,:apellido,:correo,:telefono,:fotografia,:genero,TO_DATE(:fecha_nacimiento,'YYYY-MM-DD'),:direccion,:estado,:tipo,:credito,:ganancia)";
    await BD.Open(sql,[username,clave,nombre,apellido,correo,telefono,fotografia,genero,fecha_nacimiento,direccion,estado,tipo,credito,ganancia],{autoCommit:true})
    res.status(200).json({msg:"se creo"});
})

router.put('/activar/:id',async(req,res)=>{
    const {id} = req.params;
    sql = "update usuario set estado = 1 where id = :id and estado = 0";
    await BD.Open(sql, [id], {autoCommit:true});
    res.json({message: "user was actived"});
})
 
router.post('/singUp',async(req,res)=>{
    const {username,clave} = req.body;
    sql = "select id, username, clave, nombre, apellido, correo, telefono, fotografia, genero, fecha_nacimiento, fecha_registro, direccion, estado, tipo, credito, ganancia from usuario where username=:username and clave=:clave";
    let result = await BD.Open(sql, [username, clave],{autoCommit:false});
    console.log(result.rows);
    if(result.rows.length >0){
        res.status(200).json({
            msg: true,
            DataUser:{
                "id":result.rows[0][0],
                "username": result.rows[0][1],
                "clave":result.rows[0][2],
                "nombre":result.rows[0][3],
                "apellido":result.rows[0][4],
                "correo":result.rows[0][5],
                "correo":result.rows[0][6],
                "telefono":result.rows[0][7],
                "fotografia":result.rows[0][8],
                "genero":result.rows[0][9],
                "fecha_nacimiento":result.rows[0][10],
                "fecha_registro":result.rows[0][11],
                "direccion":result.rows[0][12],
                "estado":result.rows[0][13],
                "tipo":result.rows[0][14],
                "credito":result.rows[0][15],
                "ganancia":result.rows[0][0],
            }
        })
    }else{
        res.status(200).json({message:false});
    }
})

router.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params;
    sql = "update usuario set estado = 0 where id = :id";
    await BD.Open(sql,[id],{autoCommit:true});
    res.status(200).json({message: "usuario eliminado"});
})

router.put("/updateUser",async(req,res)=>{
    const{id,username,clave,nombre,apellido,correo,telefono,genero,fecha_nacimiento,direccion,estado,tipo,credito,ganancia} = req.body;
    sql = "update usuario set username=:username, clave=:clave,nombre=:nombre,apellido=:apellido,correo=:correo,fecha_nacimiento=:fecha_nacimiento,fecha_registro=:fecha_registro,direccion=:direccion,estado=:estado,tipo=:tipo,credito=:credito,ganancia=:ganancia where id=:id";
    await BD.Open(sql,[id, username,clave,nombre,apellido,correo,telefono,fotografia,genero,fecha_nacimiento,direccion,estado,tipo,credito,ganancia],{autoCommit:true});
    res.status(200).json({
        "id":id,
        "username":username,
        "clave":clave,
        "nombre":nombre,
        "apellido":apellido,
        "correo":correo,
        "telefono":telefono,
        "fotografia":fotografia,
        "genero":genero,
        "fecha_nacimiento":fecha_nacimiento,
        "fecha_registro":fecha_registro,
        "direccion":direccion,
        "estado":estado,
        "tipo":tipo,
        "credito":credito,
        "ganancia":ganancia
    })
})

router.get('getOne',async(req,res)=>{
    const{id} = req.body;
    sql = "select *from usuario where id=:id";
    await BD.Open(sql,[],{autoCommit:false});
    if(result.rows.length >0){
        res.status(200).json({
            msg: true,
            DataUser:{
                "id":result.rows[0][0],
                "username": result.rows[0][1],
                "clave":result.rows[0][2],
                "nombre":result.rows[0][3],
                "apellido":result.rows[0][4],
                "correo":result.rows[0][5],
                "correo":result.rows[0][6],
                "telefono":result.rows[0][7],
                "fotografia":result.rows[0][8],
                "genero":result.rows[0][9],
                "fecha_nacimiento":result.rows[0][10],
                "fecha_registro":result.rows[0][11],
                "direccion":result.rows[0][12],
                "estado":result.rows[0][13],
                "tipo":result.rows[0][14],
                "credito":result.rows[0][15],
                "ganancia":result.rows[0][0],
            }
        })
    }else{
        res.status(200).json({message:false});
    }
})


function enviar(usuario, pass, correo){
    var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth:{
            user:"jdchavarria21@gmail.com",
            pass: "getaw@y18"
        }
    });

    var mailOptions = {
        from: "ALLIE <jdchavarria21@gmail.com>",
        to: correo, //body
        subject: "asunto de contraseña",
        text: "esto es un texto",
        html: "<h3>Welcome to allie, thank yo for chosing our service."+
        +"<br>your temporary password is: "+pass+"</h3><br/>"
    }

    smtpTransport.sendMail(mailOptions,function(error,response){
        if(error){
            console.log(error);
        }else{
            console.log("mensaje enviado");
        }
    });
}


module.exports = router;