$(document).ready( function(){

	$('#color_selected img').on('click', function(){

		//Настройка изображения
		var srcValue = $(this).attr('data-img');
		var nameColor = $(this).attr('data-name');
		 

		 $('#auto_img img').attr('src', srcValue);
		 $('#modelColor').text( nameColor ); 
	});

	 //Конфигурация цены
		var modelSpecs, //Спецификация модели, кот. выбрана
			modelPrice, //Цена модели
			modelSpecHolder, //Итоговый div, куда будем помещать нашу спецификацию
			modelPriceHolder; //Итоговый div, куда будем помещать цену нашего автомобиля

		modelSpecsHolder = $('#modelSpecs'); 
		modelPriceHolder = $('#modelPrice'); 

		
		

		$('#auto_form_settings input').on('click', function(){

			compileSpecs(); 
			calculatePrice(); 

			var currencyUrl = 'http://apilayer.net/api/live?access_key=dd21ea085057882a7c68785aef46e7e2&currencies=RUB&source=USD&format=1'; 
			var rurUsdRate = 0;

			$.ajax({
				url: currencyUrl, 
				cache: false, 
				success: function(html){
					var rurUsdRate = html.quotes.USDRUB;
					 
					calculateUSD(modelPrice, rurUsdRate) ;
				}
			}); 

		});
 
		




		///////////////////////////////////////////////////////////
		//ФУНКЦИИ
		///////////////////////////////////////////////////////////

		// Функция компилирования спецификации для блока modelSpecsHolder
		function compileSpecs(){
			var engineSpec = $('input[name=engine]:checked + label', '#auto_form_settings').text();
			var topgearSpec = $('input[name=topgear]:checked + label', '#auto_form_settings').text();
			var optionsSpec = $('input[name=options]:checked + label', '#auto_form_settings').text();

			$('#modelSpecsHolder').text( engineSpec + ' ' + topgearSpec + ' ' + optionsSpec );
		}

		
		//Функция подсчета цены в руб. 
		function calculatePrice(){

			modelSpecs = ''; 
			modelPrice = 0; 

			modelPrice = parseInt( $('input[name=engine]:checked', '#auto_form_settings').val() );
			modelPrice += parseInt( $('input[name=topgear]:checked', '#auto_form_settings').val() );
			modelPrice += parseInt( $('input[name=options]:checked', '#auto_form_settings').val()) ;

		 $('#modelPriceHolder').text( addSpace( modelPrice) ); 

		}; 

		//Функция подсчета цены в дол. 
		function calculateUSD(modelPrice, rurUsdRate){
			var  modelPriceUSD =  parseInt( modelPrice ) / parseInt( rurUsdRate ); 
			 modelPriceUSD = Math.ceil(  modelPriceUSD ); 
			$('#auto_price_dollar').text( addSpace( modelPriceUSD) ); 
		}; 

		 //Функция добавления пробела между ценой
		 function addSpace(n) {
		 	return (n + "").split("").reverse().join("").replace(/(\d{3})/g, "$1 ").split("").reverse().join("").replace(/^ /, "");
		 }


 


}); 