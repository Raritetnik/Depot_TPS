<main>
    <form action="../update" method="POST" class="form-box">
        <label for="">Prix:
            <input type="text" name="prixTotal" value='{{ commande.prixTotal }}' required>
        </label>
        <label for="">Quantite:
            <input type="text" name="quantite" value='{{ commande.quantite }}'>
        </label>
        <label for="">Livre:
            <select name="Livre_id">
            {% if livres != null %}
                {% for livre in livres %}
                    <option value='{{ livre.id }}' {{ (livre.id == commande.Livre_id) ? 'selected' : '' }}>
                        {{ livre.Titre }}</option>
                {% endfor %}
            {% endif %}
            </select>
        </label>
        <label for="">Facture sur le nom:
            <select name="Facture_id">
            {% if factures != null %}
                {% for facture in factures %}
                    <option value='{{ facture.id }}' {{ (facture.id == commande.Facture_id) ? 'selected' : '' }}>
                        {{ facture.Nom }} en date {{ facture.date }}</option>
                {% endfor %}
            {% endif %}
            </select>
        </label>
        <input name='Livre_id' hidden type="hidden" value="{{ commande.Livre_id }}">
        <input name='Facture_id' hidden type="hidden" value="{{ commande.Facture_id }}">
        <input type="submit" value="Save">
    </form>
</main>
