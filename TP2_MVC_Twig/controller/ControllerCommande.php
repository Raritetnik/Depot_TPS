<?php
RequirePage::requireModel('Crud');
RequirePage::requireModel('ModelCommande');
RequirePage::requireModel('ModelLivre');
RequirePage::requireModel('ModelFacture');

class ControllerCommande{

    private $_commande;
    private $_livre;
    private $_facture;

    function __construct() {
        $this->_livre = new ModelLivre;
        $this->_commande = new ModelCommande;
        $this->_facture = new ModelFacture;
    }

    public function index(){
        $commandes = $this->_commande->selectWith();
        twig::render("commande/commande-index.php", ['commandes' => $commandes]);
    }

    public function error(){
        twig::render('home/home-error.php');
    }
    /**
     * Creation d'une donnée de commande
     */
    public function create(){
        $livres = $this->_livre->select();
        $factures = $this->_facture->selectWith();
        twig::render("commande/commande-create.php", ['livres' => $livres,
                                                        'factures' => $factures]);
    }
    public function save() {
        $data = $_POST;
        echo("<pre>");
        print_r($data);
        echo("</pre>");
        $this->_commande->insert($data);

        RequirePage::redirectPage("commande");
    }
    /**
     * Modifier la donnée de commande
     */
    public function modifier($id){
        if(!isset($id)) {
            RequirePage::redirectPage("commande");
        }

        $commande = $this->_commande->selectId($id);
        $livres = $this->_livre->select();
        $factures = $this->_facture->selectWith();
        twig::render("commande/commande-modifier.php", ['commande' => $commande,
                                                  'livres' => $livres,
                                                  'factures' => $factures]);
    }

    public function update() {
        $data = $_POST;
        echo('<pre>');
        print_r($data);
        echo('<.pre>');
        $this->_commande->update($data);

        RequirePage::redirectPage("commande");
    }

    /**
     * Supprimer la donnée de commande
     */
    function delete($id) {
        $this->_commande->delete($id);

        RequirePage::redirectPage("commande");
    }
}
?>