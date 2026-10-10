#!/bin/bash

# Author: Gemini (Collaborative Assistant)
# License: GNU GPL v3
# Description: A simple reminder script using espeak for periodic alerts.

# Define the message variable
REMINDER_TEXT="Time to wake up and get moving."

# Execute espeak
espeak-ng -p 80 -a 100 "[[O::]]"

# timshel - thou mayest 
espeak-ng -s 150 -v he "שלום עולם  הֲלוֹא אִם־תֵּיטִיב שְׂאֵת וְאִם לֹא תֵיטִיב לַפֶּתַח חַטָּאת רֹבֵץ וְאֵלֶיךָ תְּשׁוּקָתוֹ וְאַתָּה תִּמְשָׁל־בּוֹ׃"

# -s 150 sets the speed, -v en-us sets the voice
espeak -s 150 -v en-us "$REMINDER_TEXT"

# Log the action (System Visibility Best Practice)
echo "$(date): Reminder played" >> ~/.wake_up_log.txt
