<?php

RequirePage::requireModel('Crud');
RequirePage::requireModel('ModelJournal');
class SystemJournal {

    private static $_journal;

    function __construct() {
        SystemJournal::$_journal = new ModelJournal;
        date_default_timezone_set('Canada/Eastern');
    }

    public static function createNote($action) {
        $data['action'] = $action;
        $data['date'] = date('y-m-d h:i:s');
        $data['adresseIP'] = $_SERVER['REMOTE_ADDR'];
        $data['username'] = $_SESSION['username'] ?? 'Systeme';
        SystemJournal::$_journal->insert($data);
    }
}

?>