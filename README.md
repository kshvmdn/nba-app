## nba-player-tracker

> Track and compare player stats, news, and game logs.

<a href='https://play.google.com/store/apps/details?id=com.kshvmdn.nbaplayertracker' target="_blank"><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png' width='20%'/></a>

### Screenshots

<img src="./art/screenshots/1.png" width="150"> <img src="./art/screenshots/2.png" width="150"> <img src="./art/screenshots/3.png" width="150"> <img src="./art/screenshots/4.png" width="150"> <img src="./art/screenshots/5.png" width="150"> <img src="./art/screenshots/6.png" width="150"> <img src="./art/screenshots/7.png" width="150">

### Installation

  - Be sure to have [React Native](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies) installed, as well as [Android Studio & AVD](https://facebook.github.io/react-native/docs/getting-started.html#android-development-environment).

  - Clone the repo., install dependenices.

    ```sh
    $ git clone https://github.com/kshvmdn/nba-player-tracker.git
    $ cd nba-player-tracker/NBAPlayerTracker
    $ yarn install
    ```

### Usage

  - I strongly suggest using this with an actual device if you can, but an emulator should work just as well.

  - With a device connected (or emulator running):

    ```sh
    $ react-native run-android
    ```

### Contribute

Have a request or find a bug? This project is completely open source, feel free to open an issue or submit a pull request.

The project uses a variety of [tools](./data) (incl. [Python 3](https://www.python.org/download/releases/3.0/), [jq](https://stedolan.github.io/jq/) and [cairosvg](http://cairosvg.org/)) to aggregate logo images and player data. This data is served from a public domain (http://nba.kshvmdn.com) and used within the application. If you're interested in local development, you generally _shouldn't_ need to worry about this stuff though.

