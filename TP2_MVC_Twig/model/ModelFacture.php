<?php

class ModelFacture extends Crud{
    protected $table = 'Facture';
    protected $primaryKey = 'id';

    protected $tableAssoc_1 = array(
        "Nom" => 'Paiement',
        "FK_nom" => 'Paiement_id',
        "id" => 'id_paie');
    protected $tableAssoc_2 = array(
        "Nom" => 'Livraison',
        "FK_nom" => 'Livraison_id',
        "id" => 'id_livr');
    protected $tableAssoc_3 = array(
        "Nom" => 'Membre',
        "FK_nom" => 'Membre_id',
        "id" => 'id_memb');
    protected $fillable = ['date', 'Livraison.modeLivraison', 'Paiement.modePaiement', 'Membre.Nom'];

    public function selectWith($order='ASC')
    {
        $sql = "SELECT $this->table.$this->primaryKey, ".implode(', ',$this->fillable)
            ." FROM $this->table "
            ." INNER JOIN ".$this->tableAssoc_1['Nom']." ON "
            .$this->tableAssoc_1["Nom"].".id = ".$this->table.".".$this->tableAssoc_1['FK_nom']
            ." INNER JOIN ".$this->tableAssoc_2['Nom']." ON "
            .$this->tableAssoc_2['Nom'].".id = ".$this->table.".".$this->tableAssoc_2['FK_nom']
            ." INNER JOIN ".$this->tableAssoc_3['Nom']." ON "
            .$this->tableAssoc_3['Nom'].".id = ".$this->table.".".$this->tableAssoc_3['FK_nom']
            ." ORDER BY $this->table.$this->primaryKey $order";

        //echo("<br>".$sql."<br>");
        $stmt = $this->query($sql);
        return $stmt->fetchAll();
    }
}