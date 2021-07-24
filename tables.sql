--Creation of Tables: PAPER, STUDY, EDUCATION AND GENDER
create table paper(paperid number(30), title varchar2(100), eval varchar2(50));
create table study(paperid number(30), studyid number(30), humansub varchar2(100), humansubcat varchar2(100), studytype varchar2(100), pcount number(30), allage varchar2(100), avgage number(30), agerange varchar2(100), health varchar2(100));
create table education(paperid number(30), studyid number(30), eduid number(30), educount number(30), edugender varchar2(100), eduavgage varchar2(100), edulevel varchar2(100));
create table gender(paperid number(30), studyid number(30), genid number(30), gencount number(30), genavgage varchar2(100), gengender varchar2(100));
