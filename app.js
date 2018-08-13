		var maxNumber = 60;
		var myCards = getMagicNumbers(maxNumber);
		var numbersPerColumn = Math.ceil(Math.ceil(maxNumber / 2) / 3);
		var currentCard = 0;
		var solution = 0;
		var width = 700,
			height = 800,
			z = 20,
			x = width / z,
			y = height / z;
				
		console.log(numbersPerColumn);
		console.log(getMagicNumbers(60)); 
		
		var myDiv = d3.select("body").append("div").attr("class", "center");
		
		myDiv.append("h1").attr("class", "task").text("Think of a number between 1 and " + maxNumber);
		myDiv.append("h5").attr("class", "task").text("Don't say the number out loud!");
		myDiv.append("h3").attr("class", "task").text("Is your number depicted on the following card?");
		
		var svg = d3.select("body").append("svg")
			.attr("width", width)
			.attr("height", height)
		var gCards = svg.selectAll("g")
			.data(myCards)
			.enter()
			.append("g")
			.attr("class", function (d,i) { return "card c" + i;})
			.attr("transform", function (d, i) { return "translate(" + (80 + i * 80) + ", 600) scale(0.6)";});
			
		gCards.append("rect")
			.attr("width", 100)
			.attr("height", 170);
			
		gCards.selectAll("text") 
			.data(function (d){ return d;})
			.enter()
			.append("text")
			.text(function (d) { return d;})
			.attr("x", 0)
			.attr("y", 0)
			.style("font-size", "12px")
			.style("text-anchor", "middle")
			.attr("transform", translateG);
			
		var answers = svg.selectAll("g.answer")
			.data(["yes","no"])
			.enter()
			.append("g")
			.attr("class", "answer")
			.attr("transform", function (d, i) { return "translate(" + (250 + i * 200) + ", 60)";});;
				
		answers.append("text")
			.text(function (d) { return d;})
			.attr("y", "0.3em")
			.style("font-size", "24px");	
			
		answers.append("circle")
			.attr("r", 50)
			.style("stroke", function(d, i) {return (i === 0) ? "green" : "red"})
			.style("fill", "lightgrey")
			.style("fill-opacity", 0.4)
			.on("mouseover", function(d, i) {
				var col = (i === 0) ? "green" : "red"; 
				d3.select(this).style("fill", col).style("stroke-width", 3);})
			.on("mouseout", function() {
				d3.select(this).style("fill", "lightgrey").style("stroke-width", 1);})
			.on("click", nextCard);	
			
		d3.select(".card.c" + currentCard)
			.transition()
			.attr("transform", "translate(250, 200) scale(2)");		
			
		function translateG(d, i) {
			return "translate(" + Math.floor(1 + i / numbersPerColumn) * 25 + ", " + (((i % numbersPerColumn) + 1) * 15)+ ")";
		}
		function getMagicNumbers(upperBound) {
			var cards = [];
			var firstNumber;
			var max = Math.log(upperBound) * Math.LOG2E; // polyfill for IE where Math.log2 doesn't work				
			// for (i = 0; i < Math.log2(upperBound); i++) {
			
			for (i = 0; i < max; i++) {
				cards[i] = [];
				firstNumber = Math.pow(2, i);
				for (number = 1; number <= upperBound; number++) {
					if (((Math.floor(number /firstNumber)) % 2) != 0) {
						cards[i].push(number);  
					}
				}
			}
			d3.shuffle(cards);
			return cards;
		}    
		function nextCard(d, i) {
			d3.selectAll("circle").style("fill", "lightgrey").style("stroke-width", 1);
			if (d === "yes") {solution = solution + myCards[currentCard][0];}
			// remove card	
			d3.select(".card.c" + currentCard)
				.transition()
				.attr("transform", "translate(400, 400) scale(0)");
				
			currentCard++;	
			if (currentCard < myCards.length) {
			// display next card
			d3.select(".card.c" + currentCard)
				.transition()
				.attr("transform", "translate(250, 200) scale(2)");
			}
			else {
				d3.selectAll("circle").remove();
				d3.selectAll("text").remove();
				d3.selectAll(".task").remove();
				myDiv.append("h1").text("Please focus on the screen!");
				console.log("solution: " +solution);
				svg.append("rect")
					.attr("x", 50)
					.attr("y", 50)
					.attr("width", 600)
					.attr("height", 250)
					.style("fill", "lightblue");
					
				svg.append("text")
					.text(solution)
					.attr("x", 350)
					.attr("y", 200)
					.style("font-size", "100px")
					.style("stroke", "black")
					.style("opacity", 0)	
					.transition().duration(7000)
					.style("opacity", 1);				
			}
		}
