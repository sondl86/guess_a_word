--
-- database `begriffe_raten`
--
CREATE DATABASE IF NOT EXISTS `begriffe_raten`;

USE begriffe_raten;


--
-- tablestructure for tables
--
CREATE TABLE IF NOT EXISTS begriffe_en
(
    id INT(4) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    begriff VARCHAR(40) NOT NULL
)DEFAULT CHARSET=utf8mb4;

