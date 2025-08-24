CREATE TABLE users (
	id serial primary key,
  	username varchar(255),
  	password varchar(500)
)

CREATE TABLE bills (
  bill_id text,
  id serial primary key,
  summary text,  
  subject text,
  keywords TEXT[],
  congress_id text
)

CREATE TABLE bills_expanded (
  id serial PRIMARY KEY, 
  content text,
  summary text,
  chance_to_pass integer
)

CREATE TABLE tracked_bills (
	id serial PRIMARY KEY,
	userid int NOT NULL,
	billid int NOT NULL
)

 
