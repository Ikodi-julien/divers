<?php

class DBConnexion {

  protected $db;

  public function __construct() {

    try {
      $db = new PDO(
      'mysql:host=localhost;dbname=games;charset=utf8',
      'games', 
      'Planche7139',
      array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)
      );

      $this->setDB($db);
  
    } catch (Exception $e) {
      die ('/* Erreur dans DBConnexion : '. $e->getMessage());
    }
  }

  public function setDB(PDO $db) {$this->db = $db;}
  public function connect() {return $this->db;}
}
