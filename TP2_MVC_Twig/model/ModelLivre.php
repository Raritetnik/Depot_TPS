<?php

class ModelLivre extends Crud{
    protected $table = 'Livre';
    protected $tableAssoc_1 = array(
        "Nom" => 'Categorie',
        "FK_nom" => 'Categorie_id');
    protected $tableAssoc_2 = array(
        "Nom" => 'Editeur',
        "FK_nom" => 'Editeur_id');

    protected $primaryKey = 'id';

    protected $fillable = ['Titre', 'Description', 'nombrePages', 'edition', 'prix',
                        'Categorie.Nom AS `catNom`', 'Editeur.Nom AS `editNom`'];

    public function selectWith($order='ASC')
    {
        $sql = "SELECT $this->table.$this->primaryKey, ".implode(', ',$this->fillable)
            ." FROM $this->table "
            ." INNER JOIN ".$this->tableAssoc_1['Nom']." ON "
            .$this->tableAssoc_1["Nom"].".id = ".$this->table.".".$this->tableAssoc_1['FK_nom']
            ." INNER JOIN ".$this->tableAssoc_2['Nom']." ON "
            .$this->tableAssoc_2['Nom'].".id = ".$this->table.".".$this->tableAssoc_2['FK_nom']
            ." ORDER BY $this->table.$this->primaryKey $order";

        $stmt = $this->query($sql);
        return $stmt->fetchAll();
    }
}