var map = L.map('map').setView([41.044663,29.033775], 12);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.control.custom({
    position: 'topright',
    content : '<button type="button" class="btn btn-default">'+
              '    <i class="fa fa-crosshairs"></i>'+
              '</button>'+
              '<button type="button" class="btn btn-info">'+
              '    <i class="fa fa-compass"></i>'+
              '</button>'+
              '<button type="button" class="btn btn-primary">'+
              '    <i class="fa fa-spinner fa-pulse fa-fw"></i>'+
              '</button>'+
              '<button type="button" class="btn btn-danger">'+
              '    <i class="fa fa-times"></i>'+
              '</button>'+
              '<button type="button" class="btn btn-success">'+
              '    <i class="fa fa-check"></i>'+
              '</button>'+
              '<button type="button" class="btn btn-warning">'+
              '    <i class="fa fa-exclamation-triangle"></i>'+
              '</button>',
    classes : 'btn-group-vertical btn-group-sm',
    style   :
    {
        margin: '10px',
        padding: '0px 0 0 0',
        cursor: 'pointer',
    },
    datas   :
    {
        'foo': 'bar',
    },
    events:
    {
        click: function(data)
        {
            console.log('wrapper div element clicked');
            console.log(data);
        },
        dblclick: function(data)
        {
            console.log('wrapper div element dblclicked');
            console.log(data);
        },
        contextmenu: function(data)
        {
            console.log('wrapper div element contextmenu');
            console.log(data);
        },
    }
})
.addTo(map);
Options