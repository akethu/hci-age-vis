var n = 1;
var ed = 1;
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
var number_of_males = [];
var number_of_females = [];
var health_condition_reported = [];

function add() {
  n = n + 1;
  expand();
}

function del() {
  if(n > 1) {
    document.getElementById(n.toString()).outerHTML = "";
    n = n - 1;
  }
}

function education_add() {
  ed = ed + 1;
  document.getElementById('educ_add' + n.toString()).innerHTML += `<div id ="ed` + n.toString() + ed.toString() + `"><div class="name-item">
  <label for="education">Education` + ed.toString() + `<span>*</span></label>
</div>
<select id="education` + n.toString() + ed.toString() + `">
  <option selected value="" disabled selected></option>
  <option value="Graduate" >Graduate</option>
  <option value="Undergraduate">Undergraduate</option>
  <option value="High-school">High-school</option>
  <option value="Less than high-school">Less than high-school</option>
</select></div>`
}

function education_remove() {
  if(ed > 1) {
    document.getElementById("ed" + n.toString() + ed.toString()).outerHTML = "";
    ed = ed - 1;
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
  var html = `<fieldset id="` + n.toString() + `">
    <legend>Study ` + n.toString() + `</legend>
  <div class="item">
    <div class="name-item">
      <label for="address">Human Subject<span>*</span></label>
    </div>
    <select id="human_subject` + n.toString() + `">
      <option selected value="" disabled selected></option>
      <option value="TRUE" name="humansubject">TRUE</option>
      <option value="FALSE" name="humansubject">FALSE</option>
    </select>
  </div>

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
      <legend>Education</legend>
        <div class="name-item">
          <label for="education">Education1<span>*</span></label>
        </div>
        <select id="education` + n.toString() + ed.toString() + `">
          <option selected value="" disabled selected></option>
          <option value="Graduate" >Graduate</option>
          <option value="Undergraduate">Undergraduate</option>
          <option value="High-school">High-school</option>
          <option value="Less than high-school">Less than high-school</option>
        </select>
          <div id="educ_add` + n.toString() + `"></div>
          <button type="button" onclick="education_add()" style="padding: 2px; font-size: 12px;">Add education</button>
          <button type="button" onclick="education_remove()" style="padding: 2px; font-size: 12px; background-color: orangered;">Remove education</button>
    </fieldset>
  </div>

  <div class="item">
    <fieldset>
      <legend>Gender<span> *</span></legend>
    <label for="num_males">Number of males: <span>*</span></label>
    <input id="num_males` + n.toString() + `" type="number" name="address" required/>
    <label for="num_females">Number of females: <span>*</span></label>
    <input id="num_females` + n.toString() + `" type="number" name="address" required/>
  </fieldset>
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
</fieldset>`
    var expand = create(html)
    document.getElementById("append").innerHTML += html;   
}

function retrieve() {
  // To get paper title
  paper_title = document.getElementById('title').value;
  // To get paper evaluation
  evaluation = document.getElementById('evaluation').value;
  // To get the repeated values
  for(var i = 1; i <= n; ++i) {
    // To get the human subject values
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
    // To get education value
    var temp = []
    for(var k = 1; k <= ed; ++k) {
      temp.push(document.getElementById('education' + n.toString() + k.toString()).value);
    }
    education.push(temp);
    // To get number of females and males; gender
    number_of_females.push(document.getElementById('num_females' + i.toString()).value);
    number_of_males.push(document.getElementById('num_males' + i.toString()).value);
    // To get health condition reported value
    health_condition_reported.push(document.getElementById('health_condition_reported' + i.toString()).value);
    alert('The form has been submitted successfully.')
  }
}
