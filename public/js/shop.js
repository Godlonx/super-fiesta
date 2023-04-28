export class Shop {
    constructor(upgrade1, upgrade2, upgrade3) {
        this.upgrade1 = upgrade1;
        this.upgrade2 = upgrade2;
        this.upgrade3 = upgrade3;
        this.board = document.querySelector(".board");
        this.shop = null;
    }

    createShop() {
        this.board.remove();
        const shop = document.createElement("div");
        shop.className = "shop";
        shop.innerHTML = `
        <div class="upgrade">
            <p>${this.upgrade1}</p>
            <button id="choice1">Choisir</button>
        </div>
        <div class="upgrade">
            <p>${this.upgrade2}</p>
            <button id="choice2">Choisir</button>
        </div>
        <div class="upgrade">
            <p>${this.upgrade3}</p>
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