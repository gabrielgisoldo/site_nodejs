function redirect_home() {
    window.location = "/home";
}

function redirect_novo() {
    window.location = "/novo";
}

function redirect_postagens() {
    window.location = "/posts";
}

function redirect_editar(id) {
    window.location = "/editar/" + id;
}

function excluir_post (){
    form = document.getElementById('form');

    if (confirm('Tem certeza que deseja excluir esse post?')) {
        form.action = '/remover_post';

        form.submit();
    } else {
        return false;
    }
}
