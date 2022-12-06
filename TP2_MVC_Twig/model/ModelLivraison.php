<?php

class ModelLivraison extends Crud{
    protected $table = 'Livraison';
    protected $primaryKey = 'id';

    protected $fillable = ['modeLivraison'];
}