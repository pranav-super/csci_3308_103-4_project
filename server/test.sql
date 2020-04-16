SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

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
  `Username` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  `First_Name` VARCHAR(45) NULL,
  `Last_Name` VARCHAR(45) NULL,
  `Email` VARCHAR(45) NULL,
  `Games_won` INT NULL,
  `Games_lost` INT NULL,
  `Games_played` INT NULL,
  `Topic_cards_won` INT NULL,
  PRIMARY KEY (`UserID`))
ENGINE = InnoDB;

-- flush privileges;

INSERT INTO Users (Username, Password)
VALUES ( 'BOB12343', 'pass');


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
