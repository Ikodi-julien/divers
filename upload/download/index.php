<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../css/style.css">
  <title>Downloads</title>
</head>
<body>
<?php
  
  if (isset($_POST['pass'])) {
    $pass = htmlspecialchars($_POST['pass']);
    $mdp = "licorne";

    if ($pass === $mdp) { ?>

<section class="download">
  <a href="../index.php" class="upload__connexion"><button >Upload</button></a>
  <h1 class="download__title">Fichiers présents dans uploads/</h1>

  <div class="download__links">

    <?php

      $scandir = scandir("../uploads");

      foreach ($scandir as $fichier) {
        if (preg_match("#^[a-zA-Z]#", $fichier)) {
          echo "<a href=../uploads/". $fichier ." class='download__link'>". $fichier . "</a><br />" ;

        }
      }
    ?>
    
  </div>
</section>

<?php
    } else {
      echo "Those are not the Droids you are looking for.";
    }
  } else { ?>

  <p>Veuillez entrer le mot de passe pour afficher les downloads :</p>
  <form action="index.php" method="post">
      <p>
      <input type="password" name="pass" />
      <input type="submit" value="Valider" />
      </p>
  </form>

  <?php } ?>

</body>
</html>