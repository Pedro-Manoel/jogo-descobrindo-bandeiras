"use strict";

class View {
    constructor(){
        this.flagImg = document.getElementById('flag-img');
        this.confirmBtn = document.getElementById('confirm-btn');
        this.jumpBtn = document.getElementById('jump-btn');
        this.tipBtn = document.getElementById('tip-btn');
        this.jumpSpan = document.getElementById('jump');
        this.tipSpan = document.getElementById('tip');
        this.attemptsInfoSec = document.getElementById('attempts');
        this.correctAttemptsInfoSec = document.getElementById('correct-attempts');
        this.wrongAttemptsInfoSec = document.getElementById('wrong-attempts');
        this.continentInfoSec = document.getElementById('continent');
        this.capitalInfoSec = document.getElementById('capital');
        this.nameSelectedCountry = null;
    }

    getBtnCountry () {
        return document.getElementsByClassName('selected-country-btn')[0];
    }

    hideGame () {
        document.getElementById('menu').hidden = false;
        document.getElementById('game').hidden = true;
        document.getElementById('info').hidden = true;
    }

    showGame () {
        document.getElementById('menu').hidden = true;
        document.getElementById('game').hidden = false;
        document.getElementById('info').hidden = false;
    }

    showGameEnd () {
        this.confirmBtn.innerHTML = 'Novo Jogo';
        this.jumpBtn.hidden = true;
        this.tipBtn.hidden = true;
    }

    showBestGame (bestGame) {
        const existsBestGame = bestGame !== null;

        document.getElementById('best-time').innerText = existsBestGame ? bestGame.timeStr : '00:00:00';
        document.getElementById('best-attempts').innerText = existsBestGame ? bestGame.attempts : '0';
        document.getElementById('best-correct-attempts').innerText = existsBestGame ? bestGame.correctAttempts : '0';
        document.getElementById('best-wrong-attempts').innerText = existsBestGame ? bestGame.wrongAttempts : '0';
    }

    showGameInfo (numAttempts, numCorrectAttempts, numWrongAttempts, numJumps, numTips) {
        numCorrectAttempts > parseInt(this.correctAttemptsInfoSec.innerHTML)
            ? this.correctAttemptsInfoSec.innerHTML = numCorrectAttempts + ' +'
            : this.correctAttemptsInfoSec.innerHTML = numCorrectAttempts;

        numWrongAttempts > parseInt(this.wrongAttemptsInfoSec.innerHTML)
            ? this.wrongAttemptsInfoSec.innerHTML = numWrongAttempts + ' +'
            : this.wrongAttemptsInfoSec.innerHTML = numWrongAttempts;

        this.attemptsInfoSec.innerHTML = numAttempts;
        this.jumpSpan.innerHTML = numJumps;
        this.tipSpan.innerHTML = numTips;
    }

    showNewAttempt (numAttempts, numCorrectAttempts, numWrongAttempts, numJumps, numTips) {
        this.capitalInfoSec.innerHTML = '???';
        this.continentInfoSec.innerHTML = '???';
        this.confirmBtn.innerHTML = 'Confirmar'
        this.jumpBtn.hidden = false;
        this.tipBtn.hidden = false;
        this.nameSelectedCountry = null;
        this.showGameInfo(numAttempts, numCorrectAttempts, numWrongAttempts, numJumps, numTips);

        const btnCountry = this.getBtnCountry();
        if (btnCountry !== undefined) {
            if (btnCountry.classList.contains('correct-country-btn')) {
                btnCountry.disabled = true;
            }
            btnCountry.classList = 'btn country-btn';
        }
    }

    showCorrectAttempt () {
        this.confirmBtn.innerHTML = 'Continuar'
        this.getBtnCountry().classList.add('correct-country-btn');
    }

    showWrongAttempt () {
        this.confirmBtn.innerHTML = 'Continuar'
        this.getBtnCountry().classList.add('wrong-country-btn');
    }

    setFlagImg(flagImg) {
        this.flagImg.src = flagImg;
    }

    showTip (numTips, country) {
        Math.floor(Math.random() * 2) === 1
            ? this.capitalInfoSec.innerHTML = country.capital
            : this.continentInfoSec.innerHTML = country.continent;

        this.tipSpan.innerHTML = numTips;
    }

    createCountriesBtns (countries) {
        const countriesSection = document.getElementById('countries-section');
        countriesSection.replaceChildren();

        countries.map(country => {
            const btnCountry = document.createElement('button')
            btnCountry.innerHTML = country.name;
            btnCountry.classList = 'btn country-btn';
            btnCountry.value = country.name;
            btnCountry.onclick = () => {
                if (
                    btnCountry.classList.contains('selected-country-btn')
                    && !btnCountry.classList.contains('correct-country-btn')
                    && !btnCountry.classList.contains('wrong-country-btn')
                    ) {
                        btnCountry.classList.remove('selected-country-btn');
                        this.nameSelectedCountry = null;
                }
                else if (this.nameSelectedCountry === null) {
                    btnCountry.classList.add('selected-country-btn');
                    this.nameSelectedCountry = btnCountry.innerHTML;
                }

            }
            countriesSection.appendChild(btnCountry);
        })
    }
}
