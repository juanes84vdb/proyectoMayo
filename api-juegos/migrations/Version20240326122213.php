<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240326122213 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE partidas ADD CONSTRAINT FK_12114278A9276E6C FOREIGN KEY (tipo_id) REFERENCES juegos (id)');
        $this->addSql('CREATE INDEX IDX_12114278A9276E6C ON partidas (tipo_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE partidas DROP FOREIGN KEY FK_12114278A9276E6C');
        $this->addSql('DROP INDEX IDX_12114278A9276E6C ON partidas');
    }
}
