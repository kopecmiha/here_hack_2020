const delay =ms=>{
    return new Promise(r=>setTimeout(()=>r(),ms))
};


const url='https://jsonplaceholder.typicode.com/todos/1';
const all = 'http://aumsuhere.tmweb.ru/api/db/view_routers';
const add = 'http://aumsuhere.tmweb.ru/api/db/add_router';
// function fetchTo() {
//    return delay(2000).then(()=>{
//       return  fetch(all)
//    })
//        .then(response=>response.json())
// }
// fetchTo()
//     .then(data => {
//         console.log('data',data[0].lat)
//     // })

// async function fetcAsync() {
//     const reponse = await fetch(all);
//     const data = await reponse.json();
//     // console.log(data);
//     let lng = data[0].lat;
//     return lng
// }


const lng = async (all) =>{
    const res = await fetch(all);
    const data = await res.json();
    return data;
};

lng('http://aumsuhere.tmweb.ru/api/db/view_routers')
    .then((data)=>{
        console.log(data)
    });

lng('http://aumsuhere.tmweb.ru/api/db/view_home_routers')
    .then((data)=>{
        console.log(data)
    });


//------------------------------------------------------------------------------------------

 // Initialize the platform object:
    var platform = new H.service.Platform({
        'apikey': '5guKdiSP9g3xCXY8sRbbea5KHsevzf_ytrnLQeJPSvM'
    });

    // Obtain the default map types from the platform object
    var maptypes = platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    var map = new H.Map(
        document.getElementById('mapContainer'),
        maptypes.vector.normal.map,
        {
            zoom: 10,
            center: { lng:37.7575 , lat: 44.7236 }
        });


function addMarkersToMap(map) {


       // var berlinMarker = new H.map.Marker({lat:52.5166, lng:13.3833});
	   var berlinMarker = new H.map.Marker({lng:37.7575 , lat: 44.7236});
      //  map.addObject(berlinMarker);
	  var lineString = [];
	  var lineHierarchy = 4;
	  var color = 'blue';
	  var textMarker = 'M';
	  var lineColor = '#829';


		var xhr = new XMLHttpRequest();
		// 2. Конфигурируем его: GET-запрос на URL
		xhr.open('GET', all, false);
		// 3. Отсылаем запрос
		xhr.send();
		// 4. Если код ответа сервера не 200, то это ошибка
		if (xhr.status != 200) {
		  // обработать ошибку
		  alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
		}
		//-----------------------------------------СТАРЫЙ КОД----------------------------------------------
		/*B
		else {

		  var jsonData = JSON.parse(xhr.responseText); // responseText -- текст ответа.
			for (var i = 0; i < jsonData.length; i++) {
				var counter = jsonData[i];
				//console.log(counter.Type);
				berlinMarker = new H.map.Marker({lng:counter.lng, lat:counter.lat});
				map.addObject(berlinMarker);
				if (!(counter.connect_id == 0))
				{
					lineString[i] = new H.geo.LineString();
					lineString[i].pushPoint({lng:counter.lng, lat:counter.lat});

					for (var j = 0; j<jsonData.length; j++)
					{
						var connecter = jsonData[j];
						//console.log("New check: " + connecter.id + " and " + counter.connect_id);
						if(connecter.id == counter.connect_id)
						{
							//console.log("Found connection between " + connecter.id + " and " + counter.connect_id);
							lineString[i].pushPoint({lng:connecter.lng, lat:connecter.lat});
							switch(counter.Type)
							{
								case 'raion_commutator': lineHierarchy = 8; break;
								case 'house_commutator': lineHierarchy = 4; break;
								case 'home_router': lineHierarchy = 2; break;
								default: break;
							}
							map.addObject(new H.map.Polyline(lineString[i], { style: { lineWidth: lineHierarchy }}));
						}
					}


				}
			}

		}
		*/
		//----------------------------------------НОВЫЙ КОД--------------------------------
		else {

		  var jsonData = JSON.parse(xhr.responseText); // responseText -- текст ответа.
			for (var i = 0; i < jsonData.length; i++) {
				var counter = jsonData[i];
				//console.log(counter.Type);
				/* //Блок кода, делающий цветовую индикацию в зависимости от Типа роутера
				switch(counter.Type)
				{
					case 'provider_server': color = 'red'; break;
					case 'raion_commutator': color = 'blue'; break;
					case 'house_commutator': color = 'green'; break;
					case 'home_router': color = 'yellow'; break;
					default: break;
				}
				*/
				// Блок кода, делающий цветовую индикацию в зависимости от состояния роутера
				switch(counter.on_off)
				{
					case 0: color = 'red'; break;
					case 1: color = 'green'; break;
					default: break;
				}
				//------------------------
				switch(counter.Type)
				{
					case 'provider_server': textMarker = 'ps'; break;
					case 'raion_commutator': textMarker = 'rc'; break;
					case 'house_commutator': textMarker = 'hc'; break;
					//case 'home_router': textMarker = 'hr'; break;
					default: break;
				}
				if (!(counter.Type == 'home_router'))
				{
					addDOMMarker(map, color, counter.lng, counter.lat, counter.id, counter.model, counter.connect_id, counter.on_off, counter.Type, counter.inf_count, counter.smotr, textMarker, counter.type_of_cabel, counter.type_of_connection);
					if (!(counter.connect_id == 0))
					{
						lineString[i] = new H.geo.LineString();
						lineString[i].pushPoint({lng:counter.lng, lat:counter.lat});

						for (var j = 0; j<jsonData.length; j++)
						{
							var connecter = jsonData[j];
							//console.log("New check: " + connecter.id + " and " + counter.connect_id);
							if(connecter.id == counter.connect_id)
							{
								//console.log("Found connection between " + connecter.id + " and " + counter.connect_id);

								lineString[i].pushPoint({lng:connecter.lng, lat:connecter.lat});
								switch(counter.Type)
								{
									case 'raion_commutator': lineHierarchy = 8; break;
									case 'house_commutator': lineHierarchy = 4; break;
									case 'home_router': lineHierarchy = 2; break;
									default: break;
								}


								if (connecter.on_off == 0)
									lineColor = '#d90b42';
								else
								{
									if(connecter.connect_id != 0)
									{
										lineWork = checkRoute(jsonData, connecter.connect_id, 30); //Максимальное количество шагов поиска сервера
										if (lineWork == true)
										{	
											switch(counter.type_of_cabel)
											{
												case 'Беспроводное подключение': lineColor = '#000000'; break;
												case 'Витая пара': lineColor = '#0bb3d9'; break;
												case 'Оптоволокно': lineColor = '#62a374'; break;
												default: lineColor = '#d90b42'; break;
											}
										}
										else
											lineColor = '#d90b42';
									}
									else
									{
										//lineColor = '#0bb3d9';
										switch(counter.type_of_cabel)
										{
											case 'Беспроводное подключение': lineColor = '#000000'; break;
											case 'Витая пара': lineColor = '#0bb3d9'; break;
											case 'Оптоволокно': lineColor = '#62a374'; break;
											default: lineColor = '#d90b42'; break;
										}
									}
								}


								map.addObject(new H.map.Polyline(lineString[i], { style: { strokeColor: lineColor, lineWidth: lineHierarchy }}));
							}
						}
					}
				}
			}
		}
    }
	// #d90b42 - red - нет соединения
	// #0bb3d9 - blue - витая пара
	// #000000 - black - беспроводное
	// #62a374 - green - оптоволокно
function checkRoute(jsonData, connectId, count)
{
	if(count==0)
		return false;
	for (var i = 0; i < jsonData.length; i++) {
		if (jsonData[i].id == connectId)
		{
			if (jsonData[i].on_off == 0)
				return false;
			else
			{
				if (jsonData[i].connect_id == 0)
					return true;
				else
					return checkRoute(jsonData, jsonData[i].connect_id, count-1);
			}
		}
	}
	return false;
}

function addDOMMarker(map, color, lngARG, latARG, idARG, modelARG, connect_idARG, on_offARG, ftypeARG, inf_countARG, smotrARG, textMarker, cabelTypeARG, connectTypeARG)
{
	var outerElement = document.createElement('div'),
	innerElement = document.createElement('div');

	outerElement.title = ftypeARG + " " + modelARG + " id=" + idARG;

	outerElement.style.userSelect = 'none';
	outerElement.style.webkitUserSelect = 'none';
	outerElement.style.msUserSelect = 'none';
	outerElement.style.mozUserSelect = 'none';
	outerElement.style.cursor = 'default';

	innerElement.style.color = 'white';
	//innerElement.style.backgroundColor = 'blue';
	innerElement.style.backgroundColor = color;
	innerElement.style.border = '2px solid black';
	innerElement.style.font = 'normal 12px arial';
	innerElement.style.lineHeight = '12px'

	innerElement.style.paddingTop = '2px';
	innerElement.style.paddingLeft = '4px';
	innerElement.style.width = '20px';
	innerElement.style.height = '20px';

	// add negative margin to inner element
	// to move the anchor to center of the div
	innerElement.style.marginTop = '-10px';
	innerElement.style.marginLeft = '-10px';

	outerElement.appendChild(innerElement);

	// Add text to the DOM element
	innerElement.innerHTML = textMarker;

	function changeOpacity(evt) {
		evt.target.style.opacity = 0.6;
	};

	function changeOpacityToOne(evt) {
		evt.target.style.opacity = 1;
	};

	//create dom icon and add/remove opacity listeners
	var domIcon = new H.map.DomIcon(outerElement, {
	// the function is called every time marker enters the viewport
		onAttach: function(clonedElement, domIcon, domMarker) {
			clonedElement.addEventListener('mouseover', changeOpacity);
			clonedElement.addEventListener('mouseout', changeOpacityToOne);
			//clonedElement.addEventListener('mousedown', testFunc);
			//clonedElement.addEventListener('mousedown', function(){testFunc("TESTARG");});
			//clonedElement.addEventListener('mousedown', function(){testFunc("lng=" + lngARG + " lat=" + latARG);});
			clonedElement.addEventListener('mousedown', function(){getObjectInfo(idARG, latARG, lngARG, modelARG, connect_idARG, on_offARG, ftypeARG, inf_countARG, smotrARG, cabelTypeARG, connectTypeARG);});
			//clonedElement.addEventListener('dblclick', function(){testFunc('1');});
		},
	// the function is called every time marker leaves the viewport
		onDetach: function(clonedElement, domIcon, domMarker) {
			clonedElement.removeEventListener('mouseover', changeOpacity);
			clonedElement.removeEventListener('mouseout', changeOpacityToOne);
		}
	});

	// Marker for Chicago Bears home
	var bearsMarker = new H.map.DomMarker({lng:lngARG , lat: latARG}, {
		icon: domIcon
	});
	map.addObject(bearsMarker);
}

function testFunc(argument)
{
	alert("HELLO WROT!" + argument);
	return;
}

function getObjectInfo(id, lat, lng, model, connect_id, on_off, ftype, inf_count, smotr, cabelType, connectType)
{
	document.getElementById('form2').style.display = "block";
	showHomeRoutersTable(id);
	$('#id2').val(id);
	$('#lat2').val(lat);
	$('#lng2').val(lng);
	$('#model2').val(model);
	$('#connect_id2').val(connect_id);
	$('#on_off2').val(on_off);
	$('#ftype2').val(ftype);
	$('#inf_count2').val(inf_count);
	$('#smotr2').val(smotr);
	$('#cabelType2').val(cabelType);
	$('#connectType2').val(connectType);
}

function disableRouter()
{
	var check = confirm('Вы собираетесь нажать на питание роутера с ID=' + $('#id2').val() + ' Продолжить?' );
	if (check == false)
		return;
	else
	{
	var xhr = new XMLHttpRequest();
		// 2. Конфигурируем его: GET-запрос на URL
	xhr.open('GET', 'http://aumsuhere.tmweb.ru/api/db/off/' + $('#id2').val(), false);
		// 3. Отсылаем запрос
	xhr.send();

	if (xhr.status == 200) {
		  location.reload();
	}

	}
}

function addNewObjectOnMap()
{

	if(($('#ftype').val() == '') || ($('#connect_id').val() == '') || ($('#inf_count').val() == '') || ($('#lat').val() == '')
		|| ($('#lng').val() == '') || ($('#model').val() == '') || ($('#on_off').val() == '') || ($('#smotr').val() == '')
	|| ($('#on_off').val() == 'Выберите') || ($('#ftype').val() == 'Выберите') || ($('#cabelType').val() == 'Выберите') || ($('#connectType').val() == '') )
	{
		alert("НЕ ВСЕ ПОЛЯ ЗАПОЛНЕНЫ!!!");
		return;
	}

	var json = JSON.stringify({
	  lat: $('#lat').val(),
	  lng: $('#lng').val(),
	  model: $('#model').val(),
	  connect_id: $('#connect_id').val(),
	  on_off: $('#on_off').val(),
	  Type: $('#ftype').val(),
	  inf_count: $('#inf_count').val(),
	  smotr: $('#smotr').val(),
	  type_of_cabel: $('#cabelType').val(),
	  type_of_connection: $('#connectType').val(),
	});

	var xhr = new XMLHttpRequest();
	xhr.open("POST", 'http://aumsuhere.tmweb.ru/api/db/add_router', true);
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.send(json);

	console.log(xhr.responseText);
	xhr.onreadystatechange = function() {//Вызывает функцию при смене состояния.
	if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        // Запрос завершен. Здесь можно обрабатывать результат.
		location.reload();
    }}

	//alert(json);
}

function updateObjectOnMap()
{
	if(($('#ftype2').val() == '') || ($('#connect_id2').val() == '') || ($('#inf_count2').val() == '') || ($('#lat2').val() == '')
		|| ($('#lng2').val() == '') || ($('#model2').val() == '') || ($('#on_off2').val() == '') || ($('#id2').val() == '') || ($('#smotr2').val() == '')
	|| ($('#on_off2').val() == 'Выберите') || ($('#ftype2').val() == 'Выберите') || ($('#cabelType2').val() == 'Выберите') || ($('#connectType2').val() == '') )
	{
		alert("НЕ ВСЕ ПОЛЯ ЗАПОЛНЕНЫ!!!");
		return;
	}

	var json = JSON.stringify({
	  lat: $('#lat2').val(),
	  lng: $('#lng2').val(),
	  model: $('#model2').val(),
	  connect_id: $('#connect_id2').val(),
	  on_off: $('#on_off2').val(),
	  Type: $('#ftype2').val(),
	  inf_count: $('#inf_count2').val(),
	  smotr: $('#smotr2').val(),
	  id: $('#id2').val(),
	  type_of_cabel: $('#cabelType2').val(),
	  type_of_connection: $('#connectType2').val(),
	});

	var xhr = new XMLHttpRequest();
	xhr.open("POST", 'http://aumsuhere.tmweb.ru/api/db/update_router', true);
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.send(json);

	console.log(xhr.responseText);

	xhr.onreadystatechange = function() {//Вызывает функцию при смене состояния.
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        // Запрос завершен. Здесь можно обрабатывать результат.
		location.reload();
    }
}

}

function deleteObjectOnMap()
{
	var check = confirm('Вы собираетесь удалить роутер с ID=' + $('#id2').val() + ' Продолжить?' );
	if (check == false)
		return;
	else
	{
	var xhr = new XMLHttpRequest();
		// 2. Конфигурируем его: GET-запрос на URL
	xhr.open('GET', 'http://aumsuhere.tmweb.ru/api/db/delete_by_id/' + $('#id2').val(), false);
		// 3. Отсылаем запрос
	xhr.send();

	if (xhr.status == 200) {
		  location.reload();
	}

	}
}

function showHomeRoutersTable(commutatorId)
{
	document.getElementById('panel').style.display = "block";
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://aumsuhere.tmweb.ru/api/db/view_home_routers?connect_id=' + commutatorId, false);
	xhr.send();
	if (xhr.status != 200) {
		alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
	}
	else {
		var resultText = '';
		var jsonData = JSON.parse(xhr.responseText);
		for (var i = 0; i < jsonData.length; i++) {
			//resultText += '<tr><th scope="row"><small>' + jsonData[i].on_off + '</th><td><small>' + jsonData[i].id +'</td><td><small>' + jsonData[i].model + '</td></small><tr>';
			resultText += '<tr><td style="border-bottom: 1px solid black;width: 10%;border-right: 1px solid black;text-align: center;">' + jsonData[i].on_off + '</td><td style="width: 10%;border-bottom: 1px solid black;border-right: 1px solid black;text-align: center;">' + jsonData[i].id +'</td><td style="border-bottom: 1px solid black">' + jsonData[i].model + '</td></tr>';
		}
		$('#clientList').html(resultText);
		$("#myTable1").trigger('updateCache');
		console.log(resultText);
	}
}


//http://aumsuhere.tmweb.ru/api/db/delete_by_id/84

    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    window.onload = function () {
        addMarkersToMap(map);

    }


