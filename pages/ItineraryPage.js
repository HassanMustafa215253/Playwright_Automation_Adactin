class ItineraryPage {

    constructor(page)
    {
        this.page = page;

        this.orderIdField = page.locator('#order_id_text');
        this.goButton = page.locator('#search_hotel_id');
        this.firstOrderId = page.locator('input[name="order_id[]"]').first();
        this.logoutLink = page.locator('a[href="Logout.php"]');
        this.logoutMessage = page.locator('.reg_success');
    }

    async searchOrder(orderNo)
    {
        await this.orderIdField.fill(orderNo);
        await this.goButton.click();
    }

    async logout()
    {
        await this.logoutLink.click();
    }

}
export default ItineraryPage;   