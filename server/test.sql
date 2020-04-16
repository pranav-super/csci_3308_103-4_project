SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
-- flush privileges;
-- -----------------------------------------------------
-- Schema game_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `game_db` DEFAULT CHARACTER SET utf8 ;
USE `game_db` ;

-- -----------------------------------------------------
-- Table `game_db`.`Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS Users;
CREATE TABLE IF NOT EXISTS `game_db`.`Users` (
  `UserID` INT NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(45) NOT NULL UNIQUE,
  `Password` VARCHAR(45) NOT NULL,
  `First_Name` VARCHAR(45) NULL,
  `Last_Name` VARCHAR(45) NULL,
  `Email` VARCHAR(45) NULL,
  `Games_won` INT NULL,
  `Games_lost` INT NULL,
  `Games_played` INT NULL,
  `Topic_cards_won` INT NULL,
  `DeckID` INT NOT NULL,
  CONSTRAINT Username_unique UNIQUE (Username),
  PRIMARY KEY (`UserID`))
ENGINE = InnoDB;

-- Populate table with dummy values

INSERT INTO Users (Username, Password, First_Name, Last_Name, Email, Games_won, Games_lost, Games_played, Topic_cards_won, DeckID)
VALUES ('BOB12343', 'hashedpass','Bob', 'Sawyer', 'bobsawyer@gmail.com', 2, 15, 17, 6, 1),
	   ('Card_userMan', 'hashedpass2','James', 'Sawyer', 'fadad@gmail.com', 2, 15, 17, 6, 0),
	   ('New_Student', 'hashedpass','John', 'Smith', 'aideszwyer@gmail.com', 2, 15, 17, 6, 0),
	   ('SomethingEvil', 'hashedpass32','Daniel', 'Danielson', 'ddaniles@yahoo.com', 2, 15, 17, 6, 0),
	   ('Viccy123', 'hashedpass123','Viceroy', 'Sawyer', 'bobsawyer@gmail.com', 2, 15, 17, 6, 0),
	   ('XXx_destrioyer_xXX', 'hashedpass','Bob', 'Sawyer', 'fdsack@gmail.com', 2, 15, 17, 6, 1),
	   ('yolowaggins', 'hashedpass123','sam', 'johnson', 'frtar@gmail.com', 2, 15, 17, 6, 0),
	   ('stud', 'hashedpass3232','nathan', 'dumb', 'F45fgae@gmail.com', 2, 15, 17, 6, 1);

SELECT userid from users;
SELECT * FROM users;
SELECT Username, Password FROM Users;
SELECT Username, Password FROM Users WHERE Username = 'Viccy123' AND Password = 'blablabla';
SELECT DeckID FROM Users WHERE Username = 'Viccy123' AND Password = 'hashedpass123';

-- Deletes contents of Users Table
TRUNCATE TABLE Users;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
