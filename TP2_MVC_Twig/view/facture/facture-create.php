{{ include('main-menu.php', {title: 'Facture', pageHeader: 'Facture creation'})}}
<main>
    <form action="save" method="POST" class="form-box">
        <label for="">Date de facturation:
            <input type="date" name="date">
        </label>
        <label for="">Livraison:
            <select name="Livraison_id">
            {% if livraisons != null %}
                {% for livraison in livraisons %}
                    <option value=' {{ livraison.id }}'>{{ livraison.modeLivraison }}</option>
                {% endfor %}
            {% endif %}
            </select>
        </label>
        <label for="">Paiement:
            <select name="Paiement_id">
            {% if paiements != null %}
                {% for paiement in paiements %}
                    <option value=' {{ paiement.id }}'>{{ paiement.modePaiement }}</option>
                {% endfor %}
            {% endif %}
            </select>
        </label>
        <label for="">Membre:
            <select name="Membre_id">
            {% if membres != null %}
                {% for membre in membres %}
                    <option value=' {{ membre.id }}'>{{ membre.Nom }}</option>
                {% endfor %}
            {% endif %}
            </select>
        </label>
        <input type="submit" value="Save">
    </form>
</main>
