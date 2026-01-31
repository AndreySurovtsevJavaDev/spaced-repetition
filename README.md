# Spaced Repetition System (SRS) Calendar Automation

A Google Apps Script that automates the creation of events in Google Calendar for studying and reviewing materials using the spaced repetition system.

**Note:** I use this script in Google Workspace at [https://script.google.com/home](https://script.google.com/home)

## Preview
<img width="1674" height="934" alt="2026-01-30_16-04-31" src="https://github.com/user-attachments/assets/13392be2-76f9-4110-854a-ed54e1adadd2" />


## Setup Instructions

### Choose or create a Calendar
<img width="250" height="717" alt="2026-01-31_09-11-31" src="https://github.com/user-attachments/assets/620b79bf-14f4-45b1-801a-0bdc323957b9" />

### Configure Calendar ID
- Copy your calendar ID from the calendar settings
- Replace `const CALENDAR_ID` value with your calendar ID
<img width="1920" height="544" alt="2026-01-30_16-15-00" src="https://github.com/user-attachments/assets/e0f81dcf-63b6-4538-851f-7ea52afad1d4" />


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

<img width="1014" height="424" alt="2026-01-30_21-52-44" src="https://github.com/user-attachments/assets/00a91dec-96c6-4b32-a404-f93b51e7649b" />

