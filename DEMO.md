# Favourites approval demo

Run `npm start` in `frontend`, then open the local app.

1. Open Login, select Arun under **Demo account**, and continue.
2. Click the heart on Priya’s card on Home or Search. Her full profile remains private while the request is pending.
3. Click **Demo: Arun** in the desktop header, or **Switch demo account** in the mobile menu, and select Priya.
4. Open the notification bell and choose **Accept** or **Reject**. Accepting shares Priya’s full sample profile only with Arun.
5. Switch back to Arun. Open the bell and select **View full profile** after approval. Rejected requests remain locked.

Requests persist in this browser’s local storage (`valluvan.demo.requests.v1`). Each tab remembers its chosen account in session storage (`valluvan.demo.session.v1`). Separate tabs can use different accounts; request changes sync between them. Logging out hides private sections without deleting requests.

All accounts, details, and notifications are examples. No email, SMS, or remote notifications are sent. Browser state is editable and provides no real authentication or privacy enforcement. Real accounts require backend authentication, persistent storage, and server-side authorization before delivering private profile details.
