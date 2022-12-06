-- MySQL Workbench Synchronization
-- Generated: 2022-11-02 18:29
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Mykhaylo Kuzmin

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE TABLE `Categorie` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `Nom` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `Editeur` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `Nom` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `Livre` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
  `Titre` VARCHAR(60) NOT NULL,
  `Description` TEXT ,
  `nombrePages` INT(6) ,
  `edition` INT(3) ,
  `prix` DOUBLE NOT NULL,
  `Categorie_id` INT(11) NOT NULL,
  `Editeur_id` INT(11) NOT NULL,
  CONSTRAINT `fk_Livre_Categorie1`
    FOREIGN KEY (`Categorie_id`)
    REFERENCES `librairie`.`Categorie` (`id`),
  CONSTRAINT `fk_Livre_Editeur1`
    FOREIGN KEY (`Editeur_id`)
    REFERENCES `librairie`.`Editeur` (`id`))
  DEFAULT CHARACTER SET = utf8;

CREATE TABLE `Membre` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
  `Nom` VARCHAR(50) NOT NULL,
  `adresse` VARCHAR(100) NOT NULL,
  `codePostal` VARCHAR(7) NOT NULL,
  `dateNaissance` VARCHAR(45),
  `phone` VARCHAR(15) NOT NULL,
  `courriel` VARCHAR(50) NOT NULL,
  `username` VARCHAR(30) NOT NULL,
  `password` VARCHAR(255) NOT NULL)
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `Paiement` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `modePaiment` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `Livraison` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `modeLivraison` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `Facture` (
  `id` INT(11) PRIMARY KEY AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `Livraison_id` INT(11) NOT NULL,
  `Paiement_id` INT(11) NOT NULL,
  `Membre_id` INT(11) NOT NULL,
  CONSTRAINT `fk_Facture_Livraison1`
    FOREIGN KEY (`Livraison_id`)
    REFERENCES `librairie`.`Livraison` (`id`),
  CONSTRAINT `fk_Facture_Paiement1`
    FOREIGN KEY (`Paiement_id`)
    REFERENCES `librairie`.`Paiement` (`id`),
  CONSTRAINT `fk_Facture_Membre1`
    FOREIGN KEY (`Membre_id`)
    REFERENCES `librairie`.`Membre` (`id`))
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `Commande` (
  `prix` DOUBLE NOT NULL,
  `quantite` INT(11) NOT NULL,
  `Livre_id` INT(11) NOT NULL,
  `Facture_id` INT(11) NOT NULL,
  CONSTRAINT PRIMARY KEY (`Livre_id`,`Facture_id`),
  CONSTRAINT `fk_Commande_Livre1`
    FOREIGN KEY (`Livre_id`)
    REFERENCES `Livre` (`id`),
  CONSTRAINT `fk_Commande_Facture1`
    FOREIGN KEY (`Facture_id`)
    REFERENCES `Facture` (`id`))
DEFAULT CHARACTER SET = utf8;

INSERT INTO `Livraison` (`modeLivraison`) VALUES ("FedEx");
INSERT INTO `Livraison` (`modeLivraison`) VALUES ("Purolator");
INSERT INTO `Livraison` (`modeLivraison`) VALUES ("Post Canada");

INSERT INTO `Paiement` (`modePaiment`) VALUES ("MasterCard");
INSERT INTO `Paiement` (`modePaiment`) VALUES ("Visa");
INSERT INTO `Paiement` (`modePaiment`) VALUES ("Cheque");

INSERT INTO `Categorie` (`Nom`) VALUES ("Roman");
INSERT INTO `Categorie` (`Nom`) VALUES ("Science");
INSERT INTO `Categorie` (`Nom`) VALUES ("Comedie");
INSERT INTO `Categorie` (`Nom`) VALUES ("Bande dessinée");

INSERT INTO `Editeur` (`Nom`) VALUES ("Alex Bourgois");
INSERT INTO `Editeur` (`Nom`) VALUES ("Elise Bellara");
INSERT INTO `Editeur` (`Nom`) VALUES ("Karter Brolino");
INSERT INTO `Editeur` (`Nom`) VALUES ("Tomas Rabster");
INSERT INTO `Editeur` (`Nom`) VALUES ("Mathieu Dufour");

--- ************************
--- *********************************************************************
--- ************************

INSERT INTO `Livre` (`Titre`,`Description`,`nombrePages`,`edition`,`prix`,`Categorie_id`,`Editeur_id`) 
VALUES ("Corps vivante", "En 1990, Julie Delporte n’a encore jamais vu de butch, mais sa tante préférée chasse et fume le cigare.",
	52, null, 21.99, 1, 1);

INSERT INTO `Livre` (`Titre`,`Description`,`nombrePages`,`edition`,`prix`,`Categorie_id`,`Editeur_id`) 
VALUES ("Le facteur de l'espace",
	"Bob aime bien sa petite routine et adore son travail: pour lui, la poste, c'est très important! À bord de son vaisseau",
	83, 3, 35.98, 2,1);

INSERT INTO `Livre` (`Titre`,`Description`,`nombrePages`,`edition`,`prix`,`Categorie_id`,`Editeur_id`) 
VALUES ("Je prends feu trop souvent",
	"Ce premier roman graphique exprime l’hypersensibilité qui accompagne la maladie au quotidien.",
	32, 0, 14.50, 1,3);

INSERT INTO `Livre` (`Titre`,`Description`,`nombrePages`,`edition`,`prix`,`Categorie_id`,`Editeur_id`) 
VALUES ("Mathieu Dufour, la bande dessinée",
	"«Je ne peux pas croire que toutes ces histoires farfelues et marquantes sont rendues dans une bande dessinée. Je ne vais jamais m'en remettre...",
	52, 2, 5.99, 3,4);


--- /************************************************************************************/


INSERT INTO `Membre` (`Nom`,`adresse`,`codePostal`,`dateNaissance`,`phone`,`courriel`,`username`, `password`) 
VALUES ("Mathieu Dufour", "5232 rue Debbry", "K4D3E2", "1992-01-01", "438-151-2233", 
	"abrad@gmail.com", "abrad@gmail.com", "123123");

INSERT INTO `Membre` (`Nom`,`adresse`,`codePostal`,`dateNaissance`,`phone`,`courriel`,`username`, `password`) 
VALUES ("Max Abriam", "5 rue Gouger", "M4D5F2", "2002-12-12", "514-611-2233", 
	"sprmmasc@gmail.com", "sprmmasc@gmail.com", "123123");

INSERT INTO `Membre` (`Nom`,`adresse`,`codePostal`,`dateNaissance`,`phone`,`courriel`,`username`, `password`) 
VALUES ("Dimitri Kornel", "532 boul. Debbry", "J4D9E2", "1998-05-11", "514-212-0023", 
	"alorpsd@gmail.com", "alorpsd@gmail.com", "123123");

INSERT INTO `Membre` (`Nom`,`adresse`,`codePostal`,`dateNaissance`,`phone`,`courriel`,`username`, `password`) 
VALUES ("Marie Dubois", "52 rue Debbry", "K5T3E5", "1997-11-01", "514-151-2233", 
	"fmneq9ts@gmail.com", "fmneq9ts@gmail.com", "123123");


--- /************************************************************************************/


INSERT INTO `Facture` (`date`,`Livraison_id`,`Paiement_id`,`Membre_id`) 
VALUES ("2022-03-16", 1, 1, 1);

INSERT INTO `Facture` (`date`,`Livraison_id`,`Paiement_id`,`Membre_id`) 
VALUES ("2021-09-11", 3, 2, 1);

INSERT INTO `Facture` (`date`,`Livraison_id`,`Paiement_id`,`Membre_id`) 
VALUES ("2022-12-23", 1, 2, 3);

INSERT INTO `Facture` (`date`,`Livraison_id`,`Paiement_id`,`Membre_id`) 
VALUES ("2021-04-01", 2, 1, 3);

--- /************************************************************************************/

INSERT INTO `Commande` (`prix`,`quantite`,`Livre_id`,`Facture_id`) 
VALUES (25.99, 1, 5, 3);

INSERT INTO `Commande` (`prix`,`quantite`,`Livre_id`,`Facture_id`) 
VALUES (14.50, 1, 3, 4);

INSERT INTO `Commande` (`prix`,`quantite`,`Livre_id`,`Facture_id`) 
VALUES (68.97, 3, 5, 2);

INSERT INTO `Commande` (`prix`,`quantite`,`Livre_id`,`Facture_id`) 
VALUES (90.96, 4, 6, 5);
