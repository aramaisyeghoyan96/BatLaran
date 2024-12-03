const apiKey = 'f781595a3184777fa4312e1701d028d4'; 
const city = 'Stockholm'; 
const units = 'metric'; 
const lang = 'sv'; 

async function fetchWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&lang=${lang}&appid=${apiKey}`);
        const data = await response.json();

        if (data.cod === 200) {
            const temperature = data.main.temp; 
            const description = data.weather[0].description; 
            
            
            document.getElementById('weather-info').innerHTML = `
                ${city}: ${temperature}°C, ${description}
            `;
        } else {
            document.getElementById('weather-info').innerText = 'Kunde inte hämta väderdata.';
        }
    } catch (error) {
        console.error('Fel vid hämtning av väderdata:', error);
        document.getElementById('weather-info').innerText = 'Något gick fel.';
    }
}

// Kör funktionen när sidan laddas
fetchWeather();





const dynamicTxt = document.querySelector('.dynamic-txt');
const words = ['Vattenskoter', 'Fritidsbåt', 'Kustskepparintyg']; 
let wordIndex = 0; 
let charIndex = 0; 
let isDeleting = false; 

function typeEffect() {
    const currentWord = words[wordIndex];
    const displayedText = currentWord.slice(0, charIndex);


    dynamicTxt.textContent = displayedText;

    if (!isDeleting) {
        
        if (charIndex < currentWord.length) {
            charIndex++;
            setTimeout(typeEffect, 100);
        } else {
            isDeleting = true;
            setTimeout(typeEffect, 1000); 
        }
    } else {
        
        if (charIndex > 0) {
            charIndex--;
            setTimeout(typeEffect, 50); 
        } else {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 500); 
        }
    }
}


typeEffect();

let currentPage = 0; 
const pages = document.querySelectorAll('.kurs-boxar .page');
const dots = document.querySelectorAll('.dot');

function changePage(direction) {
    const current = pages[currentPage]; 
    let nextPageIndex = currentPage + direction;

  
    if (nextPageIndex >= pages.length) {
        nextPageIndex = 0; 
    } else if (nextPageIndex < 0) {
        nextPageIndex = pages.length - 1;
    }

    const next = pages[nextPageIndex]; 

    
    if (direction === 1) {
        current.classList.add('exit-left'); 
    } else {
        current.classList.add('exit-right'); 
    }

    
    setTimeout(() => {
        current.classList.remove('active', 'exit-left', 'exit-right'); // Dölj nuvarande
        next.classList.add('active'); // Gör nästa synlig efter övergången
        currentPage = nextPageIndex; // Uppdatera aktuell sida

        
        updateDots();
    }, 200); 
}

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentPage);
    });
}


document.querySelector('.prev').addEventListener('click', () => changePage(-1));
document.querySelector('.next').addEventListener('click', () => changePage(1));

pages[currentPage].classList.add('active');
updateDots();


document.querySelector('.hamburger-icon').addEventListener('click', function() {
    document.querySelector('.menu-links').classList.add('active');
    document.querySelector('.close-menu').classList.add('active');  // Visa kryssikonen när menyn öppnas
    document.body.classList.add('menu-active'); // Lås skärmen när menyn är öppen
});

document.querySelector('.close-menu').addEventListener('click', function() {
    document.querySelector('.menu-links').classList.remove('active');
    document.querySelector('.close-menu').classList.remove('active');  // Dölj kryssikonen när menyn stängs
    document.body.classList.remove('menu-active'); // Släpp låsningen på skärmen när menyn stängs
});



    document.addEventListener('DOMContentLoaded', function() {
        // Hitta alla menyitems som har undermenyer
        const menuItems = document.querySelectorAll('.menu-item');

        menuItems.forEach(item => {
            // Lägg till en eventlyssnare på varje meny-item
            item.addEventListener('click', function(e) {
                // Förhindra att sidan laddas om vid klick
                e.preventDefault();

                // Hitta undermenyn för den här itemen
                const subMenu = item.querySelector('.sub-menu');

                // Hitta pilen för den här itemen
                const arrow = item.querySelector('.arrow');

                // Toggle visa/dölj undermenyn
                if (subMenu) {
                    // Visa/dölj undermenyn
                    subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';

                    // Lägg till/ta bort rotera-klassen på pilen
                    if (arrow) {
                        arrow.classList.toggle('rotate');
                    }
                }

                // Om du vill att endast en undermeny ska visas åt gången
                menuItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherSubMenu = otherItem.querySelector('.sub-menu');
                        if (otherSubMenu) {
                            otherSubMenu.style.display = 'none';
                        }

                        // Ta bort rotation på andra pilar
                        const otherArrow = otherItem.querySelector('.arrow');
                        if (otherArrow) {
                            otherArrow.classList.remove('rotate');
                        }
                    }
                });
            });
        });
    });


    















