<!--
*** Markdown
*** coding: utf-8
*** Author: Nicolas Flandrois
*** Date:   Tue 16 June 2020 12:03:49
*** Last Modified time: Tue 16 June 2020 12:06:03 
 -->

<!-- Project Description: -->
# PULS Sys V2

> A complete system to manage Arcade terminal capable of running retro games with donations management.

#### Build Setup


1. Flash Raspbian OS on Raspberry Pi's SD card.
2. Build [Retroarch 1.7.7](https://gist.github.com/AlexMax/32e5d038a66ce57253e740ea75736805)
3. Launch Retroarch
    1. Testing Retroacrh Launch,
    2. Configure User 1:
        - Setup (on the Right side)
        - Entries
        - User 1
4. Check the accessories and its number
5. Assign commands for this user (follow on screen descriptions)
6. Repeat from process n°3 for User 2
7. [Download the latest release (`.AppImage` file)](https://github.com/hilaliMoncef/arcade-sys/releases)
8. Place `.AppImage` on Desktop
8. In terminal command lines: `cd /home/pi/Desktop`
9. Then `chmod a+x LeNomDuFichier.AppImage`
10. Add Environment Variables by editing the `profile` file:
    1. `sudo nano /etc/profile`
    2. At the bottom of the profile file, add `export PULS_LOGIN=LeLoginChoisi`
    3. The in a new line, add `export PULS_MDP=LeMDPChoisi`,
    4. Then Save changes and Exit the file editing:
        1. `CTRL+X`
        2. `Yes`
        3. `Enter`
11. Clone the `arcade-sys-games` GitHUb repository:
    1. `cd /home/pi`
    2. `git clone https://github.com/hilaliMoncef/arcade-sys-games.git`
    3. A new file containing all games and core system will download.
    4. **HOW TO UPDATE** All system and game updates will process automatically by launching the command line `cd /home/pi/arcade-sys-games && git pull` in this folder.
12. Launch Retroarch by typing the command line `retroarch`.
12. Check if all gaming commands are working for User 1 & 2. Otherwise, repeat process N°3 to N°6.
13. Then change the setup "Save setup automatically"
14. Reboot the RaspberryPi by launching the command line in terminal `reboot`.
15. Launch `appImage`

#### Prerequisites

- RetroArch 1.7.7 installed and configured
- Node.js with Electron JS
- Payter Terminal
- Linux armv7l Environnement for building *(Recommanded Arch Linux for RaspberryPi)*

Also Make sure the follonwing packages are installed:
- `nano`
    - On Debian based Linux: `sudo apt install nano`
    - On [Arch based Linux](https://wiki.archlinux.org/index.php/Nano): `sudo pacman -S nano`
    - An Alternative to `nano` may be used: e.g. `vi` or `vim`. Please see specific instructions on how to install and use other text editors on your system.
- `git`
    - On Debian based Linux: `sudo apt install git`
    - On [Arch based Linux](https://wiki.archlinux.org/index.php/Git): `sudo pacman -S git`

