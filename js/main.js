//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

const slidesContainer = document.getElementById("slides-container");
const slide = document.querySelector(".slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");

nextButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft += slideWidth;
});

prevButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slidesContainer.scrollLeft -= slideWidth;
});



document.querySelector('button').addEventListener("click", getDrink);

function getDrink(){
    const userCocktail = document.querySelector('input').value
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+userCocktail)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        
        //document.querySelector('h3').innerText = data.drinks[0].strInstructions
        
        let slide = document.getElementsByClassName('slide1')[0]
        let slideContainer = document.getElementById('slides-container')
        
        let slideDelete = document.getElementsByClassName('slide')
        for (i=1; i<(slideDelete.length);) {
            slideDelete[i].remove()
        }
        
        for(i=2;i<=data.drinks.length;i++){
            slideContainer.appendChild(slide.cloneNode(true))
            //document.getElementsByClassName("slide")[-1].className = 
            document.getElementsByClassName("slide")[document.getElementsByClassName("slide").length-1].className = `slide slide${i}`
            // document.getElementsByClassName(`slide${i}`).childNodes.className=`slide${i}`
        }
        let counter=0
        for(const drinkElem of data.drinks){
            document.getElementsByTagName('h2')[counter].innerText = drinkElem.strDrink
            document.getElementsByTagName('img')[counter].src = drinkElem.strDrinkThumb
            
            let drink = new CocktailInfo(drinkElem, (counter))
            console.log(drinkElem)
            drink.listInstruct()
            counter++ 

            
        }
        
    })
}


class CocktailInfo {
    constructor(cocktailData, caraNum) {
        //passing in str.drinks[0]
        this.instruct = cocktailData.strInstructions.split('.')
        this.instruct = this.instruct.slice(0, this.instruct.length-1)
        this.cara = caraNum

    }
    listInstruct() {

        let listRef = document.getElementsByTagName('ol')[this.cara]
        
        listRef.innerHTML=''

        if (!(this.instruct ==null)){
            for (const item of this.instruct) {
                let newPoint = document.createElement('li')
                let text = document.createTextNode(item);
                
                newPoint.appendChild(text)
                listRef.appendChild(newPoint)
            }
        }
    }
}