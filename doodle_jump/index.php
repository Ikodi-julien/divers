<?php
header("Cache-Control: no-cache, must-revalidate");

/* Connexion DataBase */
require('DBConnexion.php');
require('Player.php');
$DB = new DBConnexion;

/* Enregistrement du score */
if (
  isset($_GET['score']) &&
  isset($_GET['pseudo']) &&
  is_string($_GET['pseudo'])) {

    $pseudo = htmlspecialchars($_GET['pseudo']);
    $score = (int) htmlspecialchars($_GET['score']);

    $rqInsertScore = $DB->connect()->prepare(
      'INSERT INTO player(pseudo, score) VALUES(:pseudo, :score)'
    );

    $rqInsertScore->execute(array(
      ':pseudo' => $pseudo,
      ':score' => $score
    ));

    header('Location: index.php');

  }

/* Récupération des scores */
$rqScore = $DB->connect()->query(
  'SELECT * FROM player ORDER BY score DESC LIMIT 10'
);

ob_start();

while ($data = $rqScore->fetch(PDO::FETCH_ASSOC)) {

  $newPlayer = new Player($data);
  echo $newPlayer->pseudo() . ' : ' . $newPlayer->score() . '<br />';
}

$content = ob_get_clean();

?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="app.js" defer></script>
    <link rel="stylesheet" href="style.css" />
    <title>Doodle Jump</title>
  </head>
  <body>

    <div class="grid">
      <button id="startButton">START</button>
      <div class="control">
        <button id="left"><-</button>
        <button id="straight"><></button>
        <button id="right">-></button>
      </div>
    </div>

    <div class="result">
      <p>Pour se diriger : soit les flèches du clavier
         (flèche du haut pour s'immobiliser), ou alors les boutons ci-dessus :-)</p>
      <h2>Les meilleurs !</h2>
      <?= $content; ?>
    </div>
    <div class="endGameBox">
        <label for="pseudo">Pseudo : <input type="text" name="pseudo" id="pseudo" value="Jacquy"></label>
    </div>

  </body>

</html>
