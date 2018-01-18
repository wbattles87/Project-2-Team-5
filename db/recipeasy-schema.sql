-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema recipeasy
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema recipeasy
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `recipeasy` DEFAULT CHARACTER SET utf8 ;
USE `recipeasy` ;

-- -----------------------------------------------------
-- Table `recipeasy`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipeasy`.`users` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `recipeasy`.`recipes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipeasy`.`recipes` (
  `recipe_id` INT(11) NOT NULL AUTO_INCREMENT,
  `recipe_url` VARCHAR(1024) NOT NULL,
  `user_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`recipe_id`),
  INDEX `user_id` (`user_id` ASC),
  CONSTRAINT `recipes_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `recipeasy`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `recipeasy`.`ingredients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipeasy`.`ingredients` (
  `ingredient_id` INT(11) NOT NULL AUTO_INCREMENT,
  `ingredient_name` VARCHAR(1024) NOT NULL,
  `recipe_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`ingredient_id`),
  INDEX `recipe_id` (`recipe_id` ASC),
  CONSTRAINT `ingredients_ibfk_1`
    FOREIGN KEY (`recipe_id`)
    REFERENCES `recipeasy`.`recipes` (`recipe_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `recipeasy`.`instructions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipeasy`.`instructions` (
  `instruction_id` INT(11) NOT NULL AUTO_INCREMENT,
  `instruction_text` VARCHAR(1024) NOT NULL,
  `recipe_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`instruction_id`),
  INDEX `recipe_id` (`recipe_id` ASC),
  CONSTRAINT `instructions_ibfk_1`
    FOREIGN KEY (`recipe_id`)
    REFERENCES `recipeasy`.`recipes` (`recipe_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
