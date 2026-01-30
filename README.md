# Spaced Repetition System (SRS) Calendar Automation

A Google Apps Script that automates the creation of events in Google Calendar for studying and reviewing materials using the spaced repetition system.

**Note:** I use this script in Google Workspace at [https://script.google.com/home](https://script.google.com/home)

## Preview
![Calendar Preview](https://github.com/user-attachments/assets/f0ffbdea-8e21-4048-8920-21e4374a1dfd)

## Setup Instructions

### Create a New Calendar
![Create Calendar](https://github.com/user-attachments/assets/e51e7dbd-d31c-483f-96e9-6de237241503)

### Configure Calendar ID
- Copy your calendar ID from the calendar settings
- Replace `const CALENDAR_ID` value with your calendar ID

![Calendar ID Configuration](https://github.com/user-attachments/assets/d614210a-d280-48cb-9523-7b59bb34cce1)

### Authorization
- Click the "Run" button in the script editor
- Google will ask you to confirm permissions
- Click **"Advanced" → "Go to ... (unsafe)"** to grant the script access to your calendar

## How to Use

### CREATE EVENTS
**Set title:**
 - const title = "topic_name";

**Set URL** (for example, Quizlet cards):
 - const url = "quizlet.com";

**Set the start date for when you want to begin learning:**
- const startDateStr = "2026-02-10";

**Choose function:**
- generateSrsPlan();
  And comment out other functions with //

### DELETE EVENTS
**Set title:**
- const title = "topic_name";

**Choose function:**
- deleteSrsPlan();
  And comment out other functions with //

### SHIFT FUTURE EVENTS
**Set title:**
 - const title = "topic_name";

**Choose function:**
- shiftFutureEvents();
   Add the number of days to shift as the first argument (default is 1),
  then comment out other functions with //

<img width="1014" height="424" alt="2026-01-30_21-52-44" src="https://github.com/user-attachments/assets/84072dd8-3d4e-4004-85b3-e78e23acdc12" />

