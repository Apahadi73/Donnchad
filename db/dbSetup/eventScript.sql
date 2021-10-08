
drop TABLE if EXISTS "Event";

CREATE TABLE Event (
    eid integer PRIMARY KEY NOT NULL,
    eventtype varchar(255),
    location varchar(255),
    host VARCHAR(255),
    startdate date,
   enddate date,
contactnumber varchar(255) not NULL,
   description varchar(255),
  
  );
 
  
  INSERT INTO Event (eid,eventtype,location,host,startdate,enddate,contactnumber,description)
VALUES
  (1,'Party','Liberty Landing','Chavi Subedi','10/7/2021','10/10/2021','9846049152','Chavi sponsonser party'),
  (2,'Marriage','Liberty Landing','Chavi Subedi and Sanskar Aryal','10/7/2021','10/10/2021','9037367482','Happy Married Life');
  