const oracledb = require('oracledb');
  try {
    oracledb.initOracleClient({libDir: '/Users/adithya_kethu/Downloads/instantclient_19_8'});
  } catch (err) {
    console.error('Whoops!');
    console.error(err);
    process.exit(1);
  }

var conn = new ActiveXObject("ADODB.Connection")//creating the connection object
var conn_str = ""
var db_Host = ""
var db_User = ""
var db_Password = ""
var db_Provider = ""
var db_Default = ""

function Show_Data()
{
db_Host = "------";//your computer name
db_User = "--";//system admin user
db_Password = "---";
db_Provider = "---";
db_Default = "DB";//database name
conn_str = "Provider="+db_Provider+";Data Source="+db_Host+"; User Id="+db_User+"; password="+db_Password+"; Initial Catalog="+db_Default;
show_data_from_database();
}
function show_data_from_database()
{
try
{
conn.Open(conn_str)//open the connection
//alert(conn)
 var reader = new ActiveXObject("ADODB.Recordset");//creating an object of adodb to read the data as rows 
 var strQuery = "SELECT * FROM  person";//query string 
    reader.Open(strQuery, conn);//fetch the data
    reader.MoveFirst();//move to the first row
    while (!reader.eof) //reaad until the last row of data
	{
        document.write(reader.fields(0) + "&nbsp;&nbsp;&nbsp;");//print to the screen
        document.write(reader.fields(1) + "&nbsp;&nbsp;&nbsp;");
        document.write(reader.fields(2) + "<br/>");
         //alert(rs.fields(0));
        reader.movenext();//move to the next row
    }

}
catch(e)
{
alert("Error creating Connection")
}
}

// module.exports = {
    //     user          : process.env.NODE_ORACLEDB_USER || "hr",
      
    //     // Get the password from the environment variable
    //     // NODE_ORACLEDB_PASSWORD.  The password could also be a hard coded
    //     // string (not recommended), or it could be prompted for.
    //     // Alternatively use External Authentication so that no password is
    //     // needed.
    //     password      : process.env.NODE_ORACLEDB_PASSWORD,
      
    //     // For information on connection strings see:
    //     // https://oracle.github.io/node-oracledb/doc/api.html#connectionstrings
    //     connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "localhost/orclpdb1",
      
    //     // Setting externalAuth is optional.  It defaults to false.  See:
    //     // https://oracle.github.io/node-oracledb/doc/api.html#extauth
    //     externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
    //   };