# Asynchronous Voting Bot (SPIKE)

A slack bot to handle asynchronous planning poker

## Setup

Set an environemnt variable equal to ASYNC_VOTER_SLACK_BOT_TOKEN to be your custom bot token.

## Running

Edit the code to manually set the vote topic, start the bot up with:

```
$ node server.js
```

and then say to the bot in a channel (or in DM if you want to just test it):

```
@<bot-name> start new vote
```

and the bot will say:

```

Async VoterBOT	[11:02 AM]  
@channel NEW ASYNC VOTE on "Project Page Redesign" https://github.com/AgileVentures/WebsiteOne/issues/797 Please DM me with: `vote 1` (Simple), `vote 2` (Medium) or `vote 3` (Hard) - Discussion in ticket or here as you prefer. :slightly_smiling_face:
```

now anyone wishing to vote can DM the bot like so:

```
vote 1
```

and the vote will be stored and the channel notified of the update like so:

```
@here ASYNC VOTE UPDATE 1 vote so far [@tansaku ] on "Project Page Redesign" https://github.com/AgileVentures/WebsiteOne/issues/797 Please DM me with: `vote 1` (Simple), `vote 2` (Medium) or `vote 3` (Hard) - Discussion in ticket or here as you prefer. :slightly_smiling_face:
```

finally say to the bot:

```
@<bot-name> result
```

to get the results posted to the channel where the vote was started:

```
votes so far:

@edmilsonefs voted: 2
@arreche voted: 2
@tansaku voted: 2
```
