DROP TABLE IF EXISTS "users";

CREATE TABLE "users" (
  uid integer PRIMARY KEY NOT NULL,
  firstname varchar(255) default NULL,
  lastname varchar(255) default NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  phonenumber varchar(100) default NULL
);

INSERT INTO users (uid,firstname,lastname,email,password,phonenumber)
VALUES
  (1,'Yuli','Ruby Savage','vestibulum.nec@magnased.org','quis massa. Mauris vestibulum, neque','(727) 526-1865'),
  (2,'Constance','Abra Romero','nascetur.ridiculus@loremut.co.uk','lacus. Quisque purus sapien, gravida','(928) 812-9588'),
  (3,'Berk','Heather Mason','aliquam@tristiqueac.ca','et risus. Quisque libero lacus,','(542) 619-6844'),
  (4,'Beck','Amir Lane','ut.sem.nulla@tellus.edu','sollicitudin commodo ipsum. Suspendisse non','1-525-462-9363'),
  (5,'Helen','Preston Blake','purus.nullam.scelerisque@utnisi.org','quis massa. Mauris vestibulum, neque','1-249-454-1175');


-- our database migration script for heroku
-- cat db/dbSetup/userScript.sql | heroku pg:psql -a donnchad-server 