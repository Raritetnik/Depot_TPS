<?php

class ModelMembre extends Crud{
    protected $table = 'Membre';
    protected $primaryKey = 'id';

    protected $fillable = ['Nom', 'adresse', 'codePostale', 'dateNaissance', 'phone',
                        'courriel', 'username', 'password'];

}