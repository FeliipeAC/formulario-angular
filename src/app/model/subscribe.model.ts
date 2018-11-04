export class Subscribe {

    nome: string = null;
    email: string = null;
    cpf: string = null;
    telefone: string = null;
    telefone2: string = null;
    cep: string = null;
    rua: string = null;
    numero: number = null;
    complemento: string = null;
    estado: string = null;
    cidade: string = null;


    constructor (inscrito) {
        this.nome = inscrito.nome;
        this.email = inscrito.email;
        this.cpf = inscrito.cpf;
        this.telefone = inscrito.telefone;
        this.telefone2 = inscrito.telefone2;
        this.cep = inscrito.cep;
        this.rua = inscrito.rua;
        this.numero = inscrito.numero;
        this.complemento = inscrito.complemento;
        this.estado = inscrito.estado;
        this.cidade = inscrito.cidade;
        
    }

}