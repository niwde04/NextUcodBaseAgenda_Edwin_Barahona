class EventManager {

    constructor() {
        // this.obtenerDataInicial()
        this.inicializarFormulario()
        //this.guardarEvento()
    }


    inicializarFormulario() {
        $('#start_date, #titulo, #end_date').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function () {
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled")
            } else {
                $('.timepicker, #end_date').removeAttr("disabled")
            }
        })
    }
}

$(document).ready(function () {
    listarEventos()

});

$("#save").click(function () {
    let title = $('#titulo');
    let start = $('#start_date');
    let end = $('#end_date');

    if (title.val() != "" && start.val() != "") {

        $.ajax({
            url: '/eventos',
            method: 'POST',
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                title: title.val(),
                start: start.val(),
                end: end.val()
            }),
            success: function (res) {

                listarEventos()

            },
            error: function () {
                alert("Error al ingresar Evento")
            }
        })


    } else {
        alert("Complete todos los campos");
    }

})

function listarEventos() {
    $.get("/eventList", function (data, status) {

        const calendar = new FullCalendar.Calendar($('.calendario')[0], {
            initialView: 'dayGridMonth',
            editable: true,
            eventDrop: (event) => {
                actualizarEvento(event)
            }
        })

        calendar.render();

     
        for (let i = 0; i < JSON.stringify(data.length); i++) {

            calendar.addEvent({
                id: data[i]._id,
                title: data[i].title,
                start: data[i].start,
                end: data[i].end,
                allDay: true
            });

        }

    });

}

function actualizarEvento(evento){
console.log(evento.event.id,)
    $.ajax({
        url: '/eventUpdate/'+ evento.event.id,
        method: 'PUT',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            title: evento.event.title,
            start: evento.event.start,
            end: evento.event.end
        }),
        success: function (res) {

            //listarEventos()

        },
        error: function () {
            alert("Error al ACTUALIZAR Evento")
        }
    })
    

}

const Manager = new EventManager()