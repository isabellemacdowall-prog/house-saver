# Setup (one time, about 15 minutes)

## 1. Firebase (private database + Google sign-in)
1. Go to https://console.firebase.google.com and click **Add project**. Name it `house-saver`. Google Analytics can be turned off.
2. **Build → Authentication → Get started → Google** → turn it on → choose your support email → Save.
3. **Build → Firestore Database → Create database** → choose location **australia-southeast2 (Melbourne)** → **Start in production mode**.
4. In Firestore, open the **Rules** tab, replace everything with the contents of `firestore.rules` from this repo, and click **Publish**.
5. **Project settings (gear icon) → Your apps → Web (`</>`)** → nickname `House Deposit` → Register. Copy the `firebaseConfig` values into `firebase-config.js` in this repo (edit the file on GitHub and commit).
6. **Authentication → Settings → Authorized domains → Add domain**: `isabellemacdowall-prog.github.io`

## 2. GitHub Pages
In this repo: **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)` → Save.**
After a minute the site is at `https://isabellemacdowall-prog.github.io/house-saver/`.

## 3. First sign-in
1. Open the site and **Sign in with Google**.
2. Choose the private `house-deposit-setup.json` file (never commit it to this repo).
3. Scroll to **Sharing** and add Jayden's Google email. He can then sign in on his own phone.

Do step 3 straight after publishing: the first account to complete setup becomes the owner.

## Monthly
Download last month's 2Up statement (PDF) from the Up app → open the site → Tracker → Choose PDF statements → Save to tracker.

## Android app
Each push that changes `android/` builds the app on GitHub (Actions tab, about 3 minutes).
Download **HouseSaver.apk** from the repo's **Releases → House Saver app** on your phone and open it to install
(allow "Install unknown apps" for your browser when asked). New versions install over the old one.

## "My spending" (private tab)
Requires the updated `firestore.rules` (publish them in Firebase → Firestore → Rules).
Then open the My spending tab and choose your private `personal-setup.json` once.
