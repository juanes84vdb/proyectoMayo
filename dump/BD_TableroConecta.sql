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
INSERT INTO `user` VALUES (1,'Mario','[]','$2y$13$pdICLJX3Ft8dws.5JbL7nO9syf/ubehXOebqJzXJCB2ZohFzODF/q',3,2,0,2,_binary 'ÿ\Øÿ\à\0JFIF\0\0\0\0\0\0ÿ\Û\0„\0	( \Z%!1!%)+./.383-7(-.+\n\n\n\r\Z\Z-% %---------+-+---------------------++---------------ÿÀ\0\0\Ð\0\ó\"\0ÿ\Ä\0\0\0\0\0\0\0\0\0\0\0\0\0\0ÿ\Ä\0B\0\0\0\0\0!1AQq\"2a‘¡±#3BÁ\ðR\Ñ4b¢\áSr‚’\ñ$Cs³\Âÿ\Ä\0\Z\0\0\0\0\0\0\0\0\0\0\0\0\0ÿ\Ä\0(\0\0\0\0\0\0\0\0!1AQa2\"qR‘ÿ\Ú\0\0\0?\0\ó\àXùG‡3UŽª\ÍVr”FÒ”}R¬uDH\ê¤qRªƒR ’i\ÇVœŠûR˜\Ó3\åœh\ã\ê7S”4Éº(²	F¦W\nu›\Ä\ázfa¦\Í™º›”›Ey>\êm\nk\Æ3ý¤\ÇÀŒ}-%QÁ\Ó]{^JA\r½•¡q\r\ÉG™¹Ž¦\Êc\ã¨\Ç\ÉruZªŠY€ý\Øy\Ì\Æ\×\Ûl\×PwTþU6oS©\ô‹)¨–c\Ä\òŸ\Ãa©ø™oþf¹\ö’°\Ø\Ú\ÝW[\ò±¤\ó\êu\Åø\Ü\ó\ã\ë\'\ÐR|9\Ït\ðˆ\æ>’—•šÖ–\'¢-2s#xF‘\å18]ªP†\'uÿ\0M\Ùs\öe\ò3o³\ö\Ê\Ö[7À+\ák\ñGH\Ñ\Éey4ûU¦ Xac…a*Kh\Ë`ª\Ç\é,EXý5’ƒc\ôVJURY%V\ÓVE\î˜j°ª/t\Åø:\Ð\Ös¡¶S¨©¶q’Ru\â¬QG;\ÃB9h‘\ÝÈ²Q-ž$«\ÕQ©‰\ñ„\ó>¶š\ç\È~ü\á¡y/N=xzFªm3\ä:›Ÿ”¤.N¤˜¤d=a \òO«´Iü\Ä\ô\È|\ãKŒ\ÍoÔ“\"NQoGj(ü¶\é&\Ò\ÚHxû\Ì\èX@H#‰«¥ˆS¡B<\È\Ð$7¿\Ò<S\Â/&\ÅZ:¦e)mZƒ\ÎL¥·%\Ø}¢Å\áL\Çþc§°ú\Ê.\Çz\Îwxq\ÌÇ¶¦#~¹am\ßN\ào\Ù\ì\n¥%\Ë28\Îv|Ž-\Ý.4\à—\ÑAC±%\õ~\õµÝ¿¼™C°8ëŠ«\×;\ò\Òn\ð²\â‚i”Ê²\È\Ø\ñA{_´þ\Îk\0\r\'\Ã;x=¥%JU¨8W\\\\yÀ\õ¿¼\÷€V\Ö#\Úeûk²\Ñ\è3€7\é\å=#\Ç,¯‘eŽ4@ÀW8\ãp|Š’§\æ$°²“±Àÿ\0™½¾ŠY UXs\Ï=—øÍ¡c\ô–r,zš\ÃB¦?I$•H”RJTˆX˜\ÚS‡^Ÿp\ô%8x„û¶\é.]\rµ8©NIdœ‰\n\ö0´£‚”yRIC?t“¹:K\r,Ep‹iaQÖ†FC\Ö \È\Èz\È\Ñ@ŠYb(­­‹@g\ï\ô‚v€\ï{ý  ¶·b¤£x¥\Åú_8z\'n€JÕ©©¿x¨<\õÿ\0i³\Åb\ê£\nXz{Í–d\Ùy™…V¯‡aø™o\ò¶\á#\×)c‹Á;øM¹\Û2}¢q²dSvz|8^8\í±p›cHƒV…6¦5\'\Þ#¨¹›l=^ŸÄ¶‹ryûa\Ýª+\Ôw¬\ÊEÚ¡Z\n/uÍ\õý6ˆ¢Ê¬§–‡\Î+jø,§\\†ý¬¤¸p\õ\ËsJ\Öþf5‹\Ú)‰§R•\n5•\Ö\Ç!pG\ô•ûSdb¬\ÕEM\ã\÷º\ô\ò\î\0-m>y\Í&\ÙüC½™\ÝþeSqºM…\ò:\É\Å™\ì\Æ\ÑD¢Í˜›ü€ý&ŠŽ5Œ=\æ{n\ìD¥‚£U³9\æ.\ËnY&m*°Ð™\ØÀ\ã8*<¾µOg~üþQ§Ps’©<º–Ôªº1“p¢­¼\å®e™û£\Õh.RZ$\Ì\ì|eG@e\å5r5•8š£“è²¦‚v2\ß\r³\á\r€v\Z™\Ø\í˜Â›\ð•\ñ}šV\í½V²Ž0²>+\rmaP¤-,QTQ,’¾‡\Æ,Nþ+\Ê\"\Ó\Â\ÉH\ä\'\ñ-\Ê,=\Ù\Ðp—\É\ò\ð§F!ÀGƒ\Ö„t²\nÄœ\' BBpŠ‚Xt{\ß\èb 3\÷ú\0B\Î-¢El\Ô\á›\îÒ½\î;›\ÂÙ‚\ÃlùY›)¥À\Û\Öy\æ\ã¸\î9±]A¾WI¤Á\ãY·\é†\Ýv§\Ün7¾Gž\îžs“Ÿ\Ç\ôz]­fûª²Ê¾1wÈ¸Nlr\0\Í7eHb¬#PržaGb;U4j5K\ÛyY@)PZý\ÒN¼-¬\ÙlŽ\Å\×\Ü(*\ÖD¾{¬Žvµ\ï¦w·”©A\Z¥?ž\r~.²…\Þ$6\Â\ç”y‚Š{\Ü-|½\æC²j\Ñ\"…\Z•™\êw‰$nSKkP\õ\ÐÎš\\\Å\\CQÀšN\×`*[?\nB\çË—• ®@\ßVv¾«.7zŒZ\×»e,r\æ\ÄLpY?lmj˜—R\Ãtnª ² \ä/Ÿ¬†\íi\ñxáµžK]©Y\ò¹.º@•‰…\ñ\"\ñ¹™\"\ÏS\ìÀ^h’g;9øBhSI\öt£ø¢Ú–\ÓE\0c˜Œhjm\Òd+’je4hýÉ¹\á3O‰<ov;amvI†‚Z\ÔÁQü\ÆýLržÏ£l´\ë,ŽD•§§r\ÙT„®/¬¹L%1ÀCÜ¦8i<ŸD\ô\ße>\ð.7i\ò¤\ò\ÓýŸ#B\0….23¡‘\õ:XE`	Ö„$QA„V9C\Å\ï\ô‚:?¡‚!œ(„‚\ncq¨\Ï\Ú\\5b•wNE\ò`\ßú\Êy©\Ç`>-4`l\áV\Í\æWC\å1\ë*‘\Öÿ\0\Ý\Ë\ô?N±e»\ñ\Ø\ËM·\îê›µµ\0\Ù\ìºñ±˜´\ÄT¢wjg¯\å=·Áv‰pj³\õ\÷˜Rh\í\ïTzeWUKao^“\Ú|p³(µ\Û\\³Ï‡@\'SÚµ\ñU7(\í\Å\õ\ÜP	±&F\íŽRzI©\Ü,\Ìuff Ÿ\ôŒ¥\ÚxnÊ¬Å¯\Ì\á‚N?\×ý3\âˆ!	\Ù<‹8À\Ã~ †`\á¿HÆ\ê]œü!4#\Ã3Ý›ü!4–\î\ÌÏ³©qF}\ÑÚ©\Ý\á/\ðŒ\ßƒr‰4Á\"Ù™)\Ò\Èý&YJ\äu1\Çn:\Ç\é¢\Æ\Ú\Ç\ñË”b\Ê[\ÄÉž\÷Ž‡<\á^ÀŒWÈ³¢\Út>X‹²\Ã9ÀGƒ\ÖpøG¬\"±X‚,€BD!Œv‡‹\ß\è`ˆT<^ÿ\0CB+\n(“vf\Ç\Äb\ÜQw\Ìuse\óa²~\Í\\\Øâª„ÿ\0nˆ\ßWl\è\Z+œc\Ø\ð\Ã9\ôŒ>‹;Qrw<„\ÞÐ¤\0¨\0¶\Êh¶§e\é%þŠ«Ò½\Â½U#;±\ï;.O5”\æ\êò¹´«ƒ»þ?L±E»¶\Î|¶L.:K]Ù¼+\rç¢¥¹‘\ô\å\Z¦·\Ò]\ì\ì„\Ïm\õS¦¡TpQa0¿h´Ä¤\ö;¶e¿\0A¶\'\Ø\òž„Í”§\Ú8‰\÷{»ÿ\0 –¾\ñ\à%˜²ø\æ¥F}F>\'£\Ê)\é\Ûc\ì\É\nƒ†©¹T(ºT»R¨À\Þ$¹¿>‚a6®À\Ä\á¿‹*\Î,\ôÿ\0\ï[\Ð\ç;P\Ëty\\\Ú\\˜û_²°À\Ã~ †`\àÿ\0GeP=K³_„&®Bfû<Ö¤%\æ2¡øW]fIvu\ñp‘aM))\Z^HÇ‘\ð›¤\ÍljU\î\Úrûi~)•*gM»ˆ\î&º\Û\\\ã¸|5\Ö\ò\Z`\Ö\×c.°Àn‹GR®Š\å\'\É\r°\ä@Ý–†C\ÄkJ\Êg.P\ÌYÖ¬ùTBƒKL¢\Ç\Â=cp\Ø\÷G¬€8EDPa1\ð\'¬}›\öMŠb\ë j\Õ,\ô•\ÅÖŠ~VM\æ\ñ_€µ¬oRQCc\Ä\òJ‘ž\ì\×`1€©Xü\nDe¾·¬\àBeº<\Ø\ß\È\Í\Ö\Åû<ÁR³2µg\ç\\†E>H\0R:\Þk)€GŸ(\ælY|¯(–I3¡\r<#\ì3‡¢\06 \0°#G\ÖX\ÐN\é‘+$¬¼MÜ•\ØýF©-b•e“F<\Ùt=r>r\ÙV\é\Ð\ÅU\Ë\Ì@\âŸaRk£;ƒ\ì\ÕDcjˆ\Êy†CúÉ‰±+\ÞGÿ\0™nŽA±“i12¿K<\Ò)i\ìJ§\Ä\è£ü»\Õ	\÷Ý·\ÎOÁ\ì\Út\Ö\ìúoµ‹t\ÈzIuj[!©ùA<¹|\Ìh\Â(W’L\0ÚŸ;H”›¾A\Ð\å$\Û\î\ïÌ“\ó‘qf¾q\Ä)6¿ep•®^ˆV\'\ÇG\îšü\Î\îG\Ôš\Ú_f/Mƒ\ájï­*\ÖGÿ\0¥\Çtž¡z\ÏH­N\ì¾vŽ‘¼Ç€\Z‘©\ò\ã’KÜ¢zls\í}€p¿	Ô£\ñV#ú9¤!‚X\ËZ\Ô\Ú\ã5\ÒÚˆúi†TLUJ\ïJ¦ìŽf4Y¯\ÂS\ö¦¾\î$g¶\Ð-‡ r‚º\î\Îmº.øÍ®Î®\r0|§“¶ƒ\\ƒ¬\ô½‡X\Zk\ÐG\É—X\'9I\î-MA#T9\ÅÄ½”™‘\Å\ö”›yDŠ¶]•\Ôl\Õ\ÜN˜\Õ\í\rB/¸}§Kv3/–\'‚ˆWXPÂ„t°o\è=dÀ\ÂPa‹n\Ì\ì\ß\âqth\rG\ï\Ûù\ô©ŸBR\ËA–›£!nBx\ç\Ù\0\Û@Ÿøt*0\êZš}§³R>W\Í\ô±¨X\ò®Œ3ýG\ÖH¢;Àú_š¶ž\Ä[\Ú¶ž£œu†„pù‹‹ŽºQ¤\ZœrT\\\ã\Ôÿ\0¿Ì¿0`^B†]G1x [\õ†ƒ;\Â!1	\ò’\é› <Ljº\÷a·zH@WRyDs‘‚­”\'\Òn\÷@\ò‘Þž\òb\ã\ÚJ\"u4\ÔzÀAš\Ø\ò_Ÿ\ìG/žSúzAV\n·>\\¢R[\ær!\0¿\ïO\÷ŽSÐŽS—\å6~FBm\ö‚–¬­\Ù[L\ÜmO\õš\Þ\Ô\ì\'\ÄT\0s•Ü¦U._ÃžB6\õT/Ý¢\á\é)K\ØIû(ª.¬5\Ù$%¯ žy‹¬\â£wÁ#X°‹—¹fl«\Zº=_ë»™ŸøtþQœÀœmC«·¼¿\ì¾5Ý¾\ò&<±´¬ÏQ\Ëm\Z€œ„\èÿ\0\ðO:Uf§\ËÓ \Åq\È\n\ð¯-\ä:1D€£\ö;þ.·?¯/½§û\ôž\ÅB¥\õ×Ÿ9\ãÿ\0cŸ\â1ü+ÿ\0\Ø\'®¥ˆ¸\Ôj?YŸ\'\ät4ÿ\0‚,)§¨\ò\ÔGjn¼yÿ\0¼‹CL|D-ü¡Ô°\ô¼–ŒI\ÏIYu\ØZ\ßx‡ƒoü\ÏûG\ÜYˆ‘*Q4È¿k3[zIµ\ó³sTŽ¨Œ\Ó2BHA+¯t\Æ\ê\àW\ð\Æ*~ƒ Ç’FCœ‘N8ªÔ°ŠB%F»®\ïµ\Ï?O¬t3&\ç¦^‚A\Â\Ô/\Þ˜’:h>@K\Z(›s\å\Ò\0N¹\\}¤g¤¡\Ý6l¬Nƒ1\Þ\å\Ç\Ñ-I\Ô3+\0F @#¤\è\Ém®\Ñ\ÔÂ¸WUk\ñS \Ô\íâ²•4\È\Þ\ÖU\r‘R©$\Ô.Ã‹H¸¾\Ì\Õ\âE—<¥‹(–¦K\Ø\Û{B~Z\Ú\Ìj»\Ì\ÍÌ“4§QiX\è\Ë\ñ‡jÁ©š•P \ËMƒ‰Ü¬­\È\ç\ÒUˆ\ö¬e¯•FXq$\ÏSb\óy\Ó\Æ1X¶\ßkkÎ•ú³C\×\Ç\à\ó˜±\'Kl\Ì(0 B:Y,‚Î‚qQŽ€ûH\Ð>Æþ¦¿?‚2\ãø‹ýG¼\Ü\ã\öú›¢­\Ãoo€så‘ž5°N\"Ž\"Z\Ê\ê\Ã0@¸ü\Êo•ˆ¸\În*\í©[½@³¹\ÔR[\ïŸ\ìLš™m|]T£\Ê\è¶\Çy\\\ã\áe\Ì\õaý%\ÆiÖ¦G{ur\ã½O\Ô>R–•5 F\0k`À¢\\Q,\ég\ÊNg¡ý¼\ÅmMrh\ñ[U\Z‰\ß\î°\ÌZ\ä9ry\Çvv(T¤mª”Ë£© ®\ò\ç\à7[V:K™XQ\Ä 7	ˆ½6E{]=\ó\ÓD2\ßÍ“\r+F‚“IHes¾\é \ð’V¯tr\ó1*·„Èµî\Ô~\äR¯\Üz\Ú†\Z˜\í¹œŒ¸¤E»°H6l\Ð\Þ$\Ô\à\0\'/Aû¼¤›\è¿/+¶\Î$-&>_L\à¦=¾\ð\é{i—\í>\ÞL\Ð8\ÈkŒÉ’\Ñ)š\\\0T/‡t\0<­”š1H¾\'Uÿ\0™ÂŸ™žm\Û\õ* \åi\Ø\0\î–\0Z\ìFfü´úÈ˜J žz„$i†™µmžµGHøj!\è\êXû	\ç\Ø\\Ä³\Ã\ãjR\Í\\Pø\ËË¨ù\é$s\ßh’\ÓWL \Ú5kPø¥7lµT~f³>’n+¾½V±+}\Ð4‘q\ÉOø–ª	\"­«*1¸Mÿ\0\åp\áÇ¤r¾\Ó;„_„Þ¡Å£,\ÏsR/±\ö\Í\ô¶s\Ï\ñ*\Óq4¸ý©zL)…Á\ân\Ís\Æ,²E\ð‹!$\à°\Û\í»{_Œ€+rŸ´_\ã\î£X	o¡\\\ãdkÿ\0»Iÿ\0E™¿\í‡^t›2|‡Í§ÿ\0S›>¡ü¶\êc\é²[‹\ó–\ßÀ‘\ár<xEÝª8+#ºd²m S\ØÃ‹I*žË§\ÊýL}q xÕ—¨¸\÷M*ª\Þ\ÖK\Ô1OƒE\ÒJR±QT‚\ÆQG`\Ôo\ñ¸H IÁM®¬U‡\æ\Z‰S—	$6faÕ®¤ut\áÄ™\Æ\×F\Ïu\×ü¿v\ã\Ü\Øü´—¸M¥J¢\Ø\Ô	Uxž\é\ÍO/i™\É\Ø, ½\æE6oqE\î­\ã \Ë\ÂH\â<£»KŽ…CZù‚\ÙXf¬<Á\0úH¨«\å©\Â2“BRe¥}º\ÎUFúX\÷XdÞ—DE«\Ú\Ý\0—<¥Ka\á®\ò\ßQ/‚ŸO’u^\Ó1]\Õ_]d\Ú˜nŒ†ºIT¶pB\á\Ôu\ä›\nÇ{UpŽ\æ\ìK<\ã¸ZEXf[T\ò”\ÛSm\Ñ\Ã\Úý\ê‡Â‹›\è<\ÎR·\Óø4ƒ\à\ÄXûLWj°4·X»\ÜÀ\Ç\ÛX\Ö#´¸Š\Ùo\niü©›¬KFigž§Ü˜%%\ì<`ûe^\ÉJ¿&\ã\rËª\Ü_#Ÿ}%\î\÷¹ÿ\0i#²\ç	J-X\Í\Ñ#J\ÂL¬¹IZ\"Ñ¼y\ÝåŸ¶r\å\ZE.v\Ï>\Ú;Y~%¾ê…¿BXÿ\0©š41\×\Êú\Ì\î\ÎÁ\Õv¹Sq\Ä\Ë\nû6µÔ€l\r\ÏI\ØM%G™”e6\åE–/h\r\Ã\Òd\Î*Z\î·\Ìk+k\à\í\ÄFMN\íƒ\Å5\ÍÉ‡J¨-~2&&#Ÿ´-\ÒžÑ•J\è–Õ…\çH\ß\ÊtrŸ\ä[„†)\ÇBB\Ä\Äwhh$n¦U\æ22b Žnˆ,4Uÿ\0g\à¨\Ã\È\÷‡\Î×‚¸\ò\î™d<„0$²l*\×høˆ\É\Õn=Ä›Fª¿yH#KŽc\ö$‚¼\à\Z!s\0\ó¶Wý\ÚSn§J\Ürc””\Ë<:H\ØJ \å-©Q·Ï£¨\ØXzf\ö2XX\Ý=[uŽŒ5M3#S$\É\n±¬7|£nr»™\' ™‘¶–Ó§Dw\Ø\èƒ\Ä \ó˜ý§´ªW=\ód\áM|>¿\Ìz\È\Ý+\'\í\ÎÑ³^žN5ˆ¸ÿ\0 zœº\Ì\Õ<&e˜’\í™v$±\õ2X«l­\â‰S¶_\ZGQ£&PB±”¬$ºU\Ä\'\áW\Î[\áÍ´2Žž(I”1YGEm\ZœkXq‡´\ÅÅ lj™\ç\é&\í\n™Ë£\Ê(—¯¥†AùG´U5\Ü6$Šb¾$XË‘™J»(Sfe\îoœ¤\Úø&\nHRz	º\Ä\×YY[%Ñ›F\\˜¢\Õ\ÌÀzˆ5\ò´{û¹P~i§8À\"`2\Ï$\Ê=>*2O²jƒ:k®¼§I\åbúle$1¬Pœ\â\Z(!vp…yB¨‡»\0V€‚\å–\àŽqwa€)\×D<)!·[_¬\ÕR Vžù6[q”´p\êÎ€YE\ô\"\äq›$ÃŒ–\×\Ï9ŸÁÉ¹jS\\™Š»J\ÇÅ”s‹ršZ*ƒ±-F™>t\Ôþ’%|\Z­B@€\0\èž²z p´Ý”²©*5:y%0\ì\Ã2@?Ë¨\÷–[ ]zC§J\Æ\ÆYiK,™›\Äv9Z\å*6ù\Ï\ï;\×>gY\ØÊˆ	V\r\Ó/”Ûª\Ø\ÉU\ëa\Æ¿aVI/sÊ«l* P\Ø\èm‘‘›d¸ü‡\Ò{\r<8°\ÈD|\"‘\á\Ñ|1,Z‰6pl5R:‹G\'²\á\ðh¢ÁD3…§\Å\õE?¤_F\õ/\à\ñŸ‚y\âSp.­\Ð\Ú{\ZPA\áE¤‰·\ÃU\ò[ûd\ðÄž¥ü^\Ï\í¶\ë\äG9cÅ†l´?9Zÿ\01ÀaŒ(Y\å\Ü8^5Q£ª³E£•Õ…\ä\n\ôLºz7\á8H\êTW(Ùl##³Ì¼\\$}(ùB\æ*ÂŠ\ÅÁ\å:\\\ns¢n,Úÿ\Ù','#e100ff',0),(4,'mario2','[]','$2y$13$Qt8FP9gqFaNgcHLmxvPhfOv/.PqgxfJDDdhGq79ioBj5jBoTMcrfS',3,1,1,2,_binary 'ÿ\Øÿ\à\0JFIF\0\0\0\0\0\0ÿ\Û\0„\0	 ( %\"1!%)+...383-7(-.+\n\n\n\r\Z\Z-% %-/---/+5--+-+---5----------+-++----+----------+-5-ÿÀ\0\0®\"\"\0ÿ\Ä\0\0\0\0\0\0\0\0\0\0\0\0\0\0ÿ\Ä\0=\0\0\0\0\0!1AQa\"q‘2B¡R‚±Á\Ñ\ðbr\á\ñ#¢’$3²\Â\Òÿ\Ä\0\Z\0\0\0\0\0\0\0\0\0\0\0\0\0ÿ\Ä\0-\0	\0\0\0\0\0\0\0!1AQ\"aq#2B‘¡±Á\ð\ñÿ\Ú\0\0\0?\0×€^«J„K	R%`B0H•	€ˆ„© BT \"Uâ£  R¼gu]ã½¤¥‡\æ\âdZ5\ÕP\ñ_\ÄJ\ÆKi&\Æ|\âÐ¢\æ‘.¬\Ö1N\ð0cU_‰Ò°s®u$Á¸žR²\çvú±$\ä\É$x³8\ß\ÉÖ…\íJ•	s¤ý:z¨¹ü\rG\ä\Ú\ê\ö—\Ê\ìü‹LÓ’{„\ã4œ8I‰$¹\ç\çqGO…\Ð—•\ã\Ñ8o®!Á\Æ\ÇCyÑ²¨\ÉtG\ÑT\ñl:zH”­ª\'è±Ž\ÚÁL‡8’t$@°¼_K­³œq•Ä´:lN À–“&\r¼”£4\È\Ê\rÆ•\é3¦ýþ‹»¬ uB•ŽJ‹„& B€!©@„!\0{BT(Œ„ `„!\0\"¤@„\ÄB\ò\÷B\0GÔ…J\í_k™L>2MB‘f¶E\Ì\ë)\÷k8È¥I\âa\Ä#npJ\ÈqØŒ\ï.\0\Ü\îd\ßy\ò…VIÖ‘f8^\Ù\çŒs\ÜKœI¼l\'k\Üßœ\è¢\ÝZýD\éo\Ý\áx\ÅV±dH\ÛyºjK‹Kºžf\ö=”&u\ÄTq#-z™\ö\Ñ3¬\Â.d“\ÎFŸš\ïRœ	\Ø·KP†\âš\ê$Î·\Ó\ÕJ\ÅC2nvÿ\0”\ê‹\ÆS\Ð\×{r¸ß’\à\Ø-’>kþÿ\0\Ò\àÀ\Ö\"6#¯\Ñ1!\í*\Ív`H\ÒÇ­¿)R\Ü´i8woˆ7\å¤y\ÄiØ‰3¨\".5\Öc\ê¹\Ñ\Ä\å\Ì.\è´ON›JToü´4k€\Ü\ã1\0\Æa \ô\ÝXh\Ô1p<\Äû\è¾x\àP\Ó“¡–¤y\ØêµŽ\Ë\ö™µš\0øLC`ƒ\Æ\rÁ\Zù)\Æ~ÌŒ£\î‹\Þ\Z®a+²iƒxü¹tNÕŒ­„!	ˆ„ B\0©\n\0\ò„!\0tB¢H„ B\0D%H€!!L@Ja‰|žŸ¢sQ\ñ}\ôP\\sˆwLs\Ï\Ê$\ô‘·]Rn•‚V\Ì\ë·X\×>¹i€Öˆ\Òuý\î©N\Å8\éß­\ÉJ\ãëº«\ÝT\è\â`oûÀª\Þ;”™\åû\õYVÙ©ý¨Nù„¸t17B\æ\ÇyI½61y©\õ3‹ ÿ\0;)½\Å[:6þ\ç\'_N¶^™‚|\ä\Þ\Ò ›@\õR<3\Ùvg5°@—³ \ôS•¸\r`?™\r–4–½³¨š¥\å£J\Ãe^©˜ø\\\Òs\rÄ‹˜üaFbh	Ô–\é1ú\ÞV…‰Á½¬*œ\æ\"¨ia\ðÉ‚F²¨+ƒ5À\ì’\ÒdGˆ\ë‘0|\ÊqË½Šxu¢¸Ê¤j6\õ\óRbiXd\ôýù¤\Åfo\Ä!\Ò-\åm×Ž\ô†À›\ë\õýV„ecš/qlÏˆ\0Æ‡X\ç©×š±p\\s\éT`mC\0€LÀ\Ìl\íu\×\ôU‡9Žk`’ù¹\Ú6žþÁ?\Â\× \és>\ê\'ƒ~\á\ÂLf˜\Ã@K\\¤\íbH\öV,;\ä,s²E\íª\ÚOs‹ ÔŒ†Z\àI¿¢\×\ð5%¿\èU°•¢¹Ç«!S\"B B˜B\0©\n\0\ò„©D!*‰!„ B\0D%H€\å\ÎT•\nµÚŽ.\Æ3.o 4\ßU$¬M“xÚ ¬\ë·<a½\ÍF\ß\Å\Öúù¹?ŽVq$¼ùi\n“\Ç1/sœ	˜ˆ\ò¨\Í*ûK\ð\Ãø™À\Ö\Êº\ï\á\÷…¨\Ý\Ö4\÷üT“«x2™€$F\áC\×»µ\Öb\r‡ûUAdbj’A?¿5=\Â\ñ™\Ðy\ò\ó*»[Eh\àOc\ZRŽf]–G’–Oqy-|\0\àK\ÍF=û\"@wê­¸VŠ¤=\ÆCn·ByÂª\n<;N)ÒŠ‘b\Æ9…³¹&\Z|¯\ä¥{B¯ŽR<6\Ò\"yˆ>«£»6\ÆG\ÑqjOª\ÊF›\ê\rd\Ü\õŽ¿‡T×‰6­ZG.”\ØšY> boÔ™>p¤ø\Ï\ÅQ©\Þ\á\é\n€›´±·#<ÓºEJ.}H¢NPC%\Æ¤—{\éè¦^\ÌÑ‘\á\Æ\×Eþ\".=\Ó,l\é-\"\âc\Ôu\ÑMv\ß\0\êXªš\åt8¸?¬Ê¯\Ñdƒ\Î$I\0u¹\õ[±»˜rF¥Gºƒ-\ÔL1úŸ\á] p=#\ÑF0Ÿª•Áadf Œ\Í$@&\öR‘“¼-\ïmjaŽ¹pLXØ™‘¦º\ì¶N\Ç\ñ\'8:ƒ\È\ÍL†‚-™±\á1¶‡\ÙaxLWs]•\É2\×hæ‘¡\ó\n\÷\Ù\Î\Ñ;¿/§H\ÓlŒÔžc(~Rr<¶Ap‘hp\ÐÊ„]2s]•Bo‚¯\ßC\Ïbœ-pB€!	ˆ„& HR¤@‘zB\0\ô•Q$	\Â!*D\0‹Z€n½½\à	U®\ÑqÆ˜\"tRJ\Ä\Æ¢\íu:v½\Ýú*f\"±q’d®¸‡’d¦u\nµ HCR\çg%\ä¸\é2tý\î¦\ë:=Ukˆ4\÷‘\Þ:\îV,±ûP—\ÛGW7\Ã-l¶\Ä\ó}d(ª¢:6úr\ÞþP¤q!\ÙH\ê\â\ì@7²x‚\àr\ÌDNûe\÷=•q\Ëg\ì\Þˆ\áž\Ü=G3Æˆ6™2*s\'\âh·\ÑK\ö_†3\çQ\Ä6*0€Z\è1È®.UšaqU0\õ3¶Z\ë‰#b< Álœ¦xžµj\åmV\Ëi\Öi¸7\åª\Ñx“¡¸\Ôkxå‹ª,\Ã8Ý²Cˆc\ð\Øz\á \04hy\æ¸vk\Þ;¼Ë–LGQ\Õg\\{‰<Tv±-\Þ[”´#Bbv¸\èT—â˜†TËžF®c\Üt¶PýJ££«f]#V\âuj±§ºk„ø]£º\r<î¢¸Wj\ÙY®cš\Z\ðHu3\ñ4\îNp=ó™™”Žc\ó\Ô9\ZGAwD_HUú¼/ùŒS\\E.\õ¤ºXp¦<-uC3Ùˆ\ì\ä¥\åŠ†D\ö\÷\Ê\Ô;\ê\î\ÛO0/q\0\åp™Yc¹¹m\ò?\íhŸÅ¼A¦(\áš|\"ýK†¤\ó·Ô¬\ê›OÅ &5\ßU~Q2\ò%r\Ñ\Ð\Ñ0N¦@\É&^wN)\Ôp¿A§²\åA\ä\Ì‰105\ó\Öþ‹¾\"–¹Dº™&$\ï*\ÖR‰~\ÚÏ§Yk_qtp\æ\à>a>\òš\àÕÝ¾ —1\Íc\\E\ÝHS ‹‘ºxµQ½ž©@‡\÷„±ù\â¨Ý‰ûq|¹om\Û~’œ\'A¿\É=Àxª8T¨\ÂH4\Ü\×g¤\à4\'\Ä €Pe«\äØ¸¡R7Rvq”&Í¸3\ÍL´ª_`YMµ±­¦FAR”\020\ìÁ»L\é+¨Z\"\í¤©‚TˆL@„!\0Bˆ‚„\0ˆB´!\n$B\0%H€\Z\ã^I•ž\ñ\Ìq¨\î@rWž2a‡È¬\ã©VDC*ÉR\Ö)EabCzŠ¿‹|½Ü27$\æ§Þ 8ƒr<œ\ÄOÝ¸üý\ÖlûE±\÷fq’˜\ò\ô¾é›€\Í\ð\èH\ð\é¯\ç¢uQ\Ñ`5ž†d{Y6\ÃQH°\'[ª\ä2\â\r‡›\È7žº\Í\åI\öCŽU\Â\× 161ÓœL(\ì`\öŸ¦É›µ‘\æ\ÜmQR—YZ6þ\ÛpŠ8œ0\â,c^\ö\ß\0\'51\óeÜ·_\ížAy\ìm,€Šf˜\0C‰h‚%®¸x¾\ñ\æ›ÿ\0\n{@\ÓOº¨u´\\½\å>\íÀ\á\×’•Brø‘®¹-\0Ÿ\r®\0µ%‘¶·î¼}e\ö¿Á`\Ä\ö‘¯fV˜\ò\î\0ù\ò·YP‹§R¦¦.`\âj9\Í7‘Iž\Z@}\Ö\êT/\ã\Ø&aj\á\ð\îkª\Õa¤Æ´Éšƒ,\ÎÀ*\çƒÁ7‡¥L\é\ÇPÜ³\õMÍ¸\ÛJ.¢c?\ÄLN|gv\r˜\Æ\ÞK‰süNŸp!WŽ—½\õ›.\ÜI\åøš\Î7=\ã\ãÉ®-h\öx\ÄRk@¼\ò´½\Â\ÑQH\Å7rl(À \Ì\èc\×\á\öüWZ\âIy\ÐÙºÁË”=\ÕqÃ\0´‘\ÆŽ\å¯!¿“©µ†—\ë)‚V{ÁR\ÏR\Ä6›\õ®¤«?\n\Ã\ÓmV\Ò\Ä\Ó\à\ËI`w‰\Â\ÎÃ”hcª¯ap\ÝÛƒÎ„m´\ë=!Z0˜Q‰n@\ì¹XI¿k\Æ\\[?k,GU	m\è\ÙÇ‚q\Ù~<:¾\ô±tq5œ*Õ£I\ôª\÷nqcŸ“ÁP\è3f‘e \Ò`5\êu>j—\Ø\ì«R¤j<Ÿ\åk?$Ä™§—Å–ÄµÎ¨\ßNa]\Õ\ð\ðaÊªM|D¨R+BÁBB\0D!*\0T©¨’!\"\0TˆB\0…\í\÷r“>J\Ã\å\ñlë…£q;3Ax\ëeS\í=²“[\óo\Ìù+\"Ä¼”ê©¥D\ö°Lª)2\ô6z‰\ÆSs–-q\'Y \êY\é\ÇÂ‡\æq³g‘3x\Z›}U9¢\Üq·EG„-9`\Ú9t™\çþS7²\ZA;H\÷ÿ\0jÑŽÁC\á\ÄC°\"$¿’®\â°\äŸ\0\'\ò\ó<\Öu\ð[“^ú¦ƒ\å\×\ögR\ð—E$\ã\Ç\"B\çZ±\ÈŸïª°\Æ\Ñ1\Ù*\Îi9MÁ‘ø­w´\ô3TK\ÙO¼\óS\ñ\Û\Ð8z¬o²¯\r¨\é0;Á \Â\Þ{\ö¿¨\"Q¢¡\ë!¡oÿ\0x1~*w·þ&\èImÝ 3\Z‰\Åk|Z¡¨\Ò)Á\ðÀ&\ÂbG\ÔK\ì\î´3R\Ô\Ñ\Ä;©\Ð=À>\è*\î\Ï/•¶\óVúJjÙ²8\"Ÿ_IÔ±§V\Îk\È|x¢\ò`\îœ<\Îbt\Ô\å!š\Þ¢\é\Ú\Ú%˜\ê¦\Þ\'3\\\Ë\õ\ðŸt\ÈU¾S	a\Ö;N\ñ±\Ù6Ž|£\ÖN/\ä\ãG¯øS\'™\Ä\â\Ò‰‰\"\ð\ãbd\\ß¢‹¤\Ñ\ÆgQ´‰µRxJ\Ð\Â\òÎºØ‹\ëc˜Q‘,Q\Ý1\Ç\rÂ´\Ó9¤üDº4w€˜\ò\æ­Ý¥š ¦ÀE6\äx$»\às\ÛW	\ô\ÔfM&\0!™\é¹\Îu³]b\Ý\âÿ\0\è+°t<Eü8a\0\Ñ\È#ý”%gV\ëX{rÃ¯†\îûOøœ\î’I>ªÚ©¼¤UaØ‘müR?5s*ú£•Ìd	R \Ê\"¤L@„!1„\0!\"¤©¨’!„ ¡˜eU3´\ô\Ü\çL\Èg€\ó˜™*\ïPP\ã˜S\Þ³]s\Ócù)\Ä=\Êuzv<…UH\âµ*>ªl¾#JŠ[‚ø\är4e¢\öQ5\ßfÃ7´A\ñIi¶o„n#šƒ4\áý\á¿À\É	‰™1ò»¤-å¢Šþ[=W\Ñq\0À{F€r\ï¿5o­”F\Þkm\"L\ê-sa¨P|_[R– H»º„üYj@ix\õ\n§¤’(}¢Âšu.\"À.\ÝDe/si¶IqkD\Þ\æ\Â:IW^\Þ\á\Ý\á\ë\å.k˜d´“64¶¹\ôè«½–¢6Œ\è\Ò\çŸ&1\Ïÿ\0ê„¨\æ\ò0þ\Ó^\æƒ\ÙL†‹)ÀK\Z¨0mv¶U»‡\0Æ\Ø`\ZF‚l:þ*\Ã0N¦\ÖAøBE\Ä‡\Êo·\ôW\Z6uA·‹\ë—\ôV\Ò6\õH¯\öÆ–48ŸC†wI¦\÷‡’:gg[«\ë2›Cž\æ´\0\ÐKˆbN§\ôU\â5g1”^#\çm\ænX\èt¦U{\ÄT\ñ\åÀA\ê-\è²\æ\ä,N¨\èq¸<V\ê„\í·\r£‰\Ä\÷´jhÜ®\ð˜\\\é\Øü\â\ð©\áQ\Ì\"\í.Ÿ¸þ\n\ñ@‚o\á\ñhKM¯\ËYŽi®#‚š}g·3/³\"H\ó+6>S”Ÿb|Ï¤c¨ú~o{\òC\ã8EV³8›´\êO˜(\ÂR{[\í5\Z×2Í¡\ånŠbž9Ïšb\ZÖ³B@@\'§ùNzt\Z\æÍ®\Íø$\ëª·×\ÑJúk²\Ï\Ã\îZÊ¦¦P¢¼\\\È-\òÿ\0\ÅI\Íhh±\06\Ã(%\Íqq\Û&/Ë™P\\;\Þ\í¾ .\Ò\ÒI‚KKC\Þ3 \Ãyú‘1B\ä—Hl´\Å\ó‚\\\ó/½\Ûa\é\ì6£;U¢WK]¬¸nm¥£þ¥^¨\Ôhp\ÜJ¢2gb’$\Î\×\ç¬\ß\ÉZø\r|\Ôã•“9\Ü\È\ÚR$\Ò%HR9À‘*D\ÄÁBb!	\0!@\n•\"T‰„\0ˆJ„\0Ž\ÑC\ñ!\á$|[N—\ÖTÂ‹\ã\r†=\ñ\ð±\ÄO8)¡30\Å$\õ)…Tú²gQIš\"3¨¥{+T\n®i\0\Èn½4\ëp¢\ê.\Ü\"¦Z\Í:m?‡\Ö=\Í8ü—J\Ô\ì$°‡yA-w8·™\\180\æ<Hp‚€t&d\é\ëd\ã‹cÀ€\è |\\³5¾\Þ\Ðy¯N‘^h\ÝÁ§-2$À5\èF‰›\á#1\íY¥J‘7¤ê €\0±66\÷\ç\Í4\ì\Û\ÛN]•®/e\Ì\Ç`\åû\åC\×{‹²’nbüÔ¶\Z“\é9­pˆŸû\Çÿ\0ŸªÉšRŠ«7`Œ\';¯É—\Ú*Nng0·=V?\íxZÖˆþ\ì­\Z\óS#´xyªe\Ö-s¡&\çú·ƒc\ÑgÔ‡†˜\ô\ß\\¦\Æý\n\ë\ÞK_ý\ç\êq­\÷Yÿ\0‘¿†[\Ú,·\ã+aI.k˜\ö’\Ò\'-G5ÿ\0\õ\'ÿ\01¼\Å[‡T€n\Ò<&ú^FººJ\ï\Å\r*ƒ›N\Ó¿\ÈrN{/€s\Ø\Ð\0t–™\ZÈ‘9~\n¹\äycl”1G–“\Õ^ÿ\0_øHp¼#•\Îm¼MŸµ:G°ú«%\Ó\î\Ü\Z\ö¼^~D’\Ó\öKHúy\Ç.ƒf@\ág@i1ú¶\Ñoò½¶®lÅ¢b;\ÊW\Ì\×$°}×‘k\Èp7Z8¼n¿tÑ‹™\Ê\õ_Xû¾;\Ù\÷aˆ4Áu\æÃ£\Ä\Ùù_¸\Ð\ß\ök\\f¼	\Õ\Üüˆ=5Z\õ7g\ñ„DØ†‘Q¦\Îø]&\Æ\ÑeJ\íWe\Å2«Hœ%Ä¸\0\×¹\Âl\ÐZf4J\\T§\Ýx\Z\çJx½&·­þBvRbZ\ê†\ÊIp.&l`\é\Ö\Ê\É^±\îë± \ÜÀ™.krøI\â¨FY‰\ZÊ†¥Ž\Ì\Ü;©ü\ë˜^\Ê\áMŽm­f^\ÓÏ¤§¸¦“O7\Î\ç6@v¢‹Ç…Î‰‘¾]}µ§£Õ»$\ÝQ\Ã9J~`.\êº<@\ÛE²n¬ýš\Ä\õ\Ì?e¼ï®¶ƒèª®øŸ¨–‰l\ÉU¿û‡x:m\ÔJ˜á¸£N¡©¨¦\r¡k¾.‡o\ÅJ\ôf\Ï\Ðh¼”…zH‘\Ã\"T‰¡0B B!	\0!LHJ$Jˆ@\Ï(J„\0Š7´F0µ·~ªIFv•³…©i·\àuM—\Ö	•TúºgUI—\ÄeP%ÁÚ«?¸\äl\é\ár26ü”|K¾Ù›ÔšdpAxŸŒ—·˜qn%xw\ÎK.Z\Ù6sHÕ¶›^FÞ©†¸–Ô°ˆy’#ÀK® \é\ìq\Ò2€ª½«\âu3\ZT\ì\ÚU¼¹Žiq2[/\\¡GB1\ì8<\r¸Ž \ìE&M\ã&X\ê°I\"\Úùi\÷\à\å\Íam3\Î\ÒcO\Ät;ˆ\ó=W_\á\ö!§\ni’HeB6$\à5É˜GC\ä¬\õ¨KH\Ä\ëkE\ß\rAŸ78ª²bYQv<¯ÞŒ\Ûù\Ú2™¸±Í›1\ZH¾žþ_„{lFµ	7›I;\í®œ[Ìµ\0e¦\Ë\åŒˆ\ós›BGp–—–ƒ`ÀL‰¼bK¬šdFû\Â\Ã>.E\ãgS;\ó¯\õž!L\÷um2\Ø\Ð\ì½ \Ï\ê¢øu\n\Ív\Ã\å(v„ym¨@\âK\nú¦\Æ,	ƒ\0–‹.s\ó—i\"l#N^Š\Î.9E>È§—ÈŽI.¬Ú°Ø†½½\ãv8A0H—4·k‰\Þdr\\*\ò\ß/ø©UCÁq)2\Ù\Ò\â\Öž\Ç\ñ\âÃ•\æ[#6¦&A©ž#œ}\íUÏ¼\0ÉƒH\Éi\Ì&›²—!\ÐÖ†\å\Ê\á\ÎtrÞŽsTÇ¸W|\îµZ_†“güÀ\ó M\ïÖ‡\Çø“«\â\ð4\äkz_ÿ\0”I\ô\ä§‹qR§\ÝL\Ôt\åt\É¬\è\ç4l#\ÄHTFŸ¸r\Ñ#R¬\Ö^[}±\Õú~«\Ô~þ	Lj=\âƒ+A\ÈD‚c\â\ÖZ%­>³µ\Õ\ÜZ¦GR{\0{³S~h~3\ç\Ô&<´q¼1¤\íF¢L:}7…;\Û\Ü]CùŠPKRøKZ\æ9\Æz·ÐAbo’{B—\"\Í%$«üpL8–Ãˆh‘¨\Î#\Ìx\ÏH¶Šz†W±\ð$¯³Xu:iù¬\Û\r\×Dœ¦7ž\\µžJ\ÏÙž \áTS0EÀ¹2-¬\ïJ¼\\™§\Ö{D¹\\8¸9\ãýMs†b3\Òk·\Ðù„\èªÿ\0ež\épù`#$~\è§\×L\ñ™£\ÖmD¨AP!@¨%HP\0„!:!\"T!$J G\ñ\Ñÿ\0¦«ýŽü‚Ž\í£Tÿ\0AM—WLª§•\Ó7©2èž¹8.µ\'(2\äI³˜&\Ø\Þ%²\×}\Ûs¾Ê­Æ¨—C\Û9ž\à\Z@Ë­\ô>jk\ËN\áÎ¼\Ø3\è£)€üP§ m7º\ß\ÔG-—;4\ä\òWÁ\éx0Š\ã\÷~úþ§.\Ã\ñ\ç\Ú7¨\à\æ\Ð\àÙŸ\î%jt+\ÓR\ÆÖ‚Ý´\0‘¹\ë\ò‹\í#ª¸±™$›-g³ø£R&\r6;P\'3Z\è Ž£š\ÕÆŸh˜ùxúdqº˜!¬ivc	ˆ\à¿(\ßN‹ƒ\åMK\Èkm \0\Æ	qø¤¾N\áý!<¨\Ù.\\><\ó™¿\Ê\n\à\æ\ö0Lx\ÜzÃƒ/©]˜\Ô{i3¦xâ­ŠS$Ý“\ðŒÀ<I9µ%­¸ë±º\È;[\Ã”\Å87\à\æ\Þ|.D\ïû+V\ãÎŠ/q\Ð\Ó\ÄCA\Ð4´†“\Ã@¿û®8sj`Û‰°{#k¹®p ´IuJIúe“\ËÞ‡¤O–†Ë‚q\à\Ê^3š‘\Êd\Ù\ÓL† 6œ4\å?)<Œ*F\ßNúGM7{5û·À\çq\Ï@}5\÷Pœª6¼—\ÅE\Õø-µqE\îuG8Î¿\ãÉ£N¾\ê?\Znw\õ‰”4û\ì¼`*À\Ì4´„6a½a\íºsQ¡Àu\"\Ûm\ê\å\Æv¥l\ôp] ’\Ñ\Ã\Þ\ê³j:–b\Z\Ð\ZH¡0bÄ\ó½\ç\r\Ä)\åkCrL™\r`eþ+†‚\rË©\Æ\á@cxSœ\Þ\õ‡0e2[+\ÄEþ\Öü½pºµ\\\Û89¬,m\ó5\Ç!{n\\ù¹42c¯\Æb8¤»³›û!M\õ\ÙTŠNp¨\Ö5¢\ÙÁs@< ˆzn\Ñ\ÄS3#3r;b\ËA‹ru•‡	M\ñ“+e²Î’\Ð\Â!¢Ùˆ\'–Ü—.4Ø­E\×&H\Ö\Ö´\å\âU\ò°ÁC²ù%\Å\äMK£ziÿ\0b\ÇÙ¼~\\PÃŸž‰~·–8m\ä\ãì­«:\á4ž\î#J¸tµ­\r\ÖC\óf†­\öZ1Wc“i¿\äp¾¡Bj½\Öÿ\0Q„+x!@P•y@*ÿ\Ù','#ff0000',NULL),(7,'fede','[]','$2y$13$sN9Fw.978EYQp9crTp7SUO6vg5dn5dsRsFhvc2o6FR./AlYxZZLUS',2,0,2,2,NULL,'#ffffff',NULL);
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
