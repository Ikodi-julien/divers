<?php
$content = "";

if (isset($_FILES['uploadedFile'])) {

  if ($_FILES['uploadedFile']['error'] == 0) { 

    // Test si le fichier n'est pas trop gros
    if ($_FILES['uploadedFile']['size'] < 100000000) {

        // Test de l'extension du fichier, 
        $infosFichier = pathinfo($_FILES['uploadedFile']['name']);
        $extensionUpload = $infosFichier['extension'];
        $extensionAutorisees = array('jpg', 'jpeg', 'gif', 'png', 'ods', 'odt', 'doc', 'docx', 'xls', 'xlsx', 'xlsm', 'csv', 'xml', 'txt', 'fodt');

        if (in_array($extensionUpload, $extensionAutorisees)) {

            // Si tout est ok, envoi du fichier au stockage final
            $baseName = str_replace(" ", "-", $_FILES['uploadedFile']['name']);
            $isMoved = move_uploaded_file($_FILES['uploadedFile']['tmp_name'], 'uploads/'.$baseName);

            if ($isMoved) {
              $content = "Le fichier a bien été enregistré sur le serveur";

            } else {
              $content = "Désolé, il y a eu un problème et le fichier n'a pas été enregistré sur le serveur";

            }
        } else {

          $content = "Le fichier n'est pas d'un type autorisé.<br />
            Les types de fichiers autorisés sont : <br />
            'jpg', 'jpeg', 'gif', 'png', 'ods', 'odt', 'doc', 'docx', 'xls', 'xlsx', 'xlsm', 'csv', 'xml', 'txt', 'fodt'";
        }
    } else {
      $content = 'Fichier trop volumineux, la taille maximale autorisée est de 100Mo.';
    }
  }
  else {
    $content = htmlspecialchars($_FILES['uploadedFile']['error']);
  }
} 
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/style.css">
    <title>Upload fichier</title>
</head>

<body>
  <section class="upload">
    <a href="./download/index.php" class="upload__connexion"><button>Admin</button></a>
    <h1 class="upload__title">Uploader un fichier</h1>

    <form class="upload__form"
    action="index.php" method="post" enctype="multipart/form-data">
        <p>Formulaire d'envoi de fichier :<br />
            <input type="file" name="uploadedFile" id="uploadedFile"><br />
            <input type="submit" value="Envoyer le fichier"><br />
        </p>
    </form>

    <p>
      La taille maximale de fichier autorisée est 100Mo.<br />
      Le temps nécessaire à l'upload de votre fichier dépend de sa taille et de la rapidité de votre connexion...<br/>
    <p>

    <p class="upload__infos"><?php echo $content; ?></p>

  </section>

    
</body>
</html>
