class ConfirmationPage {

    constructor(page)
    {
        this.page = page;

        this.orderNumber = page.locator('#order_no');
        this.myItineraryButton = page.locator('#my_itinerary');
    }

    async clickMyItinerary()
    {
        await this.myItineraryButton.click();
    }

}
export default ConfirmationPage;