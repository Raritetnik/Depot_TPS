<?php

class ModelCategorie extends Crud{
    protected $table = 'Categorie';
    protected $primaryKey = 'id';

    protected $fillable = ['nom'];
}