function render(key){
	if (key){
		pattern = keyToPattern(key);
		keyCanvas.patternizer(pattern);
	}
	else{
		//TODO produce a fully black canvas
	}
}

function subStringer(key){
	//Currently built for servald's 64 fingerprints
	var hexKey = key.replace(/[^0-9a-fA-F]/g, "");
	var x = 0;
	var fpSubStringSize = 6;
	var subStrings = [];
	var n;
	while (n != ""){
		n = key.substr(x, fpSubStringSize);
		if (n != ""){
			x += fpSubStringSize;
			subStrings.push(n);
		}
	}
	return subStrings;
}

function keyToPattern(key){
	var substrings = subStringer(key);
	var pattern = {};
	var pairNum = substrings.length;
	if (substrings[pairNum-1].length <= 5){
		var dangle = substrings[pairNum-1];
		substrings = substrings.slice(0,pairNum-1);
	}
	var	pattern =  {};
	pattern['stripes'] = makeSTRP(substrings);
	//check if a dangle, if not then use first set
	//js seems to have some issues with undefined variables, but it is fine as long as you specify (in this window it is undefined)
	pattern['bg'] = makeBG(dangle||substrings[0]);
	return pattern;
}

function makeSTRP(substrings){
	var stripeSet = [];
	length = substrings.length;
	if (length = Math.floor(length)) {
		var i = length;
	}
	else {
		substrings.push(substring[0]);
		var i =  Math.floor(length) + 1;
	}
	for (i; i >= 0; i-=2){
		tempSet = {}
		strA = substrings.pop();
		strB = substrings.pop();
		if (strB && strA){
			tempSet['mode'] = 'plaid'
			//Offset is set to small since it is just to make sure that we dont have overlap
			tempSet['offset'] = parseInt(strB[0], 16);
			//32 is a smallish, but good width for ensuring all stripes are seen, creating better variance for pattern identification
			tempSet['width'] = parseInt(strB[1], 16)*2;
			//out of 256 as that is a significant gap
			tempSet['gap'] = parseInt(strB[2], 16)*16;
			//rotation out of 180 (because beyond that its just repeating with plaid)
			tempSet['rotation'] = parseInt(strB[3], 16) * 11;
			//opacity (out of 100)
			tempSet['opacity'] = parseInt(strB[3], 16) * 6;
			//This is the actual stripe color
			tempSet['color'] = '#'+strA;
			stripeSet.push(tempSet)
		}
	}
	return stripeSet;
}

function makeBG(data){
	var color = "";
	for (var i = 0; color.length < 6; i++){
		if (data.length >= i){
			i = 0;
		}
		color = color.concat(data[i]);
	}
	return color;
}

key = "F4D0EFA6187EBC0AE6FADEC4FD42FC0220932084D084A7E833D932DC3EFB1D7B"
parsedKey = ["F4D0EF", "A6187E", "BC0AE6", "FADEC4", "FD42FC", "022093", "2084D0", "84A7E8", "33D932", "DC3EFB", "1D7B"]