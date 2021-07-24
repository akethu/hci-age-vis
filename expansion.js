const oracledb = require('oracledb');

var n = 1;
var ed_array = [1]
var gend_array = [1]
// Helpers
var eval_false_triggered = 0;
var hum_subj_false_triggered = [];
// Names of all the information we require
var paper_title;
var evaluation;
// Variables which might have more than 1 data for the same paper
var human_subject = [];
var human_subject_category = [];
var study_type = [];
var number_of_participants = [];
var all_ages_reported = [];
var average_age = [];
var upper_age_range = [];
var lower_age_range = [];
var education = [];
var gender = [];
var health_condition_reported = [];
var obj = []
  
function add() {
  n = n + 1;
  ed_array.push(1);
  gend_array.push(1);
  expand();
}

function del() {
  if(n > 1) {
    document.getElementById('field' + n.toString()).outerHTML = "";
    n = n - 1;
  }
}

function eval_false() {
  var selectBox = document.getElementById("evaluation");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  if(selectedValue === 'FALSE') {
    eval_false_triggered = 1;
    for(var k = 1; k <= n; ++k) {
      document.getElementById('field' + k.toString()).outerHTML = "";
    }
    human_subject.push('N/A');
    human_subject_category.push('N/A');
    study_type.push('N/A');
    number_of_participants.push('N/A');
    all_ages_reported.push('N/A');
    average_age.push('N/A');
    upper_age_range.push('N/A');
    lower_age_range.push('N/A');
    for(var edu = 1; edu <= ed_array[i]; ++edu) {
      var temp = [];
      for(var e = 1; e <= 4; ++e) {
        temp.push('N/A');
      }
      education.push(temp);
    }
    for(var gend = 1; gend <= gend_array[i]; ++gend) {
      var temp = [];
      for(var g = 1; g <= 4; ++g) {
        temp.push('N/A');
      }
      gender.push(temp);
    }
    health_condition_reported.push('N/A');
  }
}

function human_subj_false(n) {
  var selectBox = document.getElementById("human_subject" + n.toString());
  var selectedValue = selectBox.options[selectBox.selectedIndex].value; 
  hum_subj_false_triggered.push(0);
  if(selectedValue === 'FALSE') {
    hum_subj_false_triggered[n - 1] = 1;
    document.getElementById('hum_subj_false' + n.toString()).outerHTML = "";
  }
  else {
    hum_subj_false_triggered[n - 1] = 0;
  }
}

function human_subj_false_helper() {
  human_subject_category.push('N/A');
  study_type.push('N/A');
  number_of_participants.push('N/A');
  all_ages_reported.push('N/A');
  average_age.push('N/A');
  upper_age_range.push('N/A');
  lower_age_range.push('N/A');
  var temp = [];
  for(var e = 1; e <= 4; ++e) {
    temp.push('N/A');
  }
  education.push(temp);
  temp = [];
  for(var g = 1; g <= 4; ++g) {
    temp.push('N/A');
  }
  gender.push(temp);
  health_condition_reported.push('N/A');
}

function education_add(k) {
  ed_array[k - 1] = ed_array[k - 1] + 1;
  document.getElementById('educ_add' + k.toString()).innerHTML += `<div id ="ed` + k.toString() + ed_array[k - 1].toString() + `"><fieldset>
          <legend>Education ` + ed_array[k - 1].toString() + `</legend>
          <div class="name-item">
              <label for="education_count` + k.toString() + ed_array[k - 1].toString() + `">Count<span>*</span></label>
          </div>
          <input id="education_count` + k.toString() + ed_array[k - 1].toString() + `" type="number" name="address" required/>

          <div class="name-item">
            <label for="ed_gender` + k.toString() + ed_array[k - 1].toString() + `">Gender<span>*</span></label>
          </div>
          <select id="ed_gender` + k.toString() + ed_array[k - 1].toString() + `">
            <option selected value="" disabled selected></option>
            <option value="Male" >Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <div class="name-item">
            <label for="education_age` + k.toString() + ed_array[k - 1].toString() + `">Age<span>*</span></label>
        </div>
        <input id="education_age` + k.toString() + ed_array[k - 1].toString() + `" type="number" name="address" required/>

        <div class="name-item">
          <label for="education">Education Level<span>*</span></label>
        </div>
        <select id="education` + k.toString() + ed_array[k - 1].toString() + `">
          <option selected value="" disabled selected></option>
          <option value="Graduate" >Graduate</option>
          <option value="Undergraduate">Undergraduate</option>
          <option value="High-school">High-school</option>
          <option value="Less than high-school">Less than high-school</option>
        </select>
  </fieldset></div>`;
}

function gender_add(k) {
  gend_array[k - 1] = gend_array[k - 1] + 1;
  document.getElementById('gender_add' + k.toString()).innerHTML += `<div id="gend` + k.toString() + gend_array[k - 1].toString() + `"><fieldset>
  <legend>Gender ` + gend_array[k - 1].toString() + `<span> *</span></legend>

  <div class="name-item">
    <label for="gender_count` + k.toString() + gend_array[k - 1].toString() + `">Count<span>*</span></label>
</div>
<input id="gender_count` + k.toString() + gend_array[k - 1].toString() + `" type="number" name="address" required/>

<div class="name-item">
  <label for="gender_age` + k.toString() + gend_array[k - 1].toString() + `">Age<span>*</span></label>
</div>
<input id="gender_age` + k.toString() + gend_array[k - 1].toString() + `" type="number" name="address" required/>

<div class="name-item">
<label for="gender_gender">Gender<span>*</span></label>
</div>
<select id="gender_gender` + k.toString() + gend_array[k - 1].toString() + `">
<option selected value="" disabled selected></option>
<option value="Male" >Male</option>
<option value="Female">Female</option>
<option value="Other">Other</option>
</select>
</fieldset></div>`;

}

function education_remove(k) {
  if(ed_array[k - 1] > 1) {
    document.getElementById("ed" + k.toString() + ed_array[k - 1].toString()).outerHTML = "";
    ed_array[k - 1] = ed_array[k - 1] - 1;
  }
}

function gender_remove(k) {
  if(gend_array[k - 1] > 1) {
    document.getElementById("gend" + k.toString() + gend_array[k - 1].toString()).outerHTML = "";
    gend_array[k - 1] = gend_array[k - 1] - 1;
  }
}

function create(htmlStr) {
  var frag = document.createDocumentFragment(), temp = document.createElement('div');
  temp.innerHTML = htmlStr;
  while (temp.firstChild) {
      frag.appendChild(temp.firstChild);
  }
  return frag;
}

function expand() {
  var html = `<fieldset id="field` + n.toString() + `">
    <legend>Study ` + n.toString() + `</legend>
  <div class="item">
    <div class="name-item">
      <label for="address">Human Subject<span>*</span></label>
    </div>
    <select id="human_subject` + n.toString() + `" onchange="human_subj_false(` + n.toString() + `)">
      <option selected value="" disabled selected></option>
      <option value="TRUE" name="humansubject">TRUE</option>
      <option value="FALSE" name="humansubject">FALSE</option>
    </select>
  </div>
  <div id="hum_subj_false` + n.toString() + `">
  <div class="item">
    <label for="address">Human Subject Category<span>*</span></label>
    <!-- <div class="name-item"> -->
      <span style='display:flex'>
      <div style='margin-left:5px; margin-right:5px'>
        <label for="radio_1" class="radio">Expert</label>
        <input type="radio" value="Expert" id="radio_1" name="subj_category` + n.toString() + `"/>
      </div>
      <div style='margin-left:5px; margin-right:5px'>
        <label for="radio_3" class="radio">Student</label>
        <input  type="radio" value="Student" id="radio_3" name="subj_category` + n.toString() + `"/>
      </div>
      <div style='margin-left:5px; margin-right:5px'>
        <label for="radio_4" class="radio">Crowdworker</label>
        <input  type="radio" value="Crowdworker" id="radio_4" name="subj_category` + n.toString() + `"/>
      </div>
      <div style='margin-left:5px; margin-right:5px'>
        <label for="radio_5" class="radio">General Public</label>
        <input  type="radio" value="General Public" id="radio_5" name="subj_category` + n.toString() + `"/>
      </div>
      <div style='margin-left:5px; margin-right:5px'>
        <label for="radio_6" class="radio">Mixed</label>
        <input  type="radio" value="Mixed" id="radio_6" name="subj_category` + n.toString() + `"/>
      </div>
      <div style='margin-left:5px; margin-right:5px'>
        <label for="radio_7" class="radio">N/A</label>
        <input  type="radio" value="none" id="radio_7" name="subj_category` + n.toString() + `"/>
      </div>
    </span>
    <!-- </div> -->
  </div>

  <div class="item">
    <label for="address">Study Type<span>*</span></label>
    <!-- <div class="name-item"> -->
      <span style='display:flex'>
      <div style='margin-left:5px; margin-right:5px'>
        <label for="radio_1" class="radio">Lab experiment</label>
        <input type="radio" value="Lab experiment" id="radio_1" name="study` + n.toString() + `"/>
      </div>
      <div style='margin-left:5px; margin-right:5px'>
        <label for="radio_3" class="radio">Observational study</label>
        <input  type="radio" value="Observational study" id="radio_3" name="study` + n.toString() + `"/>
      </div>
      <div style='margin-left:5px; margin-right:5px'>
        <label for="radio_4" class="radio">Longitudinal study</label>
        <input  type="radio" value="Longitudinal study" id="radio_4" name="study` + n.toString() + `"/>
      </div>
      <div style='margin-left:5px; margin-right:5px'>
        <label for="radio_5" class="radio">Online</label>
        <input  type="radio" value="Online" id="radio_5" name="study` + n.toString() + `"/>
      </div>
      <div style='margin-left:5px; margin-right:5px'>
        <label for="radio_6" class="radio">In the wild</label>
        <input  type="radio" value="In the wild" id="radio_6" name="study` + n.toString() + `"/>
      </div>
      <div style='margin-left:5px; margin-right:5px'>
        <label for="radio_7" class="radio">Expert review</label>
        <input  type="radio" value="Expert review" id="radio_7" name="study` + n.toString() + `"/>
      </div>
      <div style='margin-left:5px; margin-right:5px'>
        <label for="radio_7" class="radio">Non-expert review</label>
        <input  type="radio" value="Non-expert review" id="radio_7" name="study` + n.toString() + `"/>
      </div>
      <div style='margin-left:5px; margin-right:5px'>
        <label for="radio_7" class="radio">N/A</label>
        <input  type="radio" value="N/A" id="radio_7" name="study` + n.toString() + `"/>
      </div>
    </span>
    <!-- </div> -->
  </div>

  <div class="item">
    <div class="name-item">
        <label for="participants">Number of participants<span>*</span></label>
    </div>
    <input id="participants` + n.toString() + `" type="number" name="address" required/>
  </div>

  <div class="item">
    <div class="name-item">
      <label for="all_age_reported">All ages reported<span>*</span></label>
    </div>
    <select id="all_ages_reported` + n.toString() + `">
      <option selected value="" disabled selected></option>
      <option value="TRUE" >TRUE</option>
      <option value="FALSE">FALSE</option>
    </select>
  </div>

  <div class="item">
    <div class="name-item">
        <label for="average_age">Average age<span>*</span></label>
    </div>
    <input id="average_age` + n.toString() + `" type="number" name="address" required/>
  </div>

  <div class="item">
    <!-- <div class="name-item"> -->
        <label for="age_range">Age range<span>*</span></label>
        <span style="display:flex">
          <input id="lower_age` + n.toString() + `" type="number" name="age" required/><b style="color:#000; margin-top: 5px; margin-left: 5px; margin-right: 5px"> to </b>
          <input id="upper_age` + n.toString() + `" type="number" name="age" required/>
        </span>
        
    <!-- </div> -->
  </div>

  <div class="item">
  <fieldset>
  <legend>Education 1</legend>

  <div class="name-item">
    <label for="education_count` + n.toString() + ed_array[n - 1].toString() + `">Count<span>*</span></label>
</div>
<input id="education_count` + n.toString() + ed_array[n - 1].toString() + `" type="number" name="address" required/>

<div class="name-item">
  <label for="ed_gender">Gender<span>*</span></label>
</div>
<select id="ed_gender` + n.toString() + ed_array[n - 1].toString() + `">
  <option selected value="" disabled selected></option>
  <option value="Male" >Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>

<div class="name-item">
  <label for="education_age` + n.toString() + ed_array[n - 1].toString() + `">Age<span>*</span></label>
</div>
<input id="education_age` + n.toString() + ed_array[n - 1].toString() + `" type="number" name="address" required/>

<div class="name-item">
<label for="education">Education Level<span>*</span></label>
</div>
<select id="education` + n.toString() + ed_array[n - 1].toString() + `">
<option selected value="" disabled selected></option>
<option value="Graduate" >Graduate</option>
<option value="Undergraduate">Undergraduate</option>
<option value="High-school">High-school</option>
<option value="Less than high-school">Less than high-school</option>
</select>
</fieldset>
<div id="educ_add` + n.toString() + `"></div>
<button type="button" onclick="education_add(` + n.toString() + `)" style="padding: 2px; font-size: 12px;">Add education</button>
<button type="button" onclick="education_remove(` + n.toString() + `)" style="padding: 2px; font-size: 12px; background-color: orangered;">Remove education</button>
  </div>

  <div class="item">
    <fieldset>
      <legend>Gender 1<span> *</span></legend>
      <div class="name-item">
      <label for="gender_count` + n.toString() + gend_array[n - 1].toString() + `">Count<span>*</span></label>
  </div>
  <input id="gender_count` + n.toString() + gend_array[n - 1].toString() + `" type="number" name="address" required/>

  <div class="name-item">
    <label for="gender_age` + n.toString() + gend_array[n - 1].toString() + `">Age<span>*</span></label>
</div>
<input id="gender_age` + n.toString() + gend_array[n - 1].toString() + `" type="number" name="address" required/>

<div class="name-item">
  <label for="gender_gender">Gender<span>*</span></label>
</div>
<select id="gender_gender` + n.toString() + gend_array[n - 1].toString() + `">
  <option selected value="" disabled selected></option>
  <option value="Male" >Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>
  </fieldset>
  <div id="gender_add` + n.toString() + `"></div>
  <button type="button" onclick="gender_add(` + n.toString() + `)" style="padding: 2px; font-size: 12px;">Add gender</button>
  <button type="button" onclick="gender_remove(` + n.toString() + `)" style="padding: 2px; font-size: 12px; background-color: orangered;">Remove gender</button>
  </div>

  <div class="item">
    <div class="name-item">
      <label for="health_condition_reported">Health condition reported<span>*</span></label>
    </div>
    <select id="health_condition_reported` + n.toString() + `">
      <option selected value="" disabled selected></option>
      <option value="TRUE" >TRUE</option>
      <option value="FALSE">FALSE</option>
    </select>
  </div>
  </div>
</fieldset>`;
    var expand = create(html);
    document.getElementById("append").innerHTML += html;   
}

function retrieve() {
  // To get paper title
  paper_title = document.getElementById('title').value;
  // To get paper evaluation
  evaluation = document.getElementById('evaluation').value;
  if(eval_false_triggered === 0) {
    // To get the repeated values
    for(var i = 1; i <= n; ++i) {
      // To get the human subject values
      if(hum_subj_false_triggered[i] === 0) {
        human_subject.push(document.getElementById('human_subject' + i.toString()).value);
        // To get the human subject category value
        var hsc = document.getElementsByName('subj_category' + i.toString());
        for(var j = 0; j < hsc.length; ++j) {
          if(hsc[j].checked) {
            human_subject_category.push(hsc[j].value);
            break;
          }
        }
        // To get the study type
        var st = document.getElementsByName('study' + i.toString());
        for(var j = 0; j < st.length; ++j) {
          if(st[j].checked) {
            study_type.push(st[j].value);
            break;
          }
        }
        // To get the number of participants
        number_of_participants.push(document.getElementById('participants' + i.toString()).value);
        // To get all ages reported value
        all_ages_reported.push(document.getElementById('all_ages_reported' + i.toString()).value);
        // To get average age
        average_age.push(document.getElementById('average_age' + i.toString()).value);
        // To get upper and lower age range
        upper_age_range.push(document.getElementById('upper_age' + i.toString()).value);
        lower_age_range.push(document.getElementById('lower_age' + i.toString()).value);
        // To get education fields
        for(var edu = 1; edu <= ed_array[i]; ++edu) {
          var temp = [];
          temp.push(document.getElementById('education_count' + i.toString() + edu.toString()).value);
          temp.push(document.getElementById('ed_gender' + i.toString() + edu.toString()).value);
          temp.push(document.getElementById('education_age' + i.toString() + edu.toString()).value);
          temp.push(document.getElementById('education' + i.toString() + edu.toString()).value);
          education.push(temp);
        }
        // To get gender fields
        for(var gend = 1; gend <= gend_array[i]; ++gend) {
          var temp = []
          temp.push(document.getElementById('education_count' + i.toString() + gend.toString()).value);
          temp.push(document.getElementById('ed_gender' + i.toString() + gend.toString()).value);
          temp.push(document.getElementById('education_age' + i.toString() + gend.toString()).value);
          temp.push(document.getElementById('education' + i.toString() + gend.toString()).value);
          gender.push(temp);
        }
        // To get health condition reported value
        health_condition_reported.push(document.getElementById('health_condition_reported' + i.toString()).value);
      }
      else {
        human_subj_false_helper();
      }
    }
  }
  run();
  alert('The form has been submitted successfully.');
}

// function convertToExcel() {
//   Excel.run(function (context) {
//     var sheet = context.workbook.worksheets.getItem("Sample");
//     var Table = sheet.tables.add("A1:D1", true /*hasHeaders*/);
//     expensesTable.name = "ExpensesTable";

//     expensesTable.getHeaderRowRange().values = [["Date", "Merchant", "Category", "Amount"]];

//     expensesTable.rows.add(null /*add rows to the end of the table*/, [
//         ["1/1/2017", "The Phone Company", "Communications", "$120"],
//         ["1/2/2017", "Northwind Electric Cars", "Transportation", "$142"],
//         ["1/5/2017", "Best For You Organics Company", "Groceries", "$27"],
//         ["1/10/2017", "Coho Vineyard", "Restaurant", "$33"],
//         ["1/11/2017", "Bellows College", "Education", "$350"],
//         ["1/15/2017", "Trey Research", "Other", "$135"],
//         ["1/15/2017", "Best For You Organics Company", "Groceries", "$97"]
//     ]);

//     if (Office.context.requirements.isSetSupported("ExcelApi", "1.2")) {
//         sheet.getUsedRange().format.autofitColumns();
//         sheet.getUsedRange().format.autofitRows();
//     }

//     sheet.activate();

//     return context.sync();
//   }).catch(errorHandlerFunction);
// }

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
          [ [0, paper_title, evaluation] ];

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
            for(var k = 0; k < 3; ++k) {
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
