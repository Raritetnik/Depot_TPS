<?php

class ModelPaiement extends Crud{
    protected $table = 'Paiement';
    protected $primaryKey = 'id';

    protected $fillable = ['modePaiement'];
}