<main>
    <form action="../update" method="POST" class="form-box">
        <label for="">Titre:
            <input type="text" name="Titre" value='{{ livre.Titre }}' required>
        </label>
        <label for="">Prix:
            <input type="text" name="prix" value='{{ livre.prix }}' required>
        </label>
        <label for="">Nombre de pages:
            <input type="text" name="nombrePages" value='{{ livre.nombrePages }}'>
        </label>
        <label for="">Édition:
            <input type="number" name="edition" value='{{ livre.edition }}'>
        </label>
        <label for="">Catégorie:
            <select name="Categorie_id">
            {% if categories != null %}
                {% for categorie in categories %}
                    <option value=' {{ categorie.id }}' {{ (categorie.id == livre.id) ? 'selected' : '' }}>
                        {{ categorie.Nom }}</option>
                {% endfor %}
            {% endif %}
            </select>
        </label>
        <label for="">Éditeur:
            <select name="Editeur_id">
            {% if editeurs != null %}
                {% for editeur in editeurs %}
                    <option value=' {{ editeur.id }}' {{ (editeur.id == livre.id) ? 'selected' : '' }}>
                        {{ editeur.Nom }}</option>
                {% endfor %}
            {% endif %}
            </select>
        </label>
        <label for="">Description
            <textarea name='Description' required>{{ livre.Description }}</textarea>
        </label>
        <input name='id' hidden type="hidden" value="{{ livre.id }}">
        <input type="submit" value="Save">
    </form>
</main>
