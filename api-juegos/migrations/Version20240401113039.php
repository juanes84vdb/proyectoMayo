<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240401113039 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user ADD partidas_terminadas INT NOT NULL, CHANGE partidas_totales partidas_totales INT NOT NULL, CHANGE partidas_ganadas partidas_ganadas INT NOT NULL, CHANGE partidas_perdidos partidas_perdidos INT NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP partidas_terminadas, CHANGE partidas_totales partidas_totales INT DEFAULT 0 NOT NULL, CHANGE partidas_ganadas partidas_ganadas INT DEFAULT 0 NOT NULL, CHANGE partidas_perdidos partidas_perdidos INT DEFAULT 0 NOT NULL');
    }
}
