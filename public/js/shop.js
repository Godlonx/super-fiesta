import { piecesUpgrade } from "./data.js";

export class Shop {
    constructor(level) {
        this.level = level;
        this.upgrade1 = piecesUpgrade.lvl[this.level].pieces[0]
        this.upgrade2 = piecesUpgrade.lvl[this.level].pieces[1]
        this.upgrade3 = piecesUpgrade.lvl[this.level].pieces[2]
        this.shop = null;
    }

    createShop() {
        const shop = document.createElement("div");
        shop.className = "shop";
        shop.innerHTML = `
        <div class="upgrade">
            <p class="name">${this.upgrade1}</p>
            <img src="../public/img/pawn_pic.jpg">
            <button id="choice1">Choisir</button>
        </div>
        <div class="upgrade">
            <p class="name">${this.upgrade2}</p>
            <img src="../public/img/pawn_pic.jpg">
            <button id="choice2">Choisir</button>
        </div>
        <div class="upgrade">
            <p class="name">${this.upgrade3}</p>
            <img src="../public/img/pawn_pic.jpg">
            <button id="choice3">Choisir</button>
        </div>
        `;
        document.body.appendChild(shop);
        this.shop = shop;

        const choice1 = document.getElementById("choice1");
        const choice2 = document.getElementById("choice2");
        const choice3 = document.getElementById("choice3");

        choice1.addEventListener("click", () => {
            this.upgrade = this.upgrade1;
            this.returnUpgrade();
        });

        choice2.addEventListener("click", () => {
            this.upgrade = this.upgrade2;
            this.returnUpgrade();
        });

        choice3.addEventListener("click", () => {
            this.upgrade = this.upgrade3;
            this.returnUpgrade();
        });
    }

    returnUpgrade() {
        this.shop.remove();
        const selectedUpgrade = document.createElement("div");
        selectedUpgrade.textContent = `Upgrade sélectionné : ${this.upgrade}`;
        document.body.appendChild(selectedUpgrade);
    }
}