---
sidebar_position: 3
---

# Signals

Open **Manage signals** to see all your signals. You can search them by name.

## Creating a signal

Choose to add a signal and fill in the form:

- **Name**: what you call it.
- **Signal type**: see below.
- **Summary method**: _Total_ or _Average_. It decides how the data is combined in widgets and statistics. See [Summary method](#summary-method).
- **Average weighting**: _Every event_ or _Every day_. It decides how averages treat days with several events. See [Average weighting](#average-weighting).
- An **icon** and a **color**, so the signal is easy to recognise on boards and in charts.

You can also create a signal directly from a board while you are editing it. It is added to that board automatically.

## Signal types

The type decides which data a signal records every time you log it.

| Type         | Data                                                                          | Extra settings                                        | Example                             |
| ------------ | ----------------------------------------------------------------------------- | ----------------------------------------------------- | ----------------------------------- |
| **Tally**    | No data to enter. Every event counts as 1.                                    | none                                                  | Coffee, headache                    |
| **Range**    | A whole number between a minimum and a maximum that you set, in steps of one. | Min and max value, plus optional labels for both ends | Mood from 1 to 5, pain from 0 to 10 |
| **Value**    | Any number, with up to two decimal places.                                    | A unit                                                | Weight in kg                        |
| **Duration** | A length of time in hours, minutes and seconds.                               | none                                                  | Run, meditation                     |

:::caution
A signal's type **cannot be changed** after it is created. If you picked the wrong one, create a new signal.
:::

## Summary method

The summary method decides how the data of a signal is combined when bitjournal shows a single number for a day, a week or a whole period.

- **Total** adds the data up. Use it for things you count or accumulate: a tally, minutes of running, glasses of water. Two coffees and a third later the same day make a total of 3.
- **Average** takes the mean of the data. Use it for things you rate or measure: mood, weight, resting heart rate. Adding up a mood of 4 and a mood of 2 makes no sense, but their average of 3 does.

A day without data counts as 0 for a total, since nothing happened. For an average it counts as _no value_: it is left out instead of being treated as 0, so a day you did not rate your mood doesn't pull your average down.

## Average weighting

If you log a signal more than once a day, averages over several days can be weighted in two ways. Take a mood from 1 to 5: on Monday you log a 5, on Tuesday you log a 1, a 2, a 2 and a 3.

- **Every event** (the default) takes one mean over all events: (5 + 1 + 2 + 2 + 3) / 5 = **2.6**. Each event counts the same, so Tuesday weighs more because you logged more.
- **Every day** first averages each day and then averages the days: Monday averages 5 and Tuesday averages 2, so (5 + 2) / 2 = **3.5**. Each day counts the same, however often you logged.

For mood, _Every day_ usually answers the question "how was my week?" better, because it does not matter how often you happened to log. _Every event_ suits things where each event is a separate measurement.

:::tip
The exact calculations, including weeks, the average line, weekdays and the heatmap, are explained in [Statistics in detail](./statistics.md).
:::

## Editing and deleting

Open a signal from Manage signals, or choose **Edit signal** from the menu on its card on the Log screen, to change its name, icon, color or settings.

:::caution
**Deleting a signal cannot be undone!**
Deleting a signal permanently removes it from all your entries, including past ones. The data you logged for it is lost and cannot be restored.
:::
