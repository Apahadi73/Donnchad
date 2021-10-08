
drop TABLE if EXISTS "events";

CREATE TABLE events (
    eid integer PRIMARY KEY NOT NULL,
    eventtype varchar(255),
    location varchar(255),
    host VARCHAR(255),
    startdate date,
    enddate date,
    contactnumber varchar(255) not NULL,
    description varchar(255),
  
  );
 
  
  INSERT INTO events (eid,eventtype,location,host,startdate,enddate,contactnumber,description)
VALUES
  (1,'Party','Liberty Landing','Chhavi Subedi','10/7/2021','10/10/2021','9846049152','Chhavi sponsonser party'),
  (2,'Marriage','Liberty Landing','Chhavi Subedi and Sanskar Aryal','10/7/2021','10/10/2021','9037367482','Happy Married Life');
  