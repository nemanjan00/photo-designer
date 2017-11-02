var app = angular.module("PhotoDesigner", ['colorpicker.module', 'ui.bootstrap-slider']);

app.factory('unsplash', ['$http', function($http){
	return {
		fetchHashtag: function(hashtag, callback){
			
			var endPoint = "https://aggregator-backend.nemanja.top/search/"+encodeURIComponent(hashtag);
			
			$http.get(endPoint).success(function(response){
				callback(response);
			});
		}
	}

}]);

app.directive('myEnter', function () {
	return function (scope, element, attrs) {
		element.bind("keydown keypress", function (event) {
			if(event.which === 13) {
				scope.$apply(function (){
					scope.$eval(attrs.myEnter);
				});
				
				event.preventDefault();
			}
		});
	};
});

app.controller('PhotoEditorController', ['$scope', 'unsplash', function ($scope, unsplash){
	var wathermark = new Image();
	wathermark.src = "./assets/images/wathermark.png"
	
	$scope.instagram = {};
	$scope.instagram.pics = [];
	$scope.instagram.query = "sky";
	$scope.instagram.selected = -1;

	$scope.url = "";

	$scope.settings = {};
	$scope.settings.text = "Žene UVEK tačno ZNAJU šta rade, ali NIKAD ne znaju šta HOĆE! ";
	$scope.settings.textColor = "#ffffff";
	$scope.settings.shadowColor = "#000000";
	$scope.settings.fontSize = "40";
	$scope.settings.textWidth = 0.9;
	$scope.settings.font = "Anton";
	$scope.settings.textVerticalPosition = 0;
	$scope.settings.radius = 0;
	$scope.settings.darken = 0;

	$scope.output = {};
	$scope.output.image = "";

	$scope.instagram.search = function(){
		unsplash.fetchHashtag($scope.instagram.query, function(data){
			$scope.instagram.selected = -1;
			$scope.instagram.pics = data;
		});
	}

	$scope.$watch('instagram.query', function(nVal, oVal) {
		if (nVal !== oVal) {
			$scope.instagram.search();
		}
	});

	$scope.instagram.select = function(id){
		$scope.instagram.selected = id;

		$scope.url = $scope.instagram.pics[$scope.instagram.selected].full;

		$scope.rerender();
	}

	$scope.rerender = function(){
		if($scope.url == "") return false;
		
		var width = 640;
		var height = 640;

		var fontSizePt = $scope.settings.fontSize;
		var fontSizePx = 4 / 3 * fontSizePt;


		var canvas = document.getElementById("image");


		var imageObj = new Image();

		imageObj.crossOrigin = "Anonymous";

		imageObj.onload = function(){
			StackBlur.image(imageObj, canvas, $scope.settings.radius, true);

			var src = canvas.toDataURL("image/jpeg", 90);

			var img = document.createElement('img');
			img.src = src;

			img.onload = function(){
				canvas.width = width;
				canvas.height = height;

				if(imageObj.width > imageObj.height){
					var scale = height / imageObj.height;

					imageObj.width = imageObj.width * scale;;
					imageObj.height = height;
				}
				else
				{
					var scale = width / imageObj.width;

					imageObj.width = width;
					imageObj.height = imageObj.height * scale;
				}

				var context = canvas.getContext("2d");

				context.drawImage(img, (-1*(imageObj.width - width))/2, (-1*(imageObj.height - height))/2, imageObj.width, imageObj.height);

				context.fillStyle = "rgba(0, 0, 0, "+$scope.settings.darken+")";
				context.fillRect(0, 0, width, height);

				context.drawImage(wathermark, width - wathermark.width, height - wathermark.height, wathermark.width, wathermark.height);

				context.font = fontSizePt+"pt "+$scope.settings.font;

				var lines = $scope.settings.text.split("\n");
				lines = lines.map(function(line){
					return $scope.getLines(context, line, width*$scope.settings.textWidth);
				});

				var newLines = [];

				lines.forEach(function(line){
					newLines = newLines.concat(line);
				});

				lines = newLines;

				var top = (height - lines.length * fontSizePx) / 2;

				for(i = 0; i < lines.length; i++){
					var textWidth = context.measureText(lines[i]).width;

					context.shadowColor = 'black';
					context.shadowBlur = 10;

					context.fillStyle = $scope.settings.textColor;
					context.fillText(lines[i], (width - textWidth) / 2, top + fontSizePx * (i + 1) + $scope.settings.textVerticalPosition);
				}

				document.getElementById("imageOut").src = canvas.toDataURL("image/png", "image/jpeg", 90);
			}
		};
		imageObj.src = "https://cors.nemanja.top/"+$scope.url; 
	}

	$scope.getLines = function(ctx, text, maxWidth) {
		var words = text.split(" ");
		var lines = [];

		var currentLine = words[0];

		for (var i = 1; i < words.length; i++) {
			var word = words[i];
			var width = ctx.measureText(currentLine + " " + word).width;
			if (width < maxWidth) {
				currentLine += " " + word;
			} else {
				lines.push(currentLine);

				currentLine = word;
			}
		}

		if(currentLine != ""){
			lines.push(currentLine);
		}

		return lines;
	}

	$scope.instagram.isSelected = function(id){
		return $scope.instagram.selected == id;
	}

	$scope.instagram.search();
}]);

