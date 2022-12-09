{{ include('main-menu.php', {title: 'Membre', pageHeader: 'Membre modification'})}}
<main>
    <form action="../update" method="POST" class="form-box">
        <label for="">Nom:
            <input type="text" name="Nom" value='{{ membre.Nom }}' required>
        </label>
        <label for="">Adresse:
            <input type="text" name="adresse" value='{{ membre.adresse }}' required>
        </label>
        <label for="">Téléphone:
            <input type="text" name="phone" value='{{ membre.phone }}' required>
        </label>
        <label for="">Code Postal:
            <input type="text" name="codePostal" value='{{ membre.codePostal }}' required>
        </label>
        <label for="">Date de naissance:
            <input type="date" name="dateNaissance" value='{{ membre.dateNaissance }}' required>
        </label>
        <label for="">Courriel:
            <input type="text" name="courriel" value='{{ membre.courriel }}'>
        </label>
        <label for="">Username:
            <input type="text" name="username" value='{{ membre.username }}'>
        </label>
        <label for="">Password:
            <input type="password" name="password" value=''>
        </label>
        <input type="hidden" name="id" value="{{ membre.id }}">
        <input type="submit" value="Save">
    </form>
</main>
