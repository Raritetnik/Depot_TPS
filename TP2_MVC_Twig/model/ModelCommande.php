<?php

class ModelCommande extends Crud{
    protected $table = 'Commande';

    protected $primaryKey = '';
    protected $tableAssoc_1 = array(
        "Nom" => 'Livre',
        "FK_nom" => 'Livre_id');
    protected $tableAssoc_2 = array(
        "Nom" => 'Facture',
        "FK_nom" => 'Facture_id');
    protected $tableAssoc_3 = array(
        "Nom" => 'Membre',
        "FK_nom" => 'Membre_id');

    protected $fillable = ['Livre_id', 'Facture_id', 'prixTotal', 'quantite', 'Livre.Titre', 'Membre.Nom'];


    public function selectWith($order='ASC')
    {
        $sql = "SELECT ".implode(', ',$this->fillable)
            ." FROM $this->table "

            ." INNER JOIN ".$this->tableAssoc_1['Nom']." ON "
            .$this->tableAssoc_1["Nom"].".id = ".$this->table.".".$this->tableAssoc_1['FK_nom']

            ." INNER JOIN ".$this->tableAssoc_2['Nom']." ON "
            .$this->tableAssoc_2['Nom'].".id = ".$this->table.".".$this->tableAssoc_2['FK_nom']

            ." INNER JOIN ".$this->tableAssoc_3['Nom']." ON "
            .$this->tableAssoc_2['Nom'].".".$this->tableAssoc_3['FK_nom']." = ".$this->tableAssoc_3['Nom'].".id"
            ." ORDER BY prixTotal $order";

        $stmt = $this->query($sql);
        return $stmt->fetchAll();
    }

    public function select($order = 'ASC') {
        $sql = "SELECT * FROM $this->table ORDER BY prix $order";
        $stmt  = $this->query($sql);
        return  $stmt->fetchAll();
    }

    public function selectId($ids){
        $id = explode("_", $ids);
        $sql = "SELECT * FROM $this->table WHERE "
        .$this->tableAssoc_1['FK_nom']." = :".$this->tableAssoc_1['FK_nom']
        ." AND "
        .$this->tableAssoc_2['FK_nom']." = :".$this->tableAssoc_2['FK_nom'];
        $stmt = $this->prepare($sql);
        $stmt->bindValue(":".$this->tableAssoc_1['FK_nom'], $id[0]);
        $stmt->bindValue(":".$this->tableAssoc_2['FK_nom'], $id[1]);
        $stmt->execute();
        echo("<br>".$sql."</br>");
        $count = $stmt->rowCount();
        return ($count == 1) ? $stmt->fetch(): null;
    }

    public function update($data) {
        $champRequete = null;
        foreach($data as $key => $value) {
            $champRequete .= "$key = :$key, ";
        }
        $champRequete = rtrim($champRequete, ", ");
        $sql = "UPDATE $this->table SET $champRequete WHERE Livre_id = :Livre_id AND Facture_id = :Facture_id";
        echo($sql);
        $stmt = $this->prepare($sql);

        foreach($data as $key => $value) {
            $stmt->bindValue(":".$key, $value);
        }
        $stmt->bindValue(":Livre_id", $data['Livre_id']);
        $stmt->bindValue(":Facture_id", $data['Facture_id']);
        if(!$stmt->execute()){
            print_r($stmt->errorInfo());
        } else {
            header("Location: ".$_SERVER['HTTP_REFERER']);
        }
    }

    public function delete($ids){
        $id = explode("_", $ids);
        $sql = "DELETE FROM $this->table WHERE Livre_id = :Livre_id AND Facture_id = :Facture_id";

        $stmt = $this->prepare($sql);
        $stmt->bindValue(":Livre_id", $id[0]);
        $stmt->bindValue(":Facture_id", $id[1]);
        if(!$stmt->execute()){
            print_r($stmt->errorInfo());
        }else{
            header('Location: ' . $_SERVER['HTTP_REFERER']);
        }
    }

}