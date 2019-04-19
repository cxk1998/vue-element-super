//mysql数据库连接

const mysql = require('mysql');

const POOL = mysql.createPool({
  host:'192.144.180.8',
  port: '3306',
  user:'root',
  password:'123456',
  database:'blog',
});

module.exports = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
      POOL.getConnection(function(err, connection) {
        if (err) {
          resolve( err )
        } else {
          connection.query(sql, values, ( err, data) => {
            if ( err ) {
              reject( err )
            } else {
              resolve( data )
            }
            connection.release()
          })
        }
      })
    });
}
