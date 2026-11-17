---
sidebar_position: 9
---

# Statistics in detail

This page is for the curious. It explains exactly how bitjournal turns your logged data into the numbers and charts you see, so you know what they mean and where their limits are. You don't need any of it to use bitjournal.

## The building blocks

All numbers come from the data you logged for a signal. bitjournal first reads that data as plain numbers:

| Signal type | Number used           |
| ----------- | --------------------- |
| Tally       | 1 for every event     |
| Range       | The chosen value      |
| Value       | The entered number    |
| Duration    | The length in seconds |

## Time and periods

- **Your time zone.** Days and hours are based on the time zone of your device, not on the server. An event at 23:30 your time belongs to that day, whatever the time is elsewhere. If you change time zone, day boundaries move with you.
- **Calendar periods.** A week runs from Monday to Sunday, a month, quarter and year follow the calendar. A period starts at midnight on its first day and ends at midnight after its last day.
- **Last X days** counts back from today and includes today. _Last 7 days_ is today and the six days before it.
- **This week**, **this month** and so on are the current, possibly unfinished, period.

## Total and average

Every signal has a [summary method](./signals.md#summary-method), _Total_ or _Average_. It is used whenever a day, a week or any other group of data is reduced to one number.

### Total

The total is the **sum** of all numbers in the group. A group without data has a total of 0.

### Average

The average is the **arithmetic mean**: the sum of the numbers divided by how many there are. What counts as "how many" depends on the signal's [average weighting](#average-weighting). A group without data has **no value**. It is shown as a gap or as "–" and is never counted as 0, because "I did not rate my mood" is not the same as "my mood was 0".

### Average weighting

If you log a signal several times a day, there are two sensible ways to average it over a longer period. Each signal has an **Average weighting** setting that picks one. It only matters for averages, a total is the same either way.

Take a mood signal from 1 to 5:

| Day     | Logged moods |
| ------- | ------------ |
| Monday  | 5            |
| Tuesday | 1, 2, 2, 3   |

**Every event** is one mean over all events of the period: the sum of all logged numbers divided by the number of events. Every event counts the same, so a day with more events has more influence.

(5 + 1 + 2 + 2 + 3) / 5 = **2.6**

**Every day** first takes the mean of each day and then the mean of those daily means. Every day counts the same, no matter how often you logged.

Monday averages 5, Tuesday averages (1 + 2 + 2 + 3) / 4 = 2, so (5 + 2) / 2 = **3.5**

Which one fits depends on the question you ask. "How was my week?" is a question about days, so _Every day_ is usually the better choice for mood: a day on which you happened to log four times should not outweigh a day on which you logged once. "How good were my coffees on average?" is a question about each event, so _Every event_ fits.

In both modes:

- A day without events is skipped, it is never counted as 0.
- The average of a single day is the same, since it only has one day. The modes only differ for periods that span several days.
- The setting applies everywhere an average is shown: the average of a period, a value widget set to _Average_, one week in a yearly chart, a weekday, a cell of the heatmap and the [average line](#average-line).

:::note
The _Display_ setting of a value widget is independent of the signal's summary method. A signal that is summarised by _Total_ can still show an _Average_ in a value widget: the average of its events in the period, weighted by the signal's [average weighting](#average-weighting).
:::

## Steps of a timeseries

A timeseries widget splits its period into steps and shows one bar or point per step. The step is **one day** for most periods, and **one week** for long ones, because 365 bars are too dense to read.

| Timeframe                     | Length             | Step | Steps       |
| ----------------------------- | ------------------ | ---- | ----------- |
| This week, last week          | 7 days             | day  | 7           |
| This month, last month        | 28 to 31 days      | day  | 28 to 31    |
| This quarter, earlier quarter | 90 to 92 days      | day  | 90 to 92    |
| This year, earlier year       | 365 or 366 days    | week | 53 or 54    |
| Last X days                   | up to 100 days     | day  | X           |
| Last X days                   | more than 100 days | week | about X / 7 |

The rule is: periods of **more than 100 days** use weekly steps, all others use daily steps.

### Daily steps

Each step is the value of one day, using the signal's summary method:

- _Total_ signals: the sum of that day. A day without events is **0**.
- _Average_ signals: the mean of that day's events (the same in both weightings). A day without events is a **gap**.

### Weekly steps

Days are grouped into calendar weeks from Monday to Sunday. The first and last week of a period can be partial, for example a year starts on whatever weekday January 1st falls. Only days inside the period count.

- _Total_ signals: the sum of all events in that week. A week without events is **0**.
- _Average_ signals: the mean of that week, following the [average weighting](#average-weighting). A week with no events is a gap.

## Average line

The dashed line of a timeseries widget is a **moving average**. Each point covers the current step and the steps before it:

- **7 days** for charts with daily steps.
- **4 weeks** for charts with weekly steps.

It smooths out day-to-day noise so that you can see the trend. A few details:

- _Average_ signals: the mean inside the window, following the [average weighting](#average-weighting). Steps without events add nothing, they are not counted as 0.
- _Total_ signals: the mean of the step totals. An empty step is a real 0 and counts into the window.
- At the start of the period fewer steps are available, so the line starts with a shorter window. It never looks at data from before the period.

## Day of week

The day-of-week chart pools all events of the period by weekday, so every Monday of the period ends up in one bar.

- _Total_ signals: the **sum** over all those days. This is not a per-day average. A longer period produces higher bars, and a weekday that occurs more often in the period has a slight advantage.
- _Average_ signals: the mean of that weekday, following the [average weighting](#average-weighting). A weekday without events is a gap.

## Time of day heatmap

The heatmap sorts every event into a cell of weekday and hour of the day (in your time zone), for example Monday between 08:00 and 08:59.

- _Total_ signals: the sum of the events in the cell.
- _Average_ signals: the mean of the events in the cell, following the [average weighting](#average-weighting).
- Cells without events stay empty. The color scale runs from the lowest to the highest cell **with** data, not from 0, so even small differences stay visible.
- The number of events behind a cell is shown in its tooltip. An average of a single event is much less reliable than an average of twenty, so keep it in mind when reading it.

:::caution
The color scale is recalculated for every period, from the lowest to the highest cell of that period. The same color therefore means different values in different periods: a dark cell in one week can be a lower value than a pale cell in another. Compare the numbers in the tooltips instead of the colors when you switch between periods.
:::

## Number formatting

Calculations use the full precision. Only the display is rounded:

- **Tally, range and value**: rounded to two decimals, with the unit for value signals. 2.0 is shown as 2.
- **Duration**: shown as hours and minutes (`1h 30m`), as minutes (`45min`) when under an hour, or as seconds (`30s`) when under a minute. Smaller units are cut off, not rounded, so 59 minutes and 59 seconds is shown as `59min`.
