const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");


	gameEngine.init(ctx);

	gameEngine.addEntity(new Automata(gameEngine));

	document.getElementById("stripe").addEventListener("click", () =>{
		//clear the current entities
		gameEngine.removeEntities();
		//create a new entity, clear it of the default random pattern, and add the striped pattern
		let newEt = new Automata(gameEngine);
		newEt.clear();
		newEt.createStripedPattern();
		gameEngine.addEntity(newEt);
		//Force a draw to update the board. This way, the canvas updates even if the game is paused.
		gameEngine.draw();		
	});
	document.getElementById("checker").addEventListener("click", () =>{
		//clear the current entities
		gameEngine.removeEntities();
		//create a new entity, clear it of the default random pattern, and add the striped pattern
		let newEt = new Automata(gameEngine);
		newEt.clear();
		newEt.createGridPattern();
		gameEngine.addEntity(newEt);
		//Force a draw to update the board. This way, the canvas updates even if the game is paused.
		gameEngine.draw();		
	});
	document.getElementById("clear").addEventListener("click", () => {
		//Remove all entities and reset the front-end tick count
		gameEngine.removeEntities();
		document.getElementById("ticks").innerHTML = "Ticks: 0";
	});
	document.getElementById("random").addEventListener("click", () => {
		//Remove all entities and reinitialize a new Automata
		gameEngine.removeEntities();
		gameEngine.addEntity(new Automata(gameEngine));

	})

	gameEngine.start();
});
