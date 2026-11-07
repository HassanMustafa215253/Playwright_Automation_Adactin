class BookingPage {

    constructor(page)
    {
        this.page = page;

        this.firstName = page.locator('#first_name');
        this.lastName = page.locator('#last_name');
        this.address = page.locator('#address');
        this.ccNumber = page.locator('#cc_num');
        this.ccType = page.locator('#cc_type');
        this.ccMonth = page.locator('#cc_exp_month');
        this.ccYear = page.locator('#cc_exp_year');
        this.cvv = page.locator('#cc_cvv');
        this.bookNowButton = page.locator('#book_now');

        this.firstNameError = page.locator('#first_name_span');
        this.lastNameError = page.locator('#last_name_span');
        this.addressError = page.locator('#address_span');
        this.ccNumberError = page.locator('#cc_num_span');
    }

    async fillBookingForm(firstName, lastName, address, ccNumber, ccType, ccMonth, ccYear, cvv)
    {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.address.fill(address);
        await this.ccNumber.fill(ccNumber);
        await this.ccType.selectOption(ccType);
        await this.ccMonth.selectOption(ccMonth);
        await this.ccYear.selectOption(ccYear);
        await this.cvv.fill(cvv);
    }

    async clickBookNow()
    {
        await this.bookNowButton.click();
    }

}
export default BookingPage;