<?php

class Player {

    protected $id, $pseudo, $score, $date;

    public function __construct($data) {

        $this->hydrate($data);
    }

    public function hydrate($data) {

        foreach ($data as $key => $value) {
            $method = 'set'.ucfirst($key);

            if (method_exists($this, $method)) {
                $this->$method($value);
            } else {
                echo 'problème d\'hydratation : ' .  $method ;

            }
        }
    }

  // SETTERS
    public function setId($id) {
      $id = (int) $id;
      if ($id > 0) { $this->id = $id;}
    }

    public function setPseudo($pseudo) {
      if (is_string($pseudo)) {
        $this->pseudo = $pseudo;
      }
    }

    public function setScore($score) {
			$score = (int) $score;
      if ($score > 0) { $this->score = $score; }
    }

		public function setDate($date) {
			$this->date = $date;
		}

      //GETTERS
  public function id() {return $this->id;}
  public function pseudo() {return $this->pseudo;}
  public function score() {return $this->score;}
  public function date() {return $this->date;}

}