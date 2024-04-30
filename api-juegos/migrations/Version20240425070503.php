<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240425070503 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reportes ADD reportador_id INT DEFAULT NULL, ADD reportado_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE reportes ADD CONSTRAINT FK_1D1D064B05C73D6 FOREIGN KEY (reportador_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE reportes ADD CONSTRAINT FK_1D1D06444B9BC43 FOREIGN KEY (reportado_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_1D1D064B05C73D6 ON reportes (reportador_id)');
        $this->addSql('CREATE INDEX IDX_1D1D06444B9BC43 ON reportes (reportado_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reportes DROP FOREIGN KEY FK_1D1D064B05C73D6');
        $this->addSql('ALTER TABLE reportes DROP FOREIGN KEY FK_1D1D06444B9BC43');
        $this->addSql('DROP INDEX IDX_1D1D064B05C73D6 ON reportes');
        $this->addSql('DROP INDEX IDX_1D1D06444B9BC43 ON reportes');
        $this->addSql('ALTER TABLE reportes DROP reportador_id, DROP reportado_id');
    }
}
