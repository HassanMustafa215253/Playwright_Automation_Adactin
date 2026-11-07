import {test, expect} from '@playwright/test';
import loginData from '../testdata/loginData.json';
import searchData from '../testdata/searchData.json';
import bookingData from '../testdata/bookingData.json';
import LoginPage from '../pages/LoginPage';
import SearchPage from '../pages/SearchPage';
import SelectPage from '../pages/SelectPage';
import BookingPage from '../pages/BookingPage';
import ConfirmationPage from '../pages/ConfirmationPage';
import ItineraryPage from '../pages/ItineraryPage';

test('TC01 - End to End Hotel Booking Flow', async ({page}) => {

    const login = new LoginPage(page);
    const search = new SearchPage(page);
    const select = new SelectPage(page);
    const booking = new BookingPage(page);
    const confirm = new ConfirmationPage(page);
    const itinerary = new ItineraryPage(page);

    const user = loginData.validUsers[0];
    const SData = searchData.validSearch[0];
    const BData = bookingData.validBooking[0];

    //Login
    await login.gotoURL();
    await expect(page).toHaveTitle('Adactin.com - Hotel Reservation System');
    await login.login(user.username, user.password);
    await expect((login.message).first()).toHaveText(user.ExpectedMsg);
    await expect(page).toHaveTitle('Adactin.com - Search Hotel');

    //Search Hotel
    await search.searchHotel(SData.location, SData.hotel, SData.roomType, SData.rooms, SData.checkIn, SData.checkOut, SData.adults, SData.children);
    await expect(page).toHaveTitle('Adactin.com - Select Hotel');

    //Select Hotel
    await expect(select.continueButton).toBeEnabled();
    await select.selectFirstHotel();
    await expect(page).toHaveTitle('Adactin.com - Book A Hotel');

    //Book Hotel
    await booking.fillBookingForm(BData.firstName, BData.lastName, BData.address, BData.ccNumber, BData.ccType, BData.ccMonth, BData.ccYear, BData.cvv);
    await booking.clickBookNow();

    //Booking Confirmation
    await expect(confirm.orderNumber).toBeVisible({timeout: 20000});
    await expect(confirm.orderNumber).not.toHaveValue('');
    await expect(page).toHaveURL('https://adactinhotelapp.com/BookingConfirm.php');


    //Booking Itinerary
    await confirm.clickMyItinerary();
    await expect(page).toHaveURL('https://adactinhotelapp.com/BookedItinerary.php');

    //Logout
    await itinerary.logout();
    await expect(itinerary.logoutMessage).toContainText('You have successfully logged out');
    await expect(page).toHaveTitle('Adactin.com - Logout');

});