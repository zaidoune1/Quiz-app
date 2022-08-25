// call elements :

let myCount = document.querySelector(".count span");
let quizArea = document.querySelector(".quiz-app .quiz-area");
let bullets = document.querySelector(".bullets .spans");
let answersArea = document.querySelector(".answers-area");
let button = document.querySelector(".submit-button");
let bulletss = document.querySelectorAll(".bullets .spans span");
let countdownContainer = document.querySelector(".countdown");
let bulletsContainer =document.querySelector(".bullets");

// varibals for globaly : 

let count = 0;
let counterForRusalt = 0;
let caountDawntResults;

// creet button start

let buttonStart = document.createElement("button");
let buttonElement = document.createElement("h1");
let txtButtonStart = document.createTextNode("Start");
buttonStart.appendChild(buttonElement)
buttonElement.appendChild(txtButtonStart);
quizArea.appendChild(buttonStart);

buttonStart.style.cssText = "margin-left: 265px; margin-top: 40px; align-items: center; height: 80px;  width: 200px; border: none; border-radius: 20%; background-color: #0075ff; color: white; cursor: pointer;"

button.className = "off"; //display none 

buttonStart.onclick = function() {

    button.className = "submit-button"; // show button submit 

    // get api information :

    buttonStart.remove();

    function getInformationApi() {
        let informationApi = new XMLHttpRequest()
    
        informationApi.onreadystatechange = function() {
            if(this.readyState === 4 && this.status === 200) {
                let apiGet = JSON.parse(this.response);
                let counterLength = apiGet.length;
                console.log(apiGet);
    
    
                countCounter(counterLength);
    
    
                getTitlesAndQuestions(apiGet[count], counterLength);
    
                caountDan(3, counterLength);
                
                // button for givet the next page :

                    button.onclick = function() {
    
                        clearInterval(caountDawntResults);
                        
                        // get a right_answer :
                            let gg = apiGet[count]["right_answer"];
            
                        // get next question :
    
                            getRightAnswer(gg, counterLength);
                            count++;
                            quizArea.innerHTML = "";
                            answersArea.innerHTML = "";
                            getTitlesAndQuestions(apiGet[count], counterLength);
                            nextBullets();
    
                            showResult(counterForRusalt, counterLength);
    
                            caountDan(3, counterLength);
    
                };
    
        
            };
    
        };
    
        
    
        informationApi.open("GET", "html_questions.json", true);
        informationApi.send();
    }
    
    // get counter of question number :
    
    function countCounter(num) {
    
        myCount.innerHTML = num;
    
        // creet bullets of questions :
    
        for(let i = 1; i <= num; i++) {
    
            let spansForBullets = document.createElement("span");
            if(i === 1) {
                spansForBullets.classList = "on";
            }
            bullets.appendChild(spansForBullets);
        };
    
    };
    
    
    // creet element h2 fot title of questions : 
    
    function getTitlesAndQuestions(obj, elem) {
    
        if(count < elem) {
    
        let hTwoTtitle = document.createElement("h2");
        let textTitle = document.createTextNode(obj["title"]);
        hTwoTtitle.appendChild(textTitle);
        quizArea.appendChild(hTwoTtitle);
    
        // creet answers elements :
    
        for(let i = 1; i <= 4 ; i++) {
    
            let div = document.createElement("div");
            div.className = "answer";
            let myInput = document.createElement("input");
            myInput.type = "radio";
            myInput.name = "blue";
            myInput.id = [`answer_${i}`];
            myInput.dataset.ans = obj[`answer_${i}`];
    
            div.appendChild(myInput);
            answersArea.appendChild(div);
    
            if(i === 1) {
                myInput.checked = true;
            };
    
            let labelElem = document.createElement("label");
            labelElem.htmlFor = [`answer_${i}`];
            labelElem.appendChild(document.createTextNode(obj[`answer_${i}`]));
            div.appendChild(myInput);
            div.appendChild(labelElem);
        };
    
    };
    
    };
    
    getInformationApi();

    // coparation for right answer and current answer :
    
    function getRightAnswer(rAnswer, cn) {
        
        let bluNames = document.getElementsByName("blue");
        let goCounts;
        
        for(let i = 0; i < bluNames.length; i++) {
            
            if(bluNames[i].checked) {
    
                goCounts = bluNames[i].dataset.ans
    
                if(goCounts === rAnswer) {
    
                    counterForRusalt++
        
                };
            };
        
        };
    
    };
    
    // get backgraoundcolor for next bullets
    
    function nextBullets() {
    
        let bullets = document.querySelectorAll(".bullets .spans span");
    
        let nweArry = Array.from(bullets);
    
        nweArry.forEach((span, index) => {
    
            if(count === index) {
    
                span.className = "on";
    
            };
    
        });
    
    };

    // shwo finily results good or bad :
    
    function showResult(viewResult, numElem) {
    
        if(count === numElem) {
            bulletsContainer.remove();
            button.remove();
            countdownContainer.remove();
            let titleOfResults = document.createElement("h1");
            let txtOfTitleResults = document.createTextNode("Results :");
            titleOfResults.appendChild(txtOfTitleResults);
            quizArea.appendChild(titleOfResults);
    
            let goodOrBad = document.createElement("h2");
            goodOrBad.style.cssText = "text-align: center; padding-top: 40px;";
            answersArea.appendChild(goodOrBad);
                
    
            if( viewResult > 6) {
    
            let txtOfResultsGood = document.createTextNode(`good job you result is ${viewResult}`);
            goodOrBad.appendChild(txtOfResultsGood);
    
            }else {
                let txtOfResultsGood = document.createTextNode(`Bad nwes your result is ${viewResult}`);
                goodOrBad.appendChild(txtOfResultsGood);
            };
        };
    };

    // caount daown for any quetion : 
    
    function caountDan(duration, elem) {
    
        if(count < elem) {
    
            let minuts, secends;
    
            caountDawntResults = setInterval(function() {
    
                minuts = parseInt(duration / 60);
                secends = parseInt(duration % 60);
    
                minuts = minuts < 10 ? `0${minuts}` : minuts; 
                secends = secends < 10 ? `0${secends}` : secends; 
                countdownContainer.innerHTML = `${minuts}:${secends} `;
    
                if(--duration < 0) {
    
                    clearInterval(caountDawntResults);
                    button.click();
                }
    
            }, 1000);
    
    
        };
    
    
    };
    
    
    


}



