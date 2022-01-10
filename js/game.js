"use strict";

class Game {
    constructor (numTips, numJumps, numNewTip, numNewJump) {
        this.view = new View(); // Componente visual do jogo
        this.currentTime = new Chronometer('current-time'); // Cronômetro do jogo
        this.numTips = numTips; // Número de dicas disponíveis
        this.numInitTips = numTips; // Número de dicas inicial
        this.numJumps =  numJumps; // Número de pulos disponíveis
        this.numInitJumps =  numJumps; // Número de pulos inicial
        this.numNewTip = numNewTip; // Número de tentativas certas para ganhar uma dica
        this.numNewJump = numNewJump; // Número de tentativas certas para ganhar um pulo
        this.numCorrectAttempts; // Número de tentativas corretas
        this.numWrongAttempts; // Número de tentativas erradas
        this.numCorrectSequences; // Número de sequências corretas
        this.country; // País atual do jogo
        this.countries; // Países disponíveis para escolha
        this.tipShown; // Dica monstrada
        this.itPlayed; // Jogada realizada
        this.showBestGame();
    }

    getNumAttempts () {
        return this.numCorrectAttempts + this.numWrongAttempts;
    }

    getGameEnd () {
        return this.countries.length === 0;
    }

    selectRandomCountry () {
        this.country = this.countries[Math.floor(Math.random() * this.countries.length)];
    }

    showBestGame () {
        this.view.showBestGame(this.getBestGame());
    }

    getBestGame () {
        return JSON.parse(localStorage.getItem('bestGame'));
    }

    setBestGame () {
        localStorage.setItem('bestGame', JSON.stringify({
            timeStr: this.currentTime.toString(),
            timeInt: this.currentTime.toInt(),
            attempts: this.getNumAttempts(),
            correctAttempts: this.numCorrectAttempts,
            wrongAttempts: this.numWrongAttempts
        }));
    }

    stop () {
        this.view.showGameEnd();
        this.currentTime.pause();
    }

    openMenu () {
        this.stop();
        this.view.showBestGame(this.getBestGame());
        this.view.hideGame();
    }

    newAttempt () {
        this.selectRandomCountry();
        this.view.setFlagImg(this.country.flag);
        this.view.showNewAttempt(this.getNumAttempts(), this.numCorrectAttempts, this.numWrongAttempts, this.numJumps, this.numTips);
        this.tipShown = false;
    }

    verifyAttempt () {
        if (this.view.nameSelectedCountry !== null && !this.itPlayed && !this.getGameEnd()) {
            this.itPlayed = true;
            if (this.country.name === this.view.nameSelectedCountry) {
                this.numCorrectAttempts += 1;
                this.numCorrectSequences += 1;
                this.countries = this.countries.filter(country => country.name !== this.country.name);
                this.view.showCorrectAttempt();
            } else {
                this.numWrongAttempts += 1;
                this.numCorrectSequences = 0;
                this.view.showWrongAttempt();
            }

            if (this.numCorrectSequences !== 0) {
                if (this.numCorrectSequences % this.numNewTip === 0) {
                    this.numTips += 1;
                }
                if (this.numCorrectSequences % this.numNewJump === 0) {
                    this.numJumps += 1;
                }
            }

            if (this.getGameEnd()) {
                this.stop();
                const bestGame = this.getBestGame();
                if (bestGame === null || bestGame.timeInt > this.currentTime.toInt()) {
                    this.setBestGame();
                }
            }

        } else if (this.getGameEnd()) {
            this.init();
        } else if (this.itPlayed) {
            this.itPlayed = false;
            this.newAttempt();
        }
    }

    jump () {
        if (this.numJumps > 0 && !this.itPlayed && !this.getGameEnd()) {
            this.numJumps -= 1;
            this.newAttempt();
        }
    }

    tip () {
        if(this.numTips > 0 && !this.itPlayed && !this.tipShown && !this.getGameEnd()){
            this.numTips -= 1;
            this.tipShown = true;
            this.view.showTip(this.numTips, this.country);
        }
    }

    init () {
        this.itPlayed = false;
        this.tipShown = false;
        this.countries = [...countries];
        this.country = null;
        this.numJumps = this.numInitJumps;
        this.numTips = this.numInitTips;
        this.numCorrectAttempts = 0;
        this.numCorrectSequences = 0;
        this.numWrongAttempts = 0;
        this.view.showGame();
        this.view.createCountriesBtns(this.countries);
        this.currentTime.reset();
        this.currentTime.start();
        this.newAttempt();
    }
}
