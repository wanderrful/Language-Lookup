/// DEBUG
//console.log("*** ~/background.js ENTRY");



let fn_GetDefinition = (a_URL) => {
	browser.tabs.create({ "url":  a_URL });

	/// DEBUG
	//console.log("*** ~/background.js::fn_GetDefinition -- opening tab: ${a_URL}");
};

let fn_Lookup_ES = (a_TextToTranslate) => {
	fn_GetDefinition( `http://dle.rae.es/?w=${a_TextToTranslate}` );
};
let fn_Lookup_FR = (a_TextToTranslate) => {
	fn_GetDefinition( `http://www.le-dictionnaire.com/definition.php?mot=${a_TextToTranslate}` );
};
let fn_Lookup_KO = (a_TextToTranslate) => {
	fn_GetDefinition( `http://endic.naver.com/search.nhn?sLn=kr&query=${a_TextToTranslate}` );
};
let fn_Lookup_PT = (a_TextToTranslate) => {
	fn_GetDefinition( `https://www.priberam.pt/dlpo/default.aspx?pal=${a_TextToTranslate}` );
};
let fn_Lookup_SW = (a_TextToTranslate) => {
	fn_GetDefinition( `http://folkets-lexikon.csc.kth.se/folkets/folkets.en.html#lookup&${a_TextToTranslate}` );
};



/// *** The right-click menu options!
browser.contextMenus.create({
	id: "sxf_spanish",
	title: "Spanish",
	contexts: ["selection"]
});
browser.contextMenus.create({
	id: "sxf_french",
	title: "French",
	contexts: ["selection"]
});
browser.contextMenus.create({
	id: "sxf_korean",
	title: "Korean",
	contexts: ["selection"]
});
browser.contextMenus.create({
	id: "sxf_portuguese",
	title: "Portuguese",
	contexts: ["selection"]
});
browser.contextMenus.create({
	id: "sxf_swedish",
	title: "Swedish",
	contexts: ["selection"]
});



/// *** Event Handler
browser.contextMenus.onClicked.addListener( (info, tab) => {
	/// DEBUG
	//console.log("*** browser.menus.onClicked.addListener event handler ENTRY");

	/// Figure out what the thing is that we'll be looking up
	let textToTranslate = info.selectionText;

	/// DEBUG
	//console.log(`*** textToTranslate = ${textToTranslate}`);

	if (!textToTranslate) {
		console.log("*** Language-Lookup/background.js ERROR -- tried to translate text, but no selected text was found!")
	}

	
	/// What to do when the menu item, based on its 'id', has been chosen!
	switch (info.menuItemId) {
		case "sxf_spanish":
			fn_Lookup_ES(textToTranslate);			
			break;
		case "sxf_french":
			fn_Lookup_FR(textToTranslate);
			break;
		case "sxf_korean":
			fn_Lookup_KO(textToTranslate);
			break;
		case "sxf_portuguese":
			fn_Lookup_PT(textToTranslate);
			break;
		case "sxf_swedish":
			fn_Lookup_SW(textToTranslate);
			break;
	}
});