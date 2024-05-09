-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: juegos
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `doctrine_migration_versions`
--

DROP TABLE IF EXISTS `doctrine_migration_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctrine_migration_versions`
--

LOCK TABLES `doctrine_migration_versions` WRITE;
/*!40000 ALTER TABLE `doctrine_migration_versions` DISABLE KEYS */;
INSERT INTO `doctrine_migration_versions` VALUES ('DoctrineMigrations\\Version20240307122612','2024-03-07 13:26:22',43),('DoctrineMigrations\\Version20240325115837','2024-03-25 12:58:45',165),('DoctrineMigrations\\Version20240325120338','2024-03-25 13:03:44',17),('DoctrineMigrations\\Version20240325121005','2024-03-25 13:10:23',14),('DoctrineMigrations\\Version20240325121202','2024-03-25 13:12:08',39),('DoctrineMigrations\\Version20240325121528','2024-03-25 13:15:31',23),('DoctrineMigrations\\Version20240326083604','2024-03-26 09:36:11',25),('DoctrineMigrations\\Version20240326084428','2024-03-26 09:44:35',40),('DoctrineMigrations\\Version20240326092019','2024-03-26 10:20:24',17),('DoctrineMigrations\\Version20240326121400','2024-03-26 13:14:06',24),('DoctrineMigrations\\Version20240326122213','2024-03-26 13:22:19',67),('DoctrineMigrations\\Version20240401112920','2024-04-01 13:29:31',32),('DoctrineMigrations\\Version20240401113039','2024-04-01 13:30:46',28),('DoctrineMigrations\\Version20240402133405','2024-04-02 15:34:39',234),('DoctrineMigrations\\Version20240402133542','2024-04-02 15:35:50',180),('DoctrineMigrations\\Version20240402150004','2024-04-02 17:00:16',203),('DoctrineMigrations\\Version20240403073320','2024-04-03 09:33:28',25),('DoctrineMigrations\\Version20240403083849','2024-04-03 10:38:55',36),('DoctrineMigrations\\Version20240425070051','2024-04-25 09:01:01',13),('DoctrineMigrations\\Version20240425070231','2024-04-25 09:02:39',25),('DoctrineMigrations\\Version20240425070503','2024-04-25 09:05:09',109);
/*!40000 ALTER TABLE `doctrine_migration_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `juegos`
--

DROP TABLE IF EXISTS `juegos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `juegos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `juegos`
--

LOCK TABLES `juegos` WRITE;
/*!40000 ALTER TABLE `juegos` DISABLE KEYS */;
INSERT INTO `juegos` VALUES (1,'Ajedrez',NULL);
/*!40000 ALTER TABLE `juegos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messenger_messages`
--

DROP TABLE IF EXISTS `messenger_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messenger_messages` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `body` longtext NOT NULL,
  `headers` longtext NOT NULL,
  `queue_name` varchar(190) NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `available_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `delivered_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_75EA56E0FB7336F0` (`queue_name`),
  KEY `IDX_75EA56E0E3BD61CE` (`available_at`),
  KEY `IDX_75EA56E016BA31DB` (`delivered_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messenger_messages`
--

LOCK TABLES `messenger_messages` WRITE;
/*!40000 ALTER TABLE `messenger_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messenger_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partidas`
--

DROP TABLE IF EXISTS `partidas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partidas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jugador1_id` int(11) NOT NULL,
  `jugador2_id` int(11) NOT NULL,
  `ganador_id` int(11) DEFAULT NULL,
  `acabada` tinyint(1) NOT NULL,
  `turno` tinyint(1) NOT NULL,
  `filas` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '(DC2Type:json)' CHECK (json_valid(`filas`)),
  `fichas` int(11) DEFAULT NULL,
  `tipo_id` int(11) NOT NULL,
  `cementerio1` longtext DEFAULT NULL COMMENT '(DC2Type:array)',
  `cementerio2` longtext DEFAULT NULL COMMENT '(DC2Type:array)',
  PRIMARY KEY (`id`),
  KEY `IDX_12114278390198F4` (`jugador1_id`),
  KEY `IDX_121142782BB4371A` (`jugador2_id`),
  KEY `IDX_12114278A338CEA5` (`ganador_id`),
  KEY `IDX_12114278A9276E6C` (`tipo_id`),
  CONSTRAINT `FK_121142782BB4371A` FOREIGN KEY (`jugador2_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_12114278390198F4` FOREIGN KEY (`jugador1_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_12114278A338CEA5` FOREIGN KEY (`ganador_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_12114278A9276E6C` FOREIGN KEY (`tipo_id`) REFERENCES `juegos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partidas`
--

LOCK TABLES `partidas` WRITE;
/*!40000 ALTER TABLE `partidas` DISABLE KEYS */;
INSERT INTO `partidas` VALUES (1,1,4,NULL,0,1,'[[\"\\u265c\",\"\\u265e\",\"\\u265d\",\"\\u265b\",\"\\u265a\",\"\\u265d\",\"\\u265e\",\"\\u265c\"],[\"\\u265f\",\"\\u265f\",\"\\u265f\",\"\\u265f\",\"\\u265f\",\"\\u265f\",\"\\u265f\",\"\\u265f\"],[\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"],[\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"],[\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"],[\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"],[\"\\u2659\",\"\\u2659\",\"\\u2659\",\"\\u2659\",\"\\u2659\",\"\\u2659\",\"\\u2659\",\"\\u2659\"],[\"\\u2656\",\"\\u2658\",\"\\u2657\",\"\\u2654\",\"\\u2655\",\"\\u2657\",\"\\u2658\",\"\\u2656\"]]',30,1,NULL,NULL),(12,1,4,1,1,0,'[[\"\\u265c\",\"\",\"\\u265d\",\"\\u265b\",\"\",\"\\u265d\",\"\\u265e\",\"\\u265c\"],[\"\\u265f\",\"\\u265f\",\"\\u265f\",\"\\u2658\",\"\\u265f\",\"\",\"\\u265f\",\"\\u265f\"],[\"\",\"\",\"\\u265e\",\"\\u265f\",\"\",\"\",\"\",\"\"],[\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"],[\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"],[\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"],[\"\\u2659\",\"\\u2659\",\"\\u2659\",\"\\u2659\",\"\\u2659\",\"\\u2659\",\"\\u2659\",\"\\u2659\"],[\"\\u2656\",\"\\u2658\",\"\\u2657\",\"\\u2654\",\"\\u2655\",\"\\u2657\",\"\",\"\\u2656\"]]',28,1,'N;','N;'),(13,1,7,1,1,0,'[[\"\\u265c\",\"\\u265e\",\"\\u265d\",\"\\u265b\",\"\",\"\\u265d\",\"\\u265e\",\"\\u265c\"],[\"\\u265f\",\"\\u265f\",\"\\u265f\",\"\\u265f\",\"\",\"\\u265f\",\"\\u265f\",\"\\u265f\"],[\"\",\"\",\"\",\"\\u2655\",\"\",\"\",\"\",\"\"],[\"\",\"\",\"\",\"\",\"\\u265f\",\"\",\"\",\"\"],[\"\",\"\",\"\",\"\",\"\\u2659\",\"\",\"\",\"\"],[\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"],[\"\\u2659\",\"\\u2659\",\"\\u2659\",\"\\u2659\",\"\",\"\\u2659\",\"\\u2659\",\"\\u2659\"],[\"\\u2656\",\"\\u2658\",\"\\u2657\",\"\\u2654\",\"\",\"\\u2657\",\"\\u2658\",\"\\u2656\"]]',29,1,'N;','N;'),(14,4,7,4,1,0,'[[\"\\u265c\",\"\\u265e\",\"\\u265d\",\"\\u265b\",\"\",\"\\u265d\",\"\\u265e\",\"\\u265c\"],[\"\\u265f\",\"\\u265f\",\"\\u265f\",\"\\u265f\",\"\\u2658\",\"\",\"\\u265f\",\"\\u265f\"],[\"\",\"\",\"\",\"\",\"\",\"\\u265f\",\"\",\"\"],[\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"],[\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"],[\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"],[\"\\u2659\",\"\\u2659\",\"\\u2659\",\"\\u2659\",\"\\u2659\",\"\\u2659\",\"\\u2659\",\"\\u2659\"],[\"\\u2656\",\"\\u2658\",\"\\u2657\",\"\\u2654\",\"\\u2655\",\"\\u2657\",\"\",\"\\u2656\"]]',28,1,'N;','N;');
/*!40000 ALTER TABLE `partidas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reportes`
--

DROP TABLE IF EXISTS `reportes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reportes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `reportador_id` int(11) DEFAULT NULL,
  `reportado_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_1D1D064B05C73D6` (`reportador_id`),
  KEY `IDX_1D1D06444B9BC43` (`reportado_id`),
  CONSTRAINT `FK_1D1D06444B9BC43` FOREIGN KEY (`reportado_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_1D1D064B05C73D6` FOREIGN KEY (`reportador_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reportes`
--

LOCK TABLES `reportes` WRITE;
/*!40000 ALTER TABLE `reportes` DISABLE KEYS */;
INSERT INTO `reportes` VALUES (5,'a',1,4);
/*!40000 ALTER TABLE `reportes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(180) NOT NULL,
  `roles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '(DC2Type:json)' CHECK (json_valid(`roles`)),
  `password` varchar(255) NOT NULL,
  `partidas_totales` int(11) NOT NULL,
  `partidas_ganadas` int(11) NOT NULL,
  `partidas_perdidos` int(11) NOT NULL,
  `partidas_terminadas` int(11) NOT NULL,
  `foto_perfil` longblob DEFAULT NULL,
  `color` varchar(10) DEFAULT NULL,
  `ban` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_IDENTIFIER_USERNAME` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Mario','[]','$2y$13$pdICLJX3Ft8dws.5JbL7nO9syf/ubehXOebqJzXJCB2ZohFzODF/q',3,2,0,2,_binary '�\��\�\0JFIF\0\0\0\0\0\0�\�\0�\0	( \Z%!1!%)+./.383-7(-.+\n\n\n\r\Z\Z-% %---------+-+---------------------++---------------��\0\0\�\0\�\"\0�\�\0\0\0\0\0\0\0\0\0\0\0\0\0\0�\�\0B\0\0\0\0\0!1AQq\"2a����#3B�\�R\�4b�\�Sr��\�$Cs�\��\�\0\Z\0\0\0\0\0\0\0\0\0\0\0\0\0�\�\0(\0\0\0\0\0\0\0\0!1AQa2�\"qR��\�\0\0\0?\0\�\�X�G�3U��\�Vr�FҔ}R�uDH\�qR��R �i\�V���R�\�3\�h\�\�7�S�4ɺ(�	�F�W\nu�\�\�zfa�\�������Ey>\�m\nk\�3��\���}-%Q�\�]{^JA\r���q\r\�G����\�c\�\�\�ruZ��Y���\�y\�\�\�\�l\�PwT�U6oS�\�)��c\�\��\�a���o�f�\���\�\�\�W[\��\�\�u\��\�\�\�\�\'\�R|9\�t\��\�>����֖\'�-2s�#xF�\�18]�P�\'u�\0�M\�s\�e\�3o�\�\�\�[7�+\�k\�GH\�\�ey4�U� Xac�a*Kh\�`�\�\�,EX�5��c\�VJU�RY%V\�VE\�j��/t\��:\�\�s��S���q�Ru\�QG;\�B9h�\�ȲQ-�$�\�Q��\�\�>���\�\�~�\�y/N=xzF�m3\�:����.N���d=a�\�O��I�\�\�\�|\�K�\�oԓ\"NQoGj(��\�&\�\�Hx�\�\�X@H#����S�B<\�\�$7�\�<S�\�/&\�Z:�e)mZ�\�L��%\�}�ŝ\�L\��c���\�.\�z\�wxq\�Ƕ�#~�a�m\�N\�o\�\�\n�%\�28\�v|�-�\�.4\��\�AC�%\�~\��ݿ��C�8�늫\�;\�\�n\��\�i�ʲ\�\�\�A{_��\�k\0\r\'\�;x=�%JU�8W\\\\y�\���\��V\�#\�e�k�\�\�3�7\�\�=#\�,��e�4@�W8\�p|���\�$������\0�����Y�U�Xs\�=��͡c\��r,z�\�B�?I$�H�RJT�X�\�S�^�p\�%8x���\�.]\r�8�NId��\n\�0����yRIC?t��:K\r,Ep�iaQֆFC\� \�\�z\�\�@�Yb(���@g\�\�v�\�{� � ��b���x�\��_8z\'n�Jթ��x�<\��\0i�\�b\�\nXz{͖d\�y��V��a��o\�\�#\�)c��;�M�\�2}�q�dSvz|8^8\�p�cH�V�6�5\'\�#���l=^�Ķ�ry�a\��+\�w�\�EڡZ\n/u͏\��6��ʬ���\�+j�,�\\������p\�\�sJ\��f5�\�)��R��\n5�\�\�!pG\���Sdb�\�EM\�\���\�\�\�\0-m>y\�&\��C��\��eSq�M�\�:\�\���\�\�\�D�͘����&��5�=\�{n\�D���U�9\�.\�nY&m*�Й\��\�8*<��Og~���Q�Ps��<��Ԫ�1�p����\�e���\�h.RZ$\�\�|eG@e\�5r5�8���貦�v2\�\r�\�\r�v\Z�\�\�\�\�}�V\�V��0�>+\rmaP�-,QTQ,���\�,N�+\�\"\�\�\�H\�\'\�-\�,=\�\�p�\�\�\��F!�G�\��t�\nĜ\'�BBp��Xt{\�\�b�3\��\0B\�-��El\�\�\�ҽ\�;�\�ق\�l�Y�)��\�\�y\�\�\�9�]A�W�I��\�Y�\�\�v�\�n7�G�\�s��\�\�z]�f����ʾ1wȸNlr\0\�7eHb�#Pr�aGb;U4j5K\�yY@)PZ�\�N�-�\�l�\�\�\�(*\�D�{���v�\�w���A\Z�?�\r~.��\�$6�\�\�y��{\�-|�\�C�j\�\"�\Z��\�w�$nSKkP\�\�Κ\\\�\\CQ��N\�`*[?\nB\�˗���@\�Vv��.�7z�Z\��e,r\�\�LpY?lmj��R\�tn� ��\�/���\�i\�xᵞK]�Y\�.�@���\�\"\���\"\�S\��^h�g;9�BhSI�\�t���ږ\�E\0c��hjm\�d+�je4h�ɹ\�3O�<ov;amvI��Z\��Q�\��Lr�ϣl�\�,�D���r�\�T��/��L%1�Cܦ8i<�D\�\�e>\�.7i\��\�\���#B\0�.23���\��:XE`�	ք$QA�V9C\�\�\�:?��!�(���\n�cq�\�\�\\5b�wNE\�`\��\�y�\�`>-4`l\�V\�\�WC\�1\�*�\��\0\�\�\�?N�e�\�\�\�M��\�꛵�\0\�\�񱘴\�T�wjg�\�=��v��pj�\�\��Rh\�\�TzeWUK�ao^�\�|p�(�\�\\�χ@\'Sڵ\�U7(\�\�\�\�P	�&F\�RzI�\�,\�uff �\�\�xnʬů\�\�N?\��3\��!	\�<�8�\�~ �`\�HƁ\�]��!4#\�3ݛ�!4�\�\�ϳ�qF}\�ک\�\�/\��\��r��4�\"ٙ)\�\��&YJ\�u1\�n:\�\��\�\�\�\�˔b�\�[\�ɞ\���<\�^��Wȳ�\�t�>X��\�9�G�\�p�G�\"�X�,�BD!�v��\�\�`�T<^�\0CB+\n(�vf\�\�b\�Qw\��use\�a�~\�\\\�⪄�\0n�\�Wl�\�\Z+�c\�\�\�9\�>�;Qrw<�\�Ф\0�\0�\�h��e\�%���ҽ\��U#;�\�;.O5�\�\�򹴫���?L�E��\�|�L.:K]�ټ+\r碥��\�\�\Z��\�]\�\�\�m�\�S��TpQa0�h��Ĥ\�;�e�\0A�\'\�\�͔�\�8�\�{��\0 ��\�\�%���\�F}F>\'�\�)\�\�c\�\�\n����T(�T�R���\�$��>�a6��\�\��*�\�,\��\0\�[�\�\�;P\�ty\\\�\\��_���\�~ �`\��\0GeP=K�_�&��Bf�<֤%\�2��W]fIvu\�p�aM))\Z^HǑ\�\�ljU\�\�r�i~)�*gM��\�&�\�\\\�|5\�\�\Z`\�\�c.��n�GR��\�\'\�\r�\�@ݖ�C\�kJ\�g�.P\�Y֝��TB�KL�\�\�=cp\�\�G��8EDPa1\�\'�}�\�M�b\�j\�,\��\�֊~VM\�\�_���oRQCc\�\�J��\�\�`1��X�\nDe���\��Be�<\�\�\�\�\�\��<�R�2�g\�\\�E>H\0R:\�k)�G�(\�lY|�(�I3�\r<#\�3��\06 \0�#G\�X\�N\�+$��M܁�\���F�-b�e�F<\�t=r>r\�V\�\�\�U\�\�@\�aRk�;�\�\�Dcj�\�y�C�ɉ�+�\�G�\0�n�A��i12�K<\�)i\�J�\�\���\�	\�ݷ\�O�\�\�t�\�\��o��t\�zIuj[!��A<�|\�h\�(W�L\0ڟ;H���A\�\�$\�\�\�̓\�qf��q\�)6�ep��^�V\'\�G\��\�\�G\��\�_f/M�\�j*\�G�\0�\�t��z\�H�N\�v���ǀ\Z��\�\�Kܢzls\�}��p�	ԣ\�V#��9�!�X\�Z\�\�\�5\�ڈ�i��TLUJ\�J�읎f4Y�\�S\���\�$g�\�-� r��\�\�m�.�ͮή\r0|����\\��\���X\Zk\�G\��X\'9I\�-MA#T9\�Ľ���\�\�����yD��]�\�l\�\�N�\�\�\rB/�}�Kv3/�\'��W�XPt�o\�=d�\�Pa�n\�\�\�\�qth\rG\�\��\���BR\�A���!nBx\�\�\0\�@��t*0\�Z�}��R>W\�\���X\�3�G\�H�;��_���\�[\�����u��p�����Q�\Z�r�T\\\�\��\0�̿0`^B�]G1x�[\���;\�!1	\�\� <Lj�\�a��zH@WRyDs����\'\�n\�@\�ޞ\�b\�\�J\"u4\�z�A�\�\�_�\�G/�S�zAV\n�>\\�R[\�r!\0�\�O\��SЎS�\�6~FBm\�����\�[L\�mO\��\�\�\�\'\�T\0s�ܦU._ÞB6\�T/�ݢ\�\�)K\�I�(��.�5\�$%���y��\�w��#X����fl�\Z�=_뻙��t�Q���mC����\�5ݾ\�&<���ϏQ\�m\Z���\��\0\�O:Uf��\�Ӡ\�q\�\n\�-\�:1D��\�;�.�?��/���\��\�B�\�ן9\��\0c�\�1�+�\0\�\'����\�j?Y�\'\�t4�\0�,)��\�\�Gjn�y�\0��CL|D-��԰\����I\�IYu\�Z\�x��o�\��G\�Y��*Q4ȿk3[zI�\�s�T���\�2BHA+�t\�\�\��W\�\�*~�� ǒFC��N8�԰�B%F��\�\�?O�t3&\�^�A\�\�/\���:h>@K\Z(�s\�\�\0N�\\}�g��\�6l�N�1\�\�\�\�-I\�3+\0F��@#�\�\�m�\�\�¸WUk\�S \�\�ⲕ4\�\�\�U\r�R�$\�.ËH��\�\�\�E�<��(��K\�\�{B~Z\�\�j�\�\�̓4�QiX\�\�\�j����P�\�M��ܬ�\�\�\�U�\��e��FXq$\�Sb�\�y\�\�1X�\�kkΕ��C\�\�\�\�\'Kl\�(0�B:Y,�΂qQ���H\�>Ə���?�2\����G�\�\�\�����\�oo�s呞5�N\"�\"�Z\�\�\�0@��\�o���\�n*\��[�@��\�R[�\�\�L��m|]T�\�\�\�y\\\�\�e\�\�a�%\�i֦G{ur\�O\�>R��5 F\0k`��\\Q,\�g\�Ng���\�mMrh\�[U\Z�\�\�\�Z\�9ry\�vv(T�m��ˣ� �\�\�\�7[V:K�XQ\� 7	��6E{]=\�\�D2\�͓\r+F��IHes�\� \�V�tr\�1*��ȵ\�~\�R�\�z\��\Z�\������E��H6l\�\�$\�\�\0\'/A�����\�/+�\�$-&>_L\�=�\�\�{i�\�>\�L\�8\�k�ɒ\�)�\\\0T/�t\0<���1H�\'U�\0���m�\�\�* \�i\�\0\�\0Z\�Ff���ȘJ��z��$i���m��GH�j!\�\�X�	\�\�\\ĳ\�\�jR\�\\P�\�˨�\�$s\�h�\�WL�\�5kP��7l�T~f��>�n+��V�+}\�4�q\�O���	\"��*1�M�\0\�p\�Ǥr�\�;�_�ޡţ�,\�sR/�\�\�\��s\�\�*�\�q4���zL)��\�n\�s\�,�E\��!$\�\�\�{_��+r��_\�\�X	o�\\\�dk�\0�I�\0E��\�^t�2|�ͧ�\0S�>���\�c\�[�\�\���\�r<�xEݪ8+#�d�m S\�ËI*�˧\��L}q x՗��\�M*�\�\�K\�1O�E\�JR�QT�\�QG`\�o\�H I�M��U�\�\Z�S�	$6faծ�ut\�ę�\�\�F\�u\���v\�\�\�����M�J�\�\�	Ux�\�\�O/i�\�\�, �\�E6oqE\��\� \�\�H\�<��K��CZ��\�Xf�<�\0�H��\��\�2�BRe�}�\�UF�X\�XdޗDE�\�\�\0�<�Ka\�\�\�Q/��O�u^\�1]\�_]d\��n���IT�pB\�\�u�\�\nǍ{Up�\�\�K<\�ZEXf[T\�\�Sm\�\�\��\��\�<\�R�\��4��\�\�X�LWj�4�X�\��\�\�X\�#���\�o\ni����KFig��ܘ%%\�<`�e^\�J�&\�\r˪\�_#�}%\�\���\0i#�\�	J-X\�\�#J\�L��IZ\"Ѽy\�埶r\�\ZE.v\�>\�;Y~%��ꅿBX�\0��41\�\��\�\�\��\�v�Sq\�\�\n�6�Ԁl\r\�I\�M%G��e6\�E�/h\r\�\�d\�*Z\��\�k+k\�\�\�FMN\��\�5\�ɇJ�-~2&&#��-\��ѕJ\�Յ\�H\�\�tr�\�[��)\�BB\�\�whh$n�U\�22b��n�,4U�\0g\�\�\�\��\�ׂ�\�\�d<�0$�l*\�h��\�\�n=ěF��yH#K�c\�$��\�\Z!s\0\�W�\�S�n��J\�rc��\�<:H\�J�\�-�Q�ϣ�\�Xzf\�2XX\��=[u���5M3#S$\�\n���7|�nr��\' ����ӧDw�\�\�\��\�����W=\�d\�M|>�\�z\�\�+\'\�\�ѳ^�N5���\0�z��\�\�<&e��\�v$�\�2X�l�\�S�_\ZGQ�&PB���$�U\�\'\�W\�[\�ʹ2��(I�1YGEm\Z�kXq��\�ŏ lj�\�\�&\�\n�ˣ\�(����A�G�U5\�6$��b�$Xˑ��J�(Sfe\�o��\��&\nHRz	�\�\�YY[%ћF\\��\�\��z�5\�{��P~i�8�\"`2\�$\�=>*2O�j�:k���I\�b�le$1�P�\�\Z(!vp�yB���\0V��\��\��qwa�)\�D<)!�[_�\�R�V��6[q��p\�΀�YE\�\"\�q�$Ì�\�\�9��ɹjS�\\���J\�Ŕs�r�Z*��-F�>t\���%|\Z�B@�\0\���z��p�ݔ��*5:y%0\�\�2@?˨\��[ ]zC�J\�\�YiK,��\�v9Z\�*6�\�\�;\�>gY\�ʈ	V\r\�/�۪\�\�U\�a\��aVI/sʫl*�P\�\�m���d���\�{\r<8�\�D|\"�\�\�|1,Z�6pl5R:�G�\'�\�\�h��D3��\�\�E?�_F\�/\�\�y\�Sp.�\�\�{\ZPA\�E���\�U\�[�d\�Ğ��^\�\��\�\�G9c�ņl�?9Z�\01�a�(Y\�\�8^5Q����E��Յ\�\n\�L�z7\�8H\�TW(ٝl##�̼\\$}(�B\�*\��\�:\\\ns�n,ڏ�\�','#e100ff',0),(4,'mario2','[]','$2y$13$Qt8FP9gqFaNgcHLmxvPhfOv/.PqgxfJDDdhGq79ioBj5jBoTMcrfS',3,1,1,2,_binary '�\��\�\0JFIF\0\0\0\0\0\0�\�\0�\0	 ( %\"1!%)+...383-7(-.+\n\n\n\r\Z\Z-% %-/---/+5--+-+---5----------+-++----+----------+-5-��\0\0�\"\"\0�\�\0\0\0\0\0\0\0\0\0\0\0\0\0\0�\�\0=\0\0\0\0\0!1AQa\"q��2B�R���\�\�br\�\�#��$3�\�\��\�\0\Z\0\0\0\0\0\0\0\0\0\0\0\0\0�\�\0-\0	\0\0\0\0\0\0\0!1AQ\"aq#2B����\�\��\�\0\0\0?\0׀^��J�K	R%`B0H�	���� BT \"U⣠ R�gu]㽤��\�\�dZ5\�P\�_\�J\�Ki&\�|\�Т\�.�\�1N\�0cU_�Ұs�u$���R�\�v��$\�\�$x�8\�\�օ�\�J�	s��:z���\rG\�\�\�\��\�\���L�Ӓ{�\�4�8I�$�\�\�qGO�\���\�\�8o�!�\�\�CyѲ��\�tG\�T\�l:zH���\'豎\��L�8�t$@��_K���q�Ĵ:lN����&\r���4\�\�\rƕ\�3������ uB���J��& B�!�@�!\0{BT(�� `�!\0\"�@�\�B\�\�B\0GԅJ\�_k�L>�2MB�f�E\�\�)\�k8ȥI\�a\�#npJ\�q،\�.\0\�\�d\�y\�VI֑f8^\�\��s\�K�I�l\'k\�ߜ\�\�Z�D\�o\�\�x\�V�dH\�y�jK�K��f\�=�&u\�Tq#-z�\�\�3�\�.d�\�F��\�R�	\��KP�\��\�$η\�\�J\�C2nv�\0�\�\�S\�\�{r�ߒ\�\�-�>k��\0\�\��\�\"6#�\�1!\�*\�v`H\�ǭ�)R\��i8wo�7\�y\�i؉3��\".5\�c\�\�\�\�\�.\�ON�JTo��4k�\�\�1\0\�a \�\�Xh\�1p<\��\�x\�P\�����y\�굎\�\����\0�LC`�\�\r�\Z�)\�~̌�\�\�\Z�a+�i�x���tNՌ��!	�� B\0�\n\0\�!\0tB�H� B\0D%H�!!L@Ja�|���sQ\�}\�P\\s�wLs\�\�$\���]Rn��V\�\�X\�>�i�ֈ�\�u�\�N\�8\�ߝ�\�J\�뺫\�T\�\�`o����\�;��\��\�YV٩��N���t17B\�\�yI�61y�\�3���\0;)�\�[:6�\�\'_N�^��|\�\�\���@\�R<3\�vg5�@���\�S��\r`?�\r�4������\�J\�e^����\\\�s\rċ��aFbh	Ԗ\�1�\�V�����*�\�\"�ia\�ɂF��+�5�\�\�dG�\��0|\�q˽�xu��ʤj6\�\�RbiXd\����\�fo\�!\�-\�m׎\���\�\��V�ec�/qlψ\0ƇX\�ך�p\\s\�T`mC\0�L�\�l\�u\�\�U�9�k`���\�6���?\�\��\�s>\�\'�~\�\�Lf�\�@K\\�\�bH\�V,;\�,s�E\�\�Os� Ԍ�Z\�I��\�\�5%��\�U����ǫ!S\"B B��B\0�\n\0\�D!*�!� B\0D%H�\�\�T�\n�ڎ.\�3.o�4\�U$�M�xڠ�\�<a�\�F\�\�\����?�Vq$��i\n�\�1/s�	��\��\�*�K\�\����\�\��\�\�\����\�\�4\��T��x2��$F\�C\���\�b\r��UAdbj�A?�5=\�\��\�y\�\�*�[Eh\�Oc\ZR�f]�G��Oqy-|\0\�K\�F=�\"@wꭸV��=\�Cn�Byª\n<;N)Ҋ�b\�9���&\Z|�\�{B���R<6\�\"y�>���6\�G\�qjO�\�F�\�\rd\�\����T׉6�ZG.�\��Y> boԙ>p��\�\�Q�\�\�\�\n�����#<ӺEJ.}H�NPC%\���{\�覐^\�ё\�\�\�E�\".=\�,l\�-\"\�c\�u\�Mv\�\0\�X��\�t8�?�ʯ\�d�\�$I\0u�\�[����rF�G��-\�L1��\�]�p�=#\�F0����adf �\�$@&\�R���-\�mja��pLXؙ���\�N\�\�\'8:�\�\�L��-��\�1��\�axLWs]�\�2\�h摡\�\n\�\�\�\�;�/�H\�l�Ԟc(~Rr<�Ap�hp\�ʄ]2s]�Bo����\�C\�b�-pB�!	��& HR�@�zB\0\��Q$	\�!*D\0��Z�n��\�	U�\�qƘ\"tRJ\�\��\��u:v�\��*f\"�q�d����d�u\n� HCR\�g%\�\�2t�\�\�:=Uk�4\��\�:\�V,���P�\�GW7\�-l�\�\�}d(��:6�r\��P�q!\�H\�\�\�@�7��x�\�r\�DN�e\�=�q\�g\�\��\�\�=G3ƈ6�2*s\'\�h�\�K\�_�3\�Q\�6*0�Z\�1ȍ�.U�aqU0\�3�Z\�#b<��l���x��j\�mV\�i\�i�7\�\�x���\�kx勪,\�8ݲC�c\�\�z\�\04hy\�vk\�;�˖LGQ\�g\\{�<Tv�-\�[���#Bbv�\�T�☆T˞F�c\�t�P�J���f�]#V\�uj���k��]��\r<Wj\�Y�c�\Z\�Hu3\�4\�Np=󙙔�c\�\�9\ZGAwD_HU��/��S\\E.\���Xp�<-uC3و\�\�\����D\�\�\�\�;\�\�\�O0/q\0\�p�Yc��m\�?\�h�żA�(\�|\"�K��\�Ԭ\�OŠ&5\�U~Q2\�%r\�\�\�0N�@�\�&^wN)\�p�A��\�A\�\��105\�\����\"��D��&$\�*\�R�~\�ϧY�k_qtp\�\�>a>\�\�՝ݾ��1\�c\\E\�HS ���x�Q���@�\����\�݉�q|�om\�~��\'A�\�=�x�8T�\�H4\�\�g�\�4\'\� ��Pe�\�ظ�R�7Rvq�&͸3\�L��_`YM����FAR�\02�0\���L\�+�Z\"\����T�L@�!\0B���\0�B�!\n$�B\0%H�\Z\�^I��\�\�q�\�@rW�2a�Ȭ\��VDC*ɝR�\�)�EabCz���|�܁27$�\�ޠ8�r<�\�Oݸ��\�l�E�\�fq��\�\��雀\�\�\�H\�\�\��uQ\�`5��d{Y6\�QH�\'[�\�2\�\r��\�7��\�\�I\�C�U\�\�� 161ӜL(\�`\���ɛ��\�\�mQR�YZ6�\�p�8�0\�,c^\�\�\0\'51\�eܷ_\�Ay\�m,��f�\0C�h�%��x�\�\��\0\n{@\�O��u�\\�\�>\��\�\���Br�����-\0�\r�\0��%���}e\���`\�\���fV��\�\�\0��\�YP���R��.`\�j9\�7�I�\Z@}\�\�T/\�\�&aj\�\�\�k�\�a�ƴɚ�,\��*\��7��L\�\�Pܳ\�M͸\�J.�c?\�LN|gv\r�\�\�K�s�N�p!W���\��.\�I\���\�7=\�\�ɮ-h\�x\�Rk@�\��\�\�QH\�7rl(� \�\�c\�\�\��WZ\�Iy\�ٺ�˔�=\�qÍ\0��\��\�!������\�)�V{�R\�R\�6�\����?\n\�\�mV\�\�\�\�\�I`w�\�\�Ôhc��ap\�ۃ΄m�\�=!Z0�Q�n@\�XI�k\�\\[?k,GU	m\�\�ǂq\�~<:�\��tq5�*գI\��\�nqc���P�\�3f�e�\�`5\�u>j�\�\��R�j<�\�k?$ę��ŖĵΨ\�Na]\�\�\�aʪM|D�R+B�B��B\0D!*\0T���!\"\0T�B\0�\�\�r�>J��\�\�\�l녣q;3Ax\�eS\�=��[\�o\��+\"ļ�ꩥD\��L�)2\�6z�\�Ss��-q\'Y �\�Y\�\�\�q�g�3x\Z�}U9�\�q�EG�-9`\�9t�\��S7�\ZA;H\��\0jю�C\�\�C�\"$���\�\�\0\'\�\�<\�u\�[�^���\�\�\�gR\�E��$\�\�\"B\�Z�\��練\�\�1\�*\�i9M����w�\�3�TK\�O�\�S\�\�\�8z�o��\r�\�0;� \�\�{\���\"Q��\�!�o��\0x1~*�w��&\�Imݠ�3\Z��\�k|Z��\�)�\��&\�bG\�K\�\��3R\�\�\�;�\�=�>\�*\�\�/��\�V�Jjٲ8\"��_IԱ�V\�k\�|x�\�`\�<\�b�t\�\�!�\��\�\�\�%�\�\�\'3\\\�\�\�t\�U�S	a\�;N\�\�6�|�\�N/\�\�G��S\'�\�\�\���\"\�\�bd\\ߢ��\�\�gQ����RxJ\�\�\�κ؋\�c�Q�,Q\�1\�\r´\�9��D�4w��\�\�ݝ�����E6\�x$�\�s\�W	\�\�fM&\0!�\�\�u�]b\�\��\0\�+�t<E�8�a\0\�\�#��%gV\�X{rï�\��O��\�I>�ک��Uaؑm�R?5s*���̍d	R \�\"�L@�!1�\0!\"����!� ��e�U3�\�\�\�L\�g�\�*\�PP\�S\��]s\�c�)\�=\�uzv<��UH\�*>�l�#J�[��\�r4�e�\�Q5\�fÍ7�A\�Ii�o�n#��4\��\��\�	��1򻤍-墊�[=W\�q\0�{F��r\�5o��F\�km\"L\�-sa�P|_[R� H����Yj@ix\�\n���(}�u.\"��.\�De/si�IqkD\�\�\�:IW^\�\�\�\�\�\�.k�d���64��\�諽��6�\�\�\�&1\��\0ꄨ\�\�0�\�^\�\�L��)�K\Z�0mv�U��\0Ɛ\�`�\ZF�l:�*�\�0N�\�A�BE\��\�o�\�W\Z6uA��\�\�V\�6\�H�\��Ɩ48�C�wI�\���:gg[�\�2�C�\�\0\�K�bN�\�U\�5g1�^#\�m\�nX\�t�U{\�T\�\���A�\�-\�\�\�,N�\�q��<V\�\�\r��\�\��jhܮ\�\\\�\��\�\�\�Q\�\"\�.���\n\�@�o\�\�hKM�\�Y�i�#��}g�3/��\"H\�+6>S��b|Ϥc��~o{\�C\�8EV�8��\��O�(\�R{[\�5\Zׁ2͡\�n�b�9Ϛb\ZֳB@@\'��Nzt\Z\�͝�\��$\���׍\�J�k��\�\�\�Zʦ�P���\\\�-\��\0\�I\�hh�\06\�(%\�qq\�&/˙P\\;\�\� .\�\�I�KKC\�3 \�y��1B\�Hl�\�\�\\\�/�\�a\�\�6�;U�WK]��nm����^�\�hp\�J�2gb�$\�\�\�\�\�Z�\r|\�㕓9\�\�\�R$\�%HR9��*D\��Bb!	\0!@\n�\"T��\0�J�\0�\�C\�!\�$|[N�\�T\�\r�=\�\�\�O8)�30\�$\�)�T��gQI�\"3��{+T\n�i\0\�n�4\�p�\�.\�\"�Z\�:m?�\�=\�8��J\�\�$��yA-w8��\\180\�<Hp��t&d\�\�d\��c��\� |\\�5�\�\�y�N�^h\���-2$�5\�F��\�#1\�Y�J�7�ꠀ\0�66\�\�\�4\�\�\�N]��/e\�\�`\��\�C\�{���nb�Զ\Z�\�9�p���\��\0��ɚR��7`�\';�ɗ\�*Nng0�=V?\�xZֈ�\�\Z\�S#�xy�e\�-s�&\����c\�gԇ��\�\�\\�\��\n\�\�K_�\�\�q�\�Y�\0���[\�,��\�+aI.k�\��\�\'-G5�\0\�\'�\01�\�[�T�n\�<&�^F���J\�\�\r*��N\��\�rN{/�s\�\�\0t��\Zȑ9~\n�\�ycl�1G���\�^�\0_�Hp�#��\�m�M��:G����%\�\�\�\Z\��^~D�\�\�KH�y\�.�f@\�g@i1��\�o򽶮lŢb;\�W\�\�$�}בk\�p7Z8�n�tы�\�\�_X��;\�\�a�4�u\�ã\�\��_�\�\�\�k\\f�	\�\���=5Z\�7g\���D؆�Q�\��]&\�\�eJ\�We\�2�H�%ĸ\0\��\�l\�Zf4�J\\T�\�x\Z\�Jx�&���BvR�bZ\�\�Ip.&�l`\�\�\�\�^�\�뱠\���.kr�I\�FY�\Zʆ��\�\�;��\�^\�\�M�m�f^\�Ϥ����O7\�\�6@v��ǅΉ��]}���ջ$\�Q\�9J~`.\�<@�\�E��n���\�\�\�?e�﮶�誮�����l\�U���x:m\�J�ḣN����\r��k�.�o\�J\�f\�\�h���zH�\�\"T��0B�B!	\0!LHJ$J�@\�(J�\0�7�F0��~�IFv����i�\�uM�\�	�T��gUI�\�eP%�ګ?�\�l\�\�r26��|K�ٛԚd�pAx�����qn%xw\�K.Z\�6sHն�^Fީ���԰�y�#�K� \�\�q\�2����\�u3\ZT\�\�U���iq2[/\\�GB1\�8<\r�� \�E&M�\�&X\�I\"\��i\�\�\�\�am3\�\�cO\�t;�\�=W_\�\�!�\ni�HeB6$�\�5ɘGC\�\��KH\�\�kE\�\rA�78��bYQv<�ތ\��\�2���͛1\ZH���_�{lF�	7�I;\���[̵�\0e�\�\���\�s�BGp����`�L��bK��dF�\�\�>.E\�gS;\�\��!L\�um2\�\�\���\�\��u\n\�v\�\�(v�ym�@\�K\n��\�,	�\0��.s\�i\"l#N^�\�.9E>ȧ�ȎI.�ڰ؆��\�v8A0H�4��k�\�dr\\*\�\�/��UC��q�)2\�\�\�\��\�\�\�Õ\�[#6�&A��#�}\�Uϼ\0ɃH\�i\�&���!\�ֆ\�\�\�\�trގsTǸW|\��Z_��g��\� M\�և\����\�\�4\�kz_�\0�I\�\���qR�\�L\�t\�t\��\�\�4l#\�HTF��r\�#R�\�^[}�\��~�\�~�	Lj=\�+A\�D�c\�\�Z%�>��\�\�Z�GR{\0{�S~h�~3\�\�&<�q�1��\�F�L:}7�;\�\�]C��PKR�KZ\�9\�z�ЏAbo�{B�\"\�%$���pL8�Èh��\�#\�x\�H��z�W�\�$��Xu:i��\�\r��\�D��7�\\��J\�ٞ \�TS0E��2-�\�J�\\��\�{D�\\8�9\��Ms�b3\�k�\���\��\0e�\�p�`#$~\�\�L\�\�mD�AP!@�%HP\0�!:!\"T!$J��G\�\��\0�������\��T�\0AM�WL���\�7�2荞�8.�\'(2\�I��&\�\�%�\�}\�s�ʭƨ�C\�9�\�\Z�@˭\�>jk\�N\�Ώ�\�3\�)��P��m7�\�\�G-�;4\�\�W�\�x0�\�\�~���.\�\�\�\�7�\�\�\�\�ٟ\�%jt+\�R\�ւݴ\0��\�\��\�#����$�-g���R�&\r6;P\'3Z\� ���\�Ɵh��x�dq��!�ivc	��\�(\�N���\�MK\�km \0\�	q���N\��!<�\�.\\><\�\�\n\�\�\�0Lx\�zÃ/��]�\�{i3�x⭊S$�ݓ\���<I9�%��뱺\�;[\��\�87\��\�\�|.�D\��+V\�Ί/q\�\�\�CA\�4���\�@���8sj`ۉ�{#k��p �I�uJI�e�\�އ�O��˂q\�\�^3��\�d\�\�L� 6�4\�?)<�*F\�N�GM7{5���\�q\�@}5\�P��6��\�E\��-�qE\�uG8ο\�ɣN�\�?\Znw\���4�\�`*�\�4���6a�a\�sQ��u\"\�m\�\�\�v�l\�p]��\�\�\�\�j:�b\Z\�\ZH�0bď\�\�\r\�)\�kCrL�\r`e�+��\r˩\�\�@cxS�\�\���0e2[+\�E�\���p��\\\�89�,m\�5\�!{n\\��42c�\�b8�����!M\�\�T�Np�\�5�\��s@<��zn\�\�S3#3r;b\�A�ru��	M\�+e�Β\�\�!�و\'�ܗ.4حE\�&H\�\��\�\�U\��C��%\�\�MK�zi�\0b\�ټ~\\Pß��~��8m\�\�쭫:\�4�\�#J�t��\r\�C\�f���\�Z1Wc�i�\�p���Bj�\��\0Q�+x!@P�y@�*��\�','#ff0000',NULL),(7,'fede','[]','$2y$13$sN9Fw.978EYQp9crTp7SUO6vg5dn5dsRsFhvc2o6FR./AlYxZZLUS',2,0,2,2,NULL,'#ffffff',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'juegos'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-09 16:03:31
