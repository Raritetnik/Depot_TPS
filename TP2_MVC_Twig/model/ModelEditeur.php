<?php

class ModelEditeur extends Crud{
    protected $table = 'Editeur';
    protected $primaryKey = 'id';

    protected $fillable = ['nom'];
}