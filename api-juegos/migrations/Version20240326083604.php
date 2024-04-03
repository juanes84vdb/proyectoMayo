<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240326083604 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE partidas ADD fila1 LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', ADD fila2 LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', ADD fila3 LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', ADD fila4 LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', ADD fila5 LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', ADD fila6 LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', ADD fila7 LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE partidas DROP fila1, DROP fila2, DROP fila3, DROP fila4, DROP fila5, DROP fila6, DROP fila7');
    }
}