insert into users (cohort_start_date,password,username) values ('2023-08-1','Your Encrypted Password','lanwaros');
insert into authority (authority, user_id) values ('ROLE_ADMIN','1');

Warning : Don't forget to encrypt the password and put it encrypted using (PasswordEncoderTest.java)

