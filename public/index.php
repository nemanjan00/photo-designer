<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<title>Photo designer</title>

		<link rel="stylesheet" type="text/css" href="./assets/stylesheets/stylesheet.css">
		<link href="https://fonts.googleapis.com/css?family=Roboto:100&amp;subset=latin-ext" rel="stylesheet">
	</head>
	<body>
		<div class="container" ng-app="PhotoDesigner" ng-controller="PhotoEditorController">
			<div class="row">
				<div class="col-md-4 settings">
					<div class="panel panel-default">				
						<h1>Step 1 - Settings</h1>

						<textarea class="form-control" ng-model-options="{ updateOn: 'blur' }" ng-change="rerender()" rows="5" id="comment" ng-model="settings.text"></textarea>

						<div class="form-group">
							<label for="settings.textColor">Text color</label>
							<input colorpicker ng-model="settings.textColor" name="settings.textColor" ng-change="rerender()" type="text" class="form-control">
						</div>

						<div class="form-group">
							<label for="settings.shadowColor">Shadow color</label>
							<input colorpicker ng-model="settings.shadowColor" name="settings.shadowColor" ng-change="rerender()" type="text" class="form-control">
						</div>

						<div class="form-group">
							<label for="settings.fontSize">Font size</label>
							<slider ng-model="settings.fontSize" name="settings.fontSize" ng-change="rerender()" min="1" step="1" max="100"></slider>
							<input ng-model="settings.fontSize" ng-model-options="{ updateOn: 'blur' }" name="settings.fontSize" ng-change="rerender()" type="text" class="form-control">
						</div>
						<div class="form-group">
							<label for="settings.textWidth">Text width</label>
							<slider ng-model="settings.textWidth" name="settings.textWidth" ng-change="rerender()" min="0.1" step="0.1" max="1.0"></slider>
						</div>
						<div class="form-group">
							<label for="settings.textVerticalPosition">Text vertical position</label>
							<slider ng-model="settings.textVerticalPosition" name="settings.textVerticalPosition" ng-change="rerender()" min="-340" step="1" max="340"></slider>
						</div>
						<div class="form-group">
							<label for="settings.radius">Blur radius</label>
							<slider ng-model="settings.radius" name="settings.radius" ng-change="rerender()" min="0" step="1" max="180"></slider>
						</div>
						<div class="form-group">
							<label for="settings.darken">Darken</label>
							<slider ng-model="settings.darken" name="settings.darken" ng-change="rerender()" min="0" step="0.01" max="1"></slider>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="panel panel-default instagram-picker">				
						<h1>Step 2 - Pick background</h1>

						<div class="input-group search">
							<input ng-model="instagram.query" type="text" class="form-control" my-enter="instagram.search()" placeholder="Search for...">
							<span class="input-group-btn">
								<button class="btn btn-default" ng-click="instagram.search()" type="button">Go!</button>
							</span>
						</div>
						<div class="input-group search">
							<input placeholder="URL..." ng-model="url" ng-model-options="{ updateOn: 'blur' }" name="url" ng-change="rerender()" type="text" class="form-control">
							<span class="input-group-btn">
								<button class="btn btn-default" ng-click="rerender()" type="button">Go!</button>
							</span>
						</div>

						<ul class="thumbnails image_picker_selector">

							<li style="width:100%" ng-repeat="(id, p) in instagram.pics" ng-click="instagram.select(id)">
								<div class="thumbnail" ng-class="{selected: instagram.isSelected(id)}">
									<img style="width:100%;" ng-src="{{'https://cors.nemanja.top/' + p.thumb}}"/>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="col-md-4">
					<div class="panel panel-default">				
						<h1>Step 3 - Result</h1>

						<canvas id="image" style="display: none"></canvas>
						<img id="imageOut" src="https://placehold.it/640x640" style="width: 100%" class="thumbnail" />
					</div>
				</div>
			</div>
		</div>		
		<script src="./assets/javascript/javascript.js"></script> 
	</body>
</html>
