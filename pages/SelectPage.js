class SelectPage {

    constructor(page)
    {
        this.page = page;

        this.firstHotel = page.locator('#radiobutton_0');
        this.continueButton = page.locator('#continue');
    }

    async selectFirstHotel()
    {
        await this.firstHotel.check();
        await this.continueButton.click();
    }

}
export default SelectPage;  