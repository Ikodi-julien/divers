-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : Dim 08 nov. 2020 à 15:53
-- Version du serveur :  8.0.22-0ubuntu0.20.04.2
-- Version de PHP : 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `doodleJump`
--

-- --------------------------------------------------------

--
-- Structure de la table `player`
--

CREATE TABLE `player` (
  `id` int NOT NULL,
  `pseudo` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `score` int NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `player`
--

INSERT INTO `player` (`id`, `pseudo`, `score`, `date`) VALUES
(1, 'julien', 10, '2020-11-08 11:36:14'),
(2, 'Bob', 45, '2020-11-08 11:45:42'),
(3, 'Dave', 5, '2020-11-08 11:45:42'),
(11, 'Anonymous', 1, '2020-11-08 13:33:08'),
(12, 'Anonymous', 1, '2020-11-08 13:34:43'),
(13, 'Anonymous', 1, '2020-11-08 13:35:17'),
(14, 'Anonymous', 1, '2020-11-08 13:35:57'),
(15, 'Anonymous', 1, '2020-11-08 13:39:26'),
(16, 'Anonymous', 5, '2020-11-08 13:43:15'),
(17, 'Anonymous', 1, '2020-11-08 13:46:19'),
(18, 'Anonymous', 8, '2020-11-08 13:48:44'),
(19, 'Anonymous', 2, '2020-11-08 13:51:50'),
(20, 'the creator', 4, '2020-11-08 13:55:24'),
(21, 'the creator', 4, '2020-11-08 13:57:42'),
(22, 'Anonymous', 15, '2020-11-08 13:58:37'),
(23, 'Moi', 64, '2020-11-08 14:07:20'),
(24, 'Moi', 31, '2020-11-08 14:14:37'),
(25, 'Moi', 7, '2020-11-08 14:38:50'),
(26, 'Moi', 14, '2020-11-08 14:55:23'),
(27, 'Moi', 3, '2020-11-08 14:56:39');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `player`
--
ALTER TABLE `player`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `player`
--
ALTER TABLE `player`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
