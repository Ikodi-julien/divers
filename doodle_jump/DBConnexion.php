<?php

class DBConnexion {

  private $_db;

  public function __construct() {

    try {
      $db = new PDO(
      'mysql:host=localhost;dbname=***;charset=utf8',
      '***', 
      '***',
      array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)
      );

      $this->setDB($db);
  
    } catch (Exception $e) {
      die ('/* Erreur dans DBConnexion : '. $e->getMessage());
    }
  }

  public function setDB(PDO $db) {$this->_db = $db;}
  public function connect() {return $this->_db;}
}
