$(document).ready(function() {
    $('.mascara').mask('#####0,0', {reverse: true});

    $('#altura').on('keyup', function() {
        let mascara = '';

        if ($(this).val().length > 3) {
            mascara = '####00,00';
        } else {
            mascara = '####0,0';
        }
        
        $('#altura').mask(mascara, {reverse: true});
    });

    $("button").click(function() {
        var dados = $('#form_imc').serializeArray();

        let formValido = validarForm(dados);

        if (formValido) {
            let valorIMC = calcularIMC();

            let resultadoIMC = textoResultadoIMC(valorIMC);

            $('#resultado_img_texto').text(
                'Seu IMC é: ' + valorIMC.toFixed(2) + ' - ' + resultadoIMC
            );

            $("#resultadoIMC").modal("show");
        } else {
            alert('Necessário preencher todos os campos!');
        }
    });

    function validarForm(dados) {
        let valido = true;

        dados.forEach(function (dado) {
            if (dado.value == "") {
                valido = false;

                return false;
            }
        });

        return valido;
    }

    function calcularIMC() {
        let altura = parseFloat($("#altura").val().replace(',', '.'));
        let peso = parseFloat($("#peso").val().replace(',', '.'));

        let imc = peso / (altura * altura);

        return imc;
    }

    function textoResultadoIMC(valorIMC) {
        let sexo = $("#sexo").val();
        let resultado = '';

        switch (sexo) {
            case 'F':
                if (valorIMC < 19.1) {
					resultado = "Abaixo do peso";
				} else if (valorIMC >= 19.1 && valorIMC <= 25.8) {
					resultado = "Peso ideal";
				} else if (valorIMC >= 25.9 && valorIMC <= 27.3) {
					resultado = "Pouco acima do peso";
				} else if (valorIMC >= 27.4 && valorIMC <= 32.3) {
					resultado = "Acima do peso";
				} else {
					resultado = "Obesidade";
				}

                break;
            case 'M':
                if (valorIMC < 20.7) {
					resultado = "Abaixo do peso";
				} else if (valorIMC >= 20.7 && valorIMC <= 26.4) {
					resultado = "Peso ideal";
				} else if (valorIMC >= 26.5 && valorIMC <= 27.8) {
					resultado = "Pouco acima do peso";
				} else if (valorIMC >= 27.9 && valorIMC <= 31.1) {
					resultado = "Acima do peso";
				} else {
					resultado = "Obesidade";
                }
                
                break;
            default:
                resultado = 'Sem resultado';

                break;
        }

        return resultado;
    }
});