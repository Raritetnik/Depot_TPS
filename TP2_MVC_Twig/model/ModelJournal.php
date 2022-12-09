<?php

class ModelJournal extends Crud{
    protected $table = 'journal';
    protected $primaryKey = 'id';

    protected $fillable = ['username', 'adresseIP', 'action', 'date'];
}