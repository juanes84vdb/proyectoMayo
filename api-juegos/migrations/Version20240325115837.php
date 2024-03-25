<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240325115837 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE partidas (id INT AUTO_INCREMENT NOT NULL, jugador1_id INT NOT NULL, jugador2_id INT NOT NULL, ganador_id INT DEFAULT NULL, tablero LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', acabada TINYINT(1) NOT NULL, INDEX IDX_12114278390198F4 (jugador1_id), INDEX IDX_121142782BB4371A (jugador2_id), INDEX IDX_12114278A338CEA5 (ganador_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) NOT NULL, roles JSON NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_IDENTIFIER_USERNAME (username), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE partidas ADD CONSTRAINT FK_12114278390198F4 FOREIGN KEY (jugador1_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE partidas ADD CONSTRAINT FK_121142782BB4371A FOREIGN KEY (jugador2_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE partidas ADD CONSTRAINT FK_12114278A338CEA5 FOREIGN KEY (ganador_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE partidas DROP FOREIGN KEY FK_12114278390198F4');
        $this->addSql('ALTER TABLE partidas DROP FOREIGN KEY FK_121142782BB4371A');
        $this->addSql('ALTER TABLE partidas DROP FOREIGN KEY FK_12114278A338CEA5');
        $this->addSql('DROP TABLE partidas');
        $this->addSql('DROP TABLE user');
    }
}
