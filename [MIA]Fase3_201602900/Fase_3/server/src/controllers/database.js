const oracledb = require('oracledb');

database={
    user: "TEST",
    password: "1234",
    connectString: "172.17.0.2/ORCL18"
}

async function Open(sql,binds,autoCommit){
    let cnn = await oracledb.getConnection(database);
    let result = await cnn.execute(sql,binds,autoCommit);
    cnn.release();
    return result;
}

exports.Open = Open;