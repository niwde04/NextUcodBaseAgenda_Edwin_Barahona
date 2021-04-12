class EventManager {

    constructor() {
        this.inicializarFormulario()
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

    const userName = getUserName();
    
    if (!userName){
        redireccionarAcceso()
    }

});

$('#logout').click(function(){
    sessionStorage.setItem('userName','')
    window.location.href = "http://localhost:3000/index.html";
})

function getUserName() {
    const userName = sessionStorage.getItem('userName');
    const userNameString = (userName);
    return userNameString
}

function redireccionarAcceso(){
    alert('Debe iniciar sesión para ver este contenido')
    window.location.href = "http://localhost:3000/index.html";
}


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
    const userName = getUserName();
    $.get("/eventList/" + userName, function (data, status) {

        const calendar = new FullCalendar.Calendar($('.calendario')[0], {
            initialView: 'dayGridMonth',
            editable: true,
            eventDrop: (event) => {
                actualizarEvento(event)
                console.log(JSON.stringify(event))
            },
            eventDragStart: (event) => {
                $('.delete').find('img').attr('src', "./img/delete.png");
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (event) => {
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);

                if (event.jsEvent.pageX >= x1 && event.jsEvent.pageX <= x2 &&
                    event.jsEvent.pageY >= y1 && event.jsEvent.pageY <= y2) {

                    $.ajax({
                        url: '/deleteEvent/' + event.event.id,
                        method: 'DELETE',
                        contentType: "application/json",
                        dataType: "json",

                        success: function (res) {

                            listarEventos()

                        },
                        error: function () {
                            alert("Error al Eliminar Evento")
                        }
                    })
                }

                $('.delete').css('background-color', '#8B0913')
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

function actualizarEvento(evento) {

    $.ajax({
        url: '/eventUpdate/' + evento.event.id,
        method: 'PUT',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            title: evento.event.title,
            start: evento.event.start,
            end: evento.event.end
        }),
        success: function (res) {

        },
        error: function () {
            alert("Error al ACTUALIZAR Evento")
        }
    })
}

const Manager = new EventManager()