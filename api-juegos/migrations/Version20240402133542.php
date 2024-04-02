<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240402133542 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE partidas ADD CONSTRAINT FK_12114278390198F4 FOREIGN KEY (jugador1_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE partidas ADD CONSTRAINT FK_121142782BB4371A FOREIGN KEY (jugador2_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE partidas ADD CONSTRAINT FK_12114278A338CEA5 FOREIGN KEY (ganador_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE partidas ADD CONSTRAINT FK_12114278A9276E6C FOREIGN KEY (tipo_id) REFERENCES juegos (id)');
        $this->addSql('ALTER TABLE user ADD foto_perfil LONGBLOB DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE partidas DROP FOREIGN KEY FK_12114278390198F4');
        $this->addSql('ALTER TABLE partidas DROP FOREIGN KEY FK_121142782BB4371A');
        $this->addSql('ALTER TABLE partidas DROP FOREIGN KEY FK_12114278A338CEA5');
        $this->addSql('ALTER TABLE partidas DROP FOREIGN KEY FK_12114278A9276E6C');
        $this->addSql('ALTER TABLE user DROP foto_perfil');
    }
}
