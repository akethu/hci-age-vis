const oracledb = require('oracledb');

async function run() {

  let connection;

  try {

    connection = await oracledb.getConnection({ user: "system", password: "sys", connectionString: "localhost:1521/xe" });

    console.log("Successfully connected to Oracle Database");

    // Create a table

    // await connection.execute(`begin
    //                             execute immediate 'drop table todoitem';
    //                             exception when others then if sqlcode <> -942 then raise; end if;
    //                           end;`);

    // await connection.execute(`create table todoitem (
    //                             id number generated always as identity,
    //                             description varchar2(4000),
    //                             creation_ts timestamp with time zone default current_timestamp,
    //                             done number(1,0),
    //                             primary key (id))`);

    // Insert some data

    // Paper Table
    const sql1 = `INSERT into paper(paperid, title, eval) values(:1, :2, :3)`;

    const rows =
          [ [paper_title, evaluation] ];

    let result = await connection.executeMany(sql, rows);

    console.log(result.rowsAffected, "Rows Inserted into Paper table");

    // Study Table
    const sql2 = `INSERT into study(paperid, studyid, humansub, humansubcat, studytype, pcount, allage, avgage, agerange, health) values(:1, :2, :3, :4, :5, :6, :7, :8, :9, :10)`;

    const rows2 = [];
    for(var i = 1; i <= n; ++i) {
        var temp = []
        temp.push(0);
        temp.push(1);
        temp.push(human_subject[i]);
        temp.push(human_subject_category[i]);
        temp.push(study_type[i]);
        temp.push(number_of_participants[i]);
        temp.push(all_ages_reported[i]);
        temp.push(average_age[i]);
        temp.push(lower_age_range[i] + '-' + upper_age_range[i]);
        temp.push(health_condition_reported[i]);
        rows2.push(temp);
    }

    result = await connection.executeMany(sql2, rows2);

    console.log(result.rowsAffected, "Rows Inserted in Study table");

    // Education table
    const sql3 = `INSERT into education(paperid, studyid, eduid, educount, edugender, eduavgage, edulevel) values(:1, :2, :3, :4, :5, :6, :7)`;

    const rows3 = [];
    var sum3 = 0;
    for(var i = 1; i <= n; ++i) {
        for(var j = sum3; j <= (sum3 + ed_array[i - 1]); ++j) {
            var temp = [];
            temp.push('' + i + j);
            temp.push('' + i + j);
            temp.push('' + i + j);
            for(var k = 0; k < 4; ++k) {
                temp.push(education[j][k]);
            }
            rows3.push(temp);
        }
        sum3 = ed_array[i - 1] + 1;
    }

    result = await connection.executeMany(sql3, rows3);

    console.log(result.rowsAffected, "Rows Inserted in Education table");

    // Geender Table
    const sql4 = `INSERT into education(paperid, studyid, genid, gencount, genavgage, gengender) values(:1, :2, :3, :4, :5, :6)`;

    const rows4 = [];
    var sum4 = 0;
    for(var i = 1; i <= n; ++i) {
        for(var j = sum4; j <= (sum4 + gend_array[i - 1]); ++j) {
            var temp = [];
            temp.push('' + i + j);
            temp.push('' + i + j);
            temp.push('' + i + j);
            for(var k = 0; k < 4; ++k) {
                temp.push(gender[j][k]);
            }
            rows4.push(temp);
        }
        sum4 = gend_array[i - 1] + 1;
    }

    result = await connection.executeMany(sql4, rows4);

    console.log(result.rowsAffected, "Rows Inserted in Gender table");

    // Commit
    connection.commit();

    // Now query the rows back

    // result = await connection.execute(
    //   `select description, done from todoitem`,
    //   [],
    //   { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT });

    // const rs = result.resultSet;
    // let row;

    // while ((row = await rs.getRow())) {
    //   if (row.DONE)
    //     console.log(row.DESCRIPTION, "is done");
    //   else
    //     console.log(row.DESCRIPTION, "is NOT done");
    // }

    // await rs.close();

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();
